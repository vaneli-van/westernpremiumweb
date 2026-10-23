'use server'

import { headers } from 'next/headers'
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
  type EmailAttachment,
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

  let attachment: { name: string } | null = null
  let files: EmailAttachment[] | undefined
  if (data.attachment) {
    if (!(await hasValidSignature(data.attachment))) {
      return fail(f.invalid, { attachment: quoteForm.errors.attachmentType })
    }
    const name = `${reference}-${safeFileName(data.attachment.name)}`
    try {
      const content = Buffer.from(await data.attachment.arrayBuffer()).toString('base64')
      files = [{ filename: name, content }]
      attachment = { name }
    } catch (err) {
      devLog('Attachment could not be read', err instanceof Error ? err.message : 'unknown error')
      return fail(f.upload)
    }
  }

  const delivered = await sendEmail({ ...internalEmail(data, reference, attachment), attachments: files }, `${reference}-internal`)
  if (!delivered) return fail(f.generic)

  // The enquiry has reached the team; a failed acknowledgement should not report the enquiry as lost.
  await sendEmail(acknowledgementEmail(data, reference, attachment?.name ?? null), `${reference}-ack`)

  return { ok: true, reference }
}
