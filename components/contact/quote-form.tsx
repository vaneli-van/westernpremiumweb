'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertTriangle, CheckCircle2, Info, Loader2 } from 'lucide-react'
import { submitQuote } from '@/app/contact/actions'
import {
  ATTACHMENT_ACCEPT,
  HONEYPOT_FIELD,
  QUOTE_FIELDS,
  TURNSTILE_FIELD,
  isFreeMail,
  quoteSchema,
  type QuoteField,
  type QuoteInput,
  type QuoteValues,
} from '@/lib/quote'
import { company, quoteForm as copy, solutionOptions, timelineOptions } from '@/content/company'
import { cn } from '@/lib/utils'
import { actionClasses } from '@/components/site/action-link'
import { Turnstile, type TurnstileHandle } from './turnstile'

type FormConfig = { turnstile: boolean; resend: boolean; blob: boolean }

const inputClasses =
  'w-full rounded-sm border border-input bg-background px-3 py-3 text-base text-navy placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 aria-[invalid=true]:border-destructive disabled:cursor-not-allowed disabled:opacity-60'

const describedBy = (...ids: (string | false | undefined)[]) => ids.filter(Boolean).join(' ') || undefined

function FieldLabel({ field, required }: { field: Exclude<QuoteField, 'consent'>; required?: boolean }) {
  return (
    <label htmlFor={field} className="text-sm font-medium text-navy">
      {copy.labels[field]}
      {required && (
        <span aria-hidden="true" className="ml-1 text-primary">
          *
        </span>
      )}
    </label>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="flex items-start gap-1.5 text-sm text-destructive">
      <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      {message}
    </p>
  )
}

function ConfigBanner({ children }: { children: React.ReactNode }) {
  return (
    <p role="note" className="flex gap-3 border border-dashed border-destructive/60 bg-destructive/5 p-3 font-mono text-xs leading-relaxed text-destructive">
      <Info className="size-4 shrink-0" aria-hidden="true" />
      {children}
    </p>
  )
}

