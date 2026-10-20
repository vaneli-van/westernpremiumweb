import { z } from 'zod'
import { quoteForm, solutionOptions, timelineOptions } from '@/content/company'

const e = quoteForm.errors

export const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024

/** Accepted attachment extensions mapped to their MIME types. */
export const ATTACHMENT_TYPES = {
  '.pdf': 'application/pdf',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
} as const

export const ATTACHMENT_ACCEPT = [...Object.keys(ATTACHMENT_TYPES), ...Object.values(ATTACHMENT_TYPES)].join(',')

export const QUOTE_FIELDS = [
  'fullName',
  'organisation',
  'email',
  'phone',
  'solution',
  'requirement',
  'quantity',
  'deliveryLocation',
  'timeline',
  'attachment',
  'consent',
] as const

export type QuoteField = (typeof QUOTE_FIELDS)[number]

export const HONEYPOT_FIELD = 'website'
export const TURNSTILE_FIELD = 'cf-turnstile-response'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^\+?[\d\s()-]{6,20}$/

const isFile = (value: unknown): value is File => typeof File !== 'undefined' && value instanceof File

export function attachmentExtension(file: File) {
  const dot = file.name.lastIndexOf('.')
  return dot === -1 ? '' : file.name.slice(dot).toLowerCase()
}

/** Extension must be accepted, and a declared MIME type (browsers sometimes send none) must match it. */
export function isAcceptedAttachment(file: File) {
  const ext = attachmentExtension(file) as keyof typeof ATTACHMENT_TYPES
  const expected = ATTACHMENT_TYPES[ext]
  if (!expected) return false
  return !file.type || file.type === expected
}

const attachmentSchema = z
  .custom<File | undefined>((value) => value === undefined || isFile(value), { message: e.attachmentType })
  .superRefine((file, ctx) => {
    if (!file) return
    if (!isAcceptedAttachment(file)) ctx.addIssue({ code: 'custom', message: e.attachmentType })
    else if (file.size > MAX_ATTACHMENT_BYTES) ctx.addIssue({ code: 'custom', message: e.attachmentSize })
  })

export const quoteSchema = z.object({
  fullName: z.string().trim().min(1, e.fullName).max(120, e.fullName),
  organisation: z.string().trim().min(1, e.organisation).max(160, e.organisation),
  email: z.string().trim().min(1, e.email).max(200, e.emailFormat).regex(EMAIL_RE, e.emailFormat),
  phone: z
    .string()
    .trim()
    .refine((v) => !v || PHONE_RE.test(v), e.phone),
  solution: z.string().refine((v) => solutionOptions.some((o) => o.value === v), e.solution),
  requirement: z.string().trim().min(10, e.requirement).max(quoteForm.requirementMax, e.requirementMax),
  quantity: z.string().trim().max(200),
  deliveryLocation: z.string().trim().min(1, e.deliveryLocation).max(200, e.deliveryLocation),
  timeline: z.string().refine((v) => !v || timelineOptions.some((o) => o.value === v), e.timeline),
  attachment: attachmentSchema,
  consent: z.boolean().refine((v) => v, e.consent),
})

export type QuoteInput = z.input<typeof quoteSchema>
export type QuoteValues = z.output<typeof quoteSchema>

export type QuoteResult =
  | { ok: true; reference: string }
  | { ok: false; message: string; fieldErrors?: Partial<Record<QuoteField, string>> }

/** Converts submitted FormData into the shape the schema expects. */
export function formDataToQuoteInput(fd: FormData): QuoteInput {
  const str = (key: string) => {
    const v = fd.get(key)
    return typeof v === 'string' ? v : ''
  }
  const file = fd.get('attachment')
  return {
    fullName: str('fullName'),
    organisation: str('organisation'),
    email: str('email'),
    phone: str('phone'),
    solution: str('solution'),
    requirement: str('requirement'),
    quantity: str('quantity'),
    deliveryLocation: str('deliveryLocation'),
    timeline: str('timeline'),
    attachment: isFile(file) && file.size > 0 ? file : undefined,
    consent: str('consent') === 'true',
  }
}

const FREE_MAIL_DOMAINS = new Set([
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'yahoo.co.uk',
  'ymail.com',
  'hotmail.com',
  'hotmail.co.uk',
  'outlook.com',
  'live.com',
  'msn.com',
  'icloud.com',
  'me.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
  'gmx.com',
  'mail.com',
  'zoho.com',
])

/** Soft check only: personal addresses are allowed but trigger a gentle warning. */
export function isFreeMail(email: string) {
  const domain = email.trim().toLowerCase().split('@')[1]
  return Boolean(domain && FREE_MAIL_DOMAINS.has(domain))
}
