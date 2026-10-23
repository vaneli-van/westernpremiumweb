import 'server-only'
import { company, quoteForm, solutionOptions, timelineOptions } from '@/content/company'
import type { QuoteValues } from '@/lib/quote'

const t = quoteForm.email
const labels = quoteForm.labels

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

const labelFor = (options: readonly { value: string; label: string }[], value: string) =>
  options.find((o) => o.value === value)?.label ?? value

type Row = [label: string, value: string]

function summaryRows(data: QuoteValues, attachmentName: string | null): Row[] {
  return [
    [labels.fullName, data.fullName],
    [labels.organisation, data.organisation],
    [labels.email, data.email],
    [labels.phone, data.phone || t.notProvided],
    [labels.solution, labelFor(solutionOptions, data.solution)],
    [labels.quantity, data.quantity || t.notProvided],
    [labels.deliveryLocation, data.deliveryLocation],
    [labels.timeline, data.timeline ? labelFor(timelineOptions, data.timeline) : t.notProvided],
    [labels.attachment, attachmentName ?? t.none],
  ]
}

const tableHtml = (rows: Row[]) =>
  `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .map(
      ([k, v]) =>
        `<tr><th align="left" valign="top" style="color:#475569;font-weight:normal;padding-right:16px">${escapeHtml(k)}</th><td style="color:#0f172a">${escapeHtml(v)}</td></tr>`,
    )
    .join('')}</table>`

const tableText = (rows: Row[]) => rows.map(([k, v]) => `${k}: ${v}`).join('\n')

const addressLine = `${company.address.street}, ${company.address.locality}, ${company.address.city}, ${company.address.country}`

export function internalEmail(data: QuoteValues, reference: string, attachment: { name: string } | null) {
  const rows: Row[] = [['Reference', reference], ...summaryRows(data, attachment?.name ?? null)]
  const attachmentHtml = attachment
    ? `<p style="font-family:Arial,sans-serif;font-size:14px">${escapeHtml(attachment.name)}<br><span style="color:#475569">${escapeHtml(t.attachmentNote)}</span></p>`
    : ''

  return {
    from: company.formSender,
    to: [company.enquiriesEmail],
    replyTo: data.email,
    subject: `${t.internalSubject}: ${data.organisation} (${reference})`,
    html: `<h2 style="font-family:Arial,sans-serif">${escapeHtml(t.internalHeading)}</h2>${tableHtml(rows)}<h3 style="font-family:Arial,sans-serif">${escapeHtml(labels.requirement)}</h3><p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(data.requirement)}</p>${attachmentHtml}`,
    text: `${t.internalHeading}\n\nReference: ${reference}\n${tableText(rows.slice(1))}\n\n${labels.requirement}:\n${data.requirement}${
      attachment ? `\n\n${attachment.name}\n${t.attachmentNote}` : ''
    }`,
  }
}

export function acknowledgementEmail(data: QuoteValues, reference: string, attachmentName: string | null) {
  const rows = summaryRows(data, attachmentName)
  const contactRows: Row[] = [
    [quoteForm.labels.phone, company.phone],
    ['Email', company.enquiriesEmail],
    ['Address', addressLine],
    ...(company.businessHours ? ([['Hours', company.businessHours]] as Row[]) : []),
  ]
  const p = (s: string) => `<p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#0f172a">${s}</p>`
  const h = (s: string) => `<h3 style="font-family:Arial,sans-serif;color:#0f172a">${escapeHtml(s)}</h3>`

  return {
    from: company.formSender,
    to: [data.email],
    replyTo: company.enquiriesEmail,
    subject: `${t.ackSubject} (${reference})`,
    html: [
      p(`${escapeHtml(t.ackGreeting)} ${escapeHtml(data.fullName)},`),
      p(escapeHtml(t.ackBody)),
      p(`${escapeHtml(quoteForm.success.referenceLabel)}: <strong>${reference}</strong>`),
      h(t.ackSummaryHeading),
      tableHtml(rows),
      p(`<strong>${escapeHtml(labels.requirement)}</strong><br><span style="white-space:pre-wrap">${escapeHtml(data.requirement)}</span>`),
      h(t.ackContactHeading),
      tableHtml(contactRows),
      p(escapeHtml(t.ackSignOff)),
    ].join(''),
    text: [
      `${t.ackGreeting} ${data.fullName},`,
      t.ackBody,
      `${quoteForm.success.referenceLabel}: ${reference}`,
      `${t.ackSummaryHeading}\n${tableText(rows)}\n${labels.requirement}:\n${data.requirement}`,
      `${t.ackContactHeading}\n${tableText(contactRows)}`,
      t.ackSignOff,
    ].join('\n\n'),
  }
}
