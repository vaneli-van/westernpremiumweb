import 'server-only'
import { attachmentExtension } from '@/lib/quote'

export type FormConfig = { turnstile: boolean; resend: boolean; blob: boolean }

export function getFormConfig(): FormConfig {
  return {
    turnstile: Boolean(process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY),
    resend: Boolean(process.env.RESEND_API_KEY),
    // Attachments are sent with the internal email, so no storage service is needed.
    blob: true,
  }
}

/**
 * Configuration banners are shown on local and preview builds only. On the production
 * site a missing key never surfaces as an error message: the contact page falls back
 * to email and WhatsApp instead.
 */
export function showConfigDiagnostics() {
  return process.env.NODE_ENV !== 'production'
}

/** Logs operational failures in development only. Never pass personal data or file contents here. */
export function devLog(...args: unknown[]) {
  if (process.env.NODE_ENV !== 'production') console.error('[quote]', ...args)
}

const REFERENCE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'

/** Short, human-friendly reference without easily confused characters, e.g. WP-7K3QX9. */
export function createReference() {
  const bytes = crypto.getRandomValues(new Uint8Array(6))
  return `WP-${Array.from(bytes, (b) => REFERENCE_ALPHABET[b % REFERENCE_ALPHABET.length]).join('')}`
}

/* In-memory rate limit. The site runs as a single long-lived Node process, so this window
   holds across requests until the service restarts. */
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 60 * 1000
const submissions = new Map<string, number[]>()

function recentSubmissions(ip: string, now: number) {
  const recent = (submissions.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  submissions.set(ip, recent)
  return recent
}

export function isRateLimited(ip: string) {
  return recentSubmissions(ip, Date.now()).length >= RATE_LIMIT
}

export function recordSubmission(ip: string) {
  const now = Date.now()
  recentSubmissions(ip, now).push(now)
}

export function clientIp(headers: Headers) {
  return headers.get('x-forwarded-for')?.split(',')[0]?.trim() || headers.get('x-real-ip') || 'unknown'
}

export async function verifyTurnstile(token: string, ip: string) {
  if (!token) return false
  try {
    const body = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY ?? '', response: token })
    if (ip !== 'unknown') body.set('remoteip', ip)
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body })
    const data = (await res.json()) as { success?: boolean }
    return data.success === true
  } catch (err) {
    devLog('Turnstile verification request failed', err instanceof Error ? err.message : 'unknown error')
    return false
  }
}

/** Confirms the file content matches its extension: PDFs start with %PDF, XLSX and DOCX are ZIP archives. */
export async function hasValidSignature(file: File) {
  const head = new Uint8Array(await file.slice(0, 4).arrayBuffer())
  const ext = attachmentExtension(file)
  if (ext === '.pdf') return head[0] === 0x25 && head[1] === 0x50 && head[2] === 0x44 && head[3] === 0x46
  if (ext === '.xlsx' || ext === '.docx') return head[0] === 0x50 && head[1] === 0x4b && head[2] === 0x03 && head[3] === 0x04
  return false
}

export function safeFileName(name: string) {
  return name.replace(/[^\w.-]+/g, '_').slice(-100) || 'attachment'
}

export type EmailAttachment = { filename: string; content: string }

type Email = {
  from: string
  to: string[]
  subject: string
  html: string
  text: string
  replyTo?: string
  attachments?: EmailAttachment[]
}

export async function sendEmail(email: Email, idempotencyKey: string) {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
      },
      body: JSON.stringify({
        from: email.from,
        to: email.to,
        subject: email.subject,
        html: email.html,
        text: email.text,
        reply_to: email.replyTo,
        attachments: email.attachments,
      }),
    })
    if (!res.ok) devLog('Resend rejected an email', res.status)
    return res.ok
  } catch (err) {
    devLog('Resend request failed', err instanceof Error ? err.message : 'unknown error')
    return false
  }
}
