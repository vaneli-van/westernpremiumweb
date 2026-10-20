'use server'

import { headers } from 'next/headers'
import { put } from '@vercel/blob'
import { quoteForm } from '@/content/company'
import {
  HONEYPOT_FIELD,
  TURNSTILE_FIELD,
  formDataToQuoteInput,
  quoteSchema,
  type QuoteField,
  type QuoteResult,
} from '@/lib/quote'
import {
  clientIp,
  createReference,
  devLog,
  getFormConfig,
  hasValidSignature,
  isRateLimited,
  recordSubmission,
  safeFileName,
  sendEmail,
  verifyTurnstile,
} from '@/lib/quote-server'
import { acknowledgementEmail, internalEmail } from '@/lib/quote-emails'

const f = quoteForm.failure
const fail = (message: string, fieldErrors?: Partial<Record<QuoteField, string>>): QuoteResult => ({
  ok: false,
  message,
  fieldErrors,
})

export async function submitQuote(formData: FormData): Promise<QuoteResult> {
  if (String(formData.get(HONEYPOT_FIELD) ?? '').trim()) return fail(f.generic)

  const config = getFormConfig()
  if (!config.turnstile || !config.resend) return fail(f.notConfigured)

  const ip = clientIp(await headers())
  if (isRateLimited(ip)) return fail(f.rateLimited)

  const parsed = quoteSchema.safeParse(formDataToQuoteInput(formData))
  if (!parsed.success) {
    const fieldErrors: Partial<Record<QuoteField, string>> = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as QuoteField
      fieldErrors[field] ??= issue.message
    }
    return fail(f.invalid, fieldErrors)
  }
  const data = parsed.data

  if (!(await verifyTurnstile(String(formData.get(TURNSTILE_FIELD) ?? ''), ip))) return fail(f.verification)

  recordSubmission(ip)
  const reference = createReference()

  let attachment: { name: string; url: string } | null = null
  if (data.attachment) {
    if (!config.blob) return fail(f.upload)
    if (!(await hasValidSignature(data.attachment))) {
      return fail(f.invalid, { attachment: quoteForm.errors.attachmentType })
    }
    const name = safeFileName(data.attachment.name)
    try {
      const blob = await put(`quotes/${reference}/${name}`, data.attachment, {
        access: 'private',
        addRandomSuffix: true,
        contentType: data.attachment.type || undefined,
      })
      attachment = { name, url: blob.url }
    } catch (err) {
      devLog('Attachment upload failed', err instanceof Error ? err.message : 'unknown error')
      return fail(f.upload)
    }
  }

  const delivered = await sendEmail(internalEmail(data, reference, attachment), `${reference}-internal`)
  if (!delivered) return fail(f.generic)

  // The enquiry has reached the team; a failed acknowledgement should not report the enquiry as lost.
  await sendEmail(acknowledgementEmail(data, reference, attachment?.name ?? null), `${reference}-ack`)

  return { ok: true, reference }
}
