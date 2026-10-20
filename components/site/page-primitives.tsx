import { cn } from '@/lib/utils'
import { ActionLink } from './action-link'
import { Pillars } from './pillars'

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-7xl px-5 md:px-8', className)}>{children}</div>
}

export function Eyebrow({ children, tone = 'dark' }: { children: React.ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 text-xs font-medium uppercase tracking-widest',
        tone === 'dark' ? 'text-primary' : 'text-pale',
      )}
    >
      <span aria-hidden="true" className={cn('h-px w-8', tone === 'dark' ? 'bg-primary' : 'bg-pale')} />
      {children}
    </p>
  )
}

/** Renders a confirmed value, or a visible [TOKEN] placeholder while the value is still null. */
export function Pending({ value, token }: { value: string | null; token: string }) {
  if (value) return <>{value}</>
  return (
    <span
      title="Placeholder awaiting a confirmed value"
      className="rounded-sm border border-dashed border-primary/60 bg-pale/50 px-1.5 text-[0.9em] text-primary"
    >
      {`[${token}]`}
    </span>
  )
}

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string
  title: string
  intro?: string
  children?: React.ReactNode
}) {
  return (
    <section className="border-b border-border">
      <Container className="grid gap-10 py-16 md:grid-cols-12 md:py-24">
        <div className="flex flex-col gap-6 md:col-span-8">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-balance font-serif text-4xl leading-tight text-navy md:text-6xl">{title}</h1>
          {intro && <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">{intro}</p>}
          {children}
        </div>
        <div className="hidden h-48 self-end md:col-span-3 md:col-start-10 md:block">
          <Pillars heights={[30, 48, 66, 84, 100]} />
        </div>
      </Container>
    </section>
  )
}

export function ClosingCta({
  title = 'Let us support your next requirement.',
  body = 'Share your specifications, quantities, delivery location and required timeline. Our team will develop a quotation around your scope.',
  action = 'Request a Quote',
  href = '/contact',
}: {
  title?: string
  body?: string
  action?: string
  href?: string
}) {
  return (
    <section className="on-navy bg-navy text-navy-foreground">
      <Container className="grid items-end gap-10 py-20 md:grid-cols-12 md:py-24">
        <div className="flex flex-col gap-5 md:col-span-7">
          <h2 className="text-balance font-serif text-3xl leading-tight md:text-5xl">{title}</h2>
          <p className="max-w-xl text-pretty leading-relaxed text-pale/90">{body}</p>
          <div className="pt-2">
            <ActionLink href={href} variant="light" arrow>
              {action}
            </ActionLink>
          </div>
        </div>
        <div className="hidden h-44 md:col-span-4 md:col-start-9 md:block">
          <Pillars tone="pale" heights={[100, 84, 66, 48, 30]} />
        </div>
      </Container>
    </section>
  )
}