export function QuoteForm({
  defaultSolution,
  config,
  turnstileSiteKey,
}: {
  defaultSolution?: string
  config: FormConfig
  turnstileSiteKey?: string
}) {
  const [reference, setReference] = useState<string | null>(null)
  const [failure, setFailure] = useState<string | null>(null)
  const turnstile = useRef<TurnstileHandle>(null)
  const honeypot = useRef<HTMLInputElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const canSubmit = config.turnstile && config.resend && Boolean(turnstileSiteKey)

  const {
    register,
    control,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<QuoteInput, unknown, QuoteValues>({
    resolver: zodResolver(quoteSchema),
    shouldFocusError: true,
    defaultValues: {
      fullName: '',
      organisation: '',
      email: '',
      phone: '',
      solution: defaultSolution ?? '',
      requirement: '',
      quantity: '',
      deliveryLocation: '',
      timeline: '',
      attachment: undefined,
      consent: false,
    },
  })

  const email = useWatch({ control, name: 'email' })
  const requirement = useWatch({ control, name: 'requirement' })
  const showFreeMailWarning = !errors.email && isFreeMail(email ?? '')

  useEffect(() => {
    if (reference || failure) resultRef.current?.focus()
  }, [reference, failure])

  const onValid = async (values: QuoteValues) => {
    setFailure(null)
    let token = ''
    try {
      token = await turnstile.current!.getToken()
    } catch {
      setFailure(copy.failure.verification)
      return
    }

    const fd = new FormData()
    for (const [key, value] of Object.entries(values)) {
      if (value === undefined) continue
      fd.append(key, value instanceof File ? value : String(value))
    }
    fd.append(HONEYPOT_FIELD, honeypot.current?.value ?? '')
    fd.append(TURNSTILE_FIELD, token)

    let result
    try {
      result = await submitQuote(fd)
    } catch {
      setFailure(copy.failure.generic)
      return
    }

    if (result.ok) {
      setReference(result.reference)
      return
    }
    const fieldErrors = result.fieldErrors ?? {}
    const first = QUOTE_FIELDS.find((f) => fieldErrors[f])
    for (const f of QUOTE_FIELDS) {
      if (fieldErrors[f]) setError(f, { type: 'server', message: fieldErrors[f] })
    }
    if (first) setFocus(first)
    else setFailure(result.message)
  }

  if (reference) {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col gap-5 border-t-2 border-primary bg-pale/40 p-8 outline-none md:p-10"
      >
        <CheckCircle2 className="size-8 text-primary" aria-hidden="true" />
        <p className="text-pretty font-serif text-2xl leading-snug text-navy md:text-3xl">{copy.success.body}</p>
        <div className="flex flex-col gap-1 border-t border-border pt-5">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">{copy.success.referenceLabel}</span>
          <span className="font-mono text-xl text-navy">{reference}</span>
        </div>
      </div>
    )
  }

  const err = (f: QuoteField) => errors[f]?.message as string | undefined

  return (
    <form onSubmit={handleSubmit(onValid)} noValidate className="flex flex-col gap-6">
      {!config.turnstile && <ConfigBanner>{copy.banners.turnstile}</ConfigBanner>}
      {!config.resend && <ConfigBanner>{copy.banners.resend}</ConfigBanner>}
      {!config.blob && <ConfigBanner>{copy.banners.blob}</ConfigBanner>}

      <p className="text-sm text-muted-foreground">
        <span aria-hidden="true" className="mr-1 text-primary">
          *
        </span>
        <span aria-hidden="true">{copy.requiredLegend}</span>
        <span className="sr-only">{copy.requiredLegendSr}</span>
      </p>

      {failure && (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="alert"
          className="flex gap-3 border-l-2 border-destructive bg-destructive/5 p-4 text-sm leading-relaxed text-navy outline-none"
        >
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <p className="font-medium text-destructive">{copy.failure.heading}</p>
            <p>{failure}</p>
            <p>{copy.failure.alternatives}</p>
            <p className="flex flex-wrap gap-x-4 gap-y-1">
              <a href={company.phoneHref} className="font-medium underline underline-offset-2">
                {company.phone}
              </a>
              <a href={`mailto:${company.enquiriesEmail}`} className="break-all font-medium underline underline-offset-2">
                {company.enquiriesEmail}
              </a>
            </p>
          </div>
        </div>
      )}

      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>{copy.honeypotLabel}</label>
        <input ref={honeypot} id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <FieldLabel field="fullName" required />
          <input
            id="fullName"
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.fullName}
            aria-describedby={describedBy(errors.fullName && 'fullName-error')}
            className={inputClasses}
            {...register('fullName')}
          />
          <FieldError id="fullName-error" message={err('fullName')} />
        </div>
        <div className="flex flex-col gap-2">
          <FieldLabel field="organisation" required />
          <input
            id="organisation"
            autoComplete="organization"
            aria-required="true"
            aria-invalid={!!errors.organisation}
            aria-describedby={describedBy(errors.organisation && 'organisation-error')}
            className={inputClasses}
            {...register('organisation')}
          />
          <FieldError id="organisation-error" message={err('organisation')} />
        </div>
        <div className="flex flex-col gap-2">
          <FieldLabel field="email" required />
          <input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={describedBy(errors.email && 'email-error', showFreeMailWarning && 'email-warning')}
            className={inputClasses}
            {...register('email')}
          />
          <FieldError id="email-error" message={err('email')} />
          {showFreeMailWarning && (
            <p id="email-warning" className="flex items-start gap-1.5 text-sm text-muted-foreground">
              <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              {copy.freeMailWarning}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <FieldLabel field="phone" />
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder={copy.placeholders.phone}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy(errors.phone && 'phone-error')}
            className={inputClasses}
            {...register('phone')}
          />
          <FieldError id="phone-error" message={err('phone')} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <FieldLabel field="solution" required />
        <select
          id="solution"
          aria-required="true"
          aria-invalid={!!errors.solution}
          aria-describedby={describedBy(errors.solution && 'solution-error')}
          className={inputClasses}
          defaultValue={defaultSolution ?? ''}
          {...register('solution')}
        >
          <option value="">{copy.placeholders.solution}</option>
          {solutionOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <FieldError id="solution-error" message={err('solution')} />
      </div>

      <div className="flex flex-col gap-2">
        <FieldLabel field="requirement" required />
        <p id="requirement-hint" className="text-sm text-muted-foreground">
          {copy.hints.requirement}
        </p>
        <textarea
          id="requirement"
          rows={6}
          maxLength={copy.requirementMax}
          aria-required="true"
          aria-invalid={!!errors.requirement}
          aria-describedby={describedBy('requirement-hint', 'requirement-count', errors.requirement && 'requirement-error')}
          className={cn(inputClasses, 'resize-y leading-relaxed')}
          {...register('requirement')}
        />
        <div className="flex items-start justify-between gap-4">
          <FieldError id="requirement-error" message={err('requirement')} />
          <p id="requirement-count" className="ml-auto shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
            {(requirement?.length ?? 0).toLocaleString('en-GB')} / {copy.requirementMax.toLocaleString('en-GB')}
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <FieldLabel field="quantity" />
          <input
            id="quantity"
            placeholder={copy.placeholders.quantity}
            aria-invalid={!!errors.quantity}
            aria-describedby={describedBy(errors.quantity && 'quantity-error')}
            className={inputClasses}
            {...register('quantity')}
          />
          <FieldError id="quantity-error" message={err('quantity')} />
        </div>
        <div className="flex flex-col gap-2">
          <FieldLabel field="deliveryLocation" required />
          <input
            id="deliveryLocation"
            placeholder={copy.placeholders.deliveryLocation}
            autoComplete="address-level2"
            aria-required="true"
            aria-invalid={!!errors.deliveryLocation}
            aria-describedby={describedBy(errors.deliveryLocation && 'deliveryLocation-error')}
            className={inputClasses}
            {...register('deliveryLocation')}
          />
          <FieldError id="deliveryLocation-error" message={err('deliveryLocation')} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <FieldLabel field="timeline" />
        <select
          id="timeline"
          aria-invalid={!!errors.timeline}
          aria-describedby={describedBy(errors.timeline && 'timeline-error')}
          className={inputClasses}
          {...register('timeline')}
        >
          <option value="">{copy.placeholders.timeline}</option>
          {timelineOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <FieldError id="timeline-error" message={err('timeline')} />
      </div>

      <div className="flex flex-col gap-2">
        <FieldLabel field="attachment" />
        <p id="attachment-hint" className="text-sm text-muted-foreground">
          {copy.hints.attachment}
        </p>
        <Controller
          control={control}
          name="attachment"
          render={({ field }) => (
            <input
              id="attachment"
              ref={field.ref}
              name={field.name}
              onBlur={field.onBlur}
              onChange={(e) => field.onChange(e.target.files?.[0] ?? undefined)}
              type="file"
              accept={ATTACHMENT_ACCEPT}
              disabled={!config.blob}
              aria-invalid={!!errors.attachment}
              aria-describedby={describedBy('attachment-hint', errors.attachment && 'attachment-error')}
              className="w-full text-sm text-muted-foreground file:mr-4 file:rounded-sm file:border file:border-navy file:bg-background file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-navy hover:file:bg-pale disabled:cursor-not-allowed disabled:opacity-60"
            />
          )}
        />
        <FieldError id="attachment-error" message={err('attachment')} />
      </div>

      <div className="flex flex-col gap-2 border-t border-border pt-6">
        <div className="flex items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            aria-required="true"
            aria-invalid={!!errors.consent}
            aria-describedby={describedBy(errors.consent && 'consent-error')}
            className="mt-1 size-4 shrink-0 accent-primary"
            {...register('consent')}
          />
          <label htmlFor="consent" className="text-sm leading-relaxed text-navy">
            {copy.consentLead}{' '}
            <Link href="/privacy" className="text-primary underline underline-offset-2 hover:text-navy">
              {copy.consentLink}
            </Link>
            .
            <span aria-hidden="true" className="ml-1 text-primary">
              *
            </span>
          </label>
        </div>
        <FieldError id="consent-error" message={err('consent')} />
      </div>

      {canSubmit && turnstileSiteKey && <Turnstile siteKey={turnstileSiteKey} ref={turnstile} />}

      <div className="flex">
        <button
          type="submit"
          disabled={isSubmitting || !canSubmit}
          className={actionClasses('primary', 'w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto')}
        >
          {isSubmitting && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {isSubmitting ? copy.sending : copy.submit}
        </button>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {isSubmitting ? copy.sendingAnnouncement : ''}
      </p>
    </form>
  )
}
