import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ActionLink } from '@/components/site/action-link'
import { Container } from '@/components/site/page-primitives'
import { AssignmentCard } from '@/components/sections/assignment-card'
import {
  assignments,
  company,
  organisationLabel,
  sectors,
  solutions,
  sourcingNetwork,
  suppliedBrands,
  whatsappHref,
} from '@/content/company'
import { cn } from '@/lib/utils'

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={cn('text-xs font-medium uppercase tracking-widest', light ? 'text-pale' : 'text-primary')}>
      {children}
    </p>
  )
}

function SectionHeading({ id, children, className }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <h2
      id={id}
      className={cn('text-balance font-sans text-4xl font-medium leading-tight tracking-tight md:text-6xl', className)}
    >
      {children}
    </h2>
  )
}

export function Statement() {
  return (
    <section aria-labelledby="statement-title">
      <Container className="flex flex-col gap-12 py-24 md:py-36">
        <SectionLabel>Who we are</SectionLabel>
        <p
          id="statement-title"
          className="max-w-5xl text-pretty font-sans text-3xl font-normal leading-snug tracking-tight text-navy md:text-5xl"
        >
          An indigenous Ghanaian supply company. Since {company.founded}, we have sourced the equipment and essentials
          that keep institutional and commercial operations running, <span className="text-muted-foreground">and coordinated delivery to the agreed scope.</span>
        </p>
        <ActionLink href="/about" variant="outline" arrow className="self-start">
          About Western Premium
        </ActionLink>
      </Container>
    </section>
  )
}

export function FactsBand() {
  const supplied = new Set(
    assignments.filter((a) => a.status === 'Delivered' && a.organisationId).map((a) => a.organisationId),
  ).size
  const facts = [
    { value: company.founded, label: `Founded in ${company.city}` },
    { value: String(supplied), label: 'Organisations supplied' },
    { value: String(sectors.length), label: 'Sectors served' },
    { value: String(sourcingNetwork.length), label: 'Sourcing markets' },
  ]
  return (
    <section aria-label="Company facts" className="on-navy bg-navy text-navy-foreground">
      <Container>
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <div
              key={f.label}
              className="flex flex-col-reverse gap-3 border-navy-foreground/15 py-12 odd:border-r lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0 [&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0 px-5"
            >
              <dt className="text-sm text-pale">{f.label}</dt>
              <dd className="font-sans text-5xl font-medium tracking-tight md:text-6xl">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}

export function ServicesStrip() {
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-20 border-b border-border bg-pale/30">
      <h2 id="services-title" className="sr-only">
        Our services
      </h2>
      <Container>
        <ul className="grid md:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s) => (
            <li
              key={s.id}
              className="border-b border-navy/15 last:border-b-0 md:odd:pr-8 md:even:border-l md:even:pl-8 md:[&:nth-child(-n+2)]:border-b lg:border-b-0 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0 lg:[&:nth-child(-n+2)]:border-b-0"
            >
              <Link href={`/solutions#${s.id}`} className="group flex h-full flex-col gap-3 py-10">
                <p className="text-base font-medium text-primary">{s.title}</p>
                <p className="text-sm text-muted-foreground">
                  {s.affiliated ? 'Via Asset One Africa' : 'Western Premium'}
                </p>
                <p className="text-pretty text-lg leading-relaxed text-navy transition-colors group-hover:text-primary">
                  {s.summary}
                </p>
                <span className="mt-auto flex items-center gap-2 pt-2 text-sm font-medium text-navy">
                  Learn more
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export function SectorIndex() {
  return (
    <section aria-labelledby="sectors-title">
      <Container className="flex flex-col gap-14 py-24 md:py-32">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="flex max-w-3xl flex-col gap-6">
            <SectionLabel>Sectors</SectionLabel>
            <SectionHeading id="sectors-title" className="text-navy">
              Trusted by organisations with structured procurement.
            </SectionHeading>
          </div>
          <ActionLink href="/sectors" variant="text" arrow className="shrink-0 text-base">
            Explore sectors
          </ActionLink>
        </div>
        <ul className="flex flex-col border-b border-navy/15">
          {sectors.map((sector) => (
            <li key={sector.id} className="border-t border-navy/15">
              <Link
                href={`/sectors#${sector.id}`}
                className="group grid gap-4 py-8 transition-colors md:grid-cols-12 md:gap-8 md:py-10"
              >
                <h3 className="text-balance font-sans text-2xl font-medium tracking-tight text-navy transition-colors group-hover:text-primary md:col-span-5 md:text-3xl">
                  {sector.title}
                </h3>
                <div className="flex flex-col gap-3 md:col-span-6">
                  <p className="text-pretty leading-relaxed text-muted-foreground">{sector.description}</p>
                  <p className="text-sm font-medium text-navy">
                    {sector.organisationIds.slice(0, 4).map(organisationLabel).join('  /  ')}
                  </p>
                </div>
                <ArrowRight
                  className="hidden size-6 justify-self-end text-navy transition-transform group-hover:translate-x-1 group-hover:text-primary md:col-span-1 md:block"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export function AffiliationFeature() {
  return (
    <section aria-labelledby="aoa-title" className="on-navy relative isolate overflow-hidden bg-navy text-navy-foreground">
      <Image src="/images/network.png" alt="" fill sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/30" />
      <Container className="flex min-h-[36rem] flex-col justify-center gap-8 py-24">
        <SectionLabel light>Sister company &middot; Asset One Africa</SectionLabel>
        <SectionHeading id="aoa-title" className="max-w-2xl">
          Supporting assets beyond procurement.
        </SectionHeading>
        <p className="max-w-xl text-pretty text-lg leading-relaxed text-pale">
          Through Asset One Africa, clients can explore asset tracking and reporting, with the scope agreed around their
          requirements.
        </p>
        <ActionLink href="/asset-one-africa" variant="light" arrow className="self-start">
          Explore Asset One Africa
        </ActionLink>
      </Container>
    </section>
  )
}

export function SelectedWork() {
  const featured = assignments.filter((a) => a.status === 'Delivered' && a.organisationId).slice(0, 3)
  return (
    <section aria-labelledby="work-title">
      <Container className="flex flex-col gap-14 py-24 md:py-32">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="flex max-w-3xl flex-col gap-6">
            <SectionLabel>Selected work</SectionLabel>
            <SectionHeading id="work-title" className="text-navy">
              Requirements we have delivered.
            </SectionHeading>
          </div>
          <ActionLink href="/experience" variant="text" arrow className="shrink-0 text-base">
            View experience
          </ActionLink>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          {featured.map((a) => (
            <AssignmentCard key={a.id} assignment={a} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export function BrandsRow() {
  return (
    <section aria-labelledby="brands-title" className="border-y border-border">
      <Container className="flex flex-col gap-8 py-14 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-xs flex-col gap-2">
          <h2 id="brands-title" className="text-sm font-medium text-navy">
            {suppliedBrands.title}
          </h2>
          <p className="text-xs leading-relaxed text-muted-foreground">{suppliedBrands.note}</p>
        </div>
        <ul className="flex flex-wrap items-center gap-x-12 gap-y-4">
          {suppliedBrands.names.map((name) => (
            <li key={name} className="font-sans text-2xl font-semibold tracking-tight text-navy/50">
              {name}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export function HomeCta() {
  return (
    <section aria-labelledby="cta-title">
      <Container className="grid gap-12 py-24 md:py-36 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-8">
          <SectionLabel>Start a requirement</SectionLabel>
          <SectionHeading id="cta-title" className="text-navy md:text-7xl">
            Tell us what you need to source.
          </SectionHeading>
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <ActionLink href="/contact" arrow className="w-full sm:w-auto">
              Request a Quote
            </ActionLink>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-navy px-5 py-3 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-navy-foreground sm:w-auto"
            >
              Message us on WhatsApp
            </a>
          </div>
        </div>
        <dl className="flex flex-col gap-6 border-t border-navy/15 pt-8 lg:col-span-4 lg:self-end lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <div className="flex flex-col gap-1">
            <dt className="text-xs uppercase tracking-widest text-muted-foreground">Call</dt>
            <dd>
              <a href={company.phoneHref} className="text-lg font-medium text-navy hover:text-primary">
                {company.phone}
              </a>
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-xs uppercase tracking-widest text-muted-foreground">Email</dt>
            <dd>
              <a href={`mailto:${company.email}`} className="break-all text-lg font-medium text-navy hover:text-primary">
                {company.email}
              </a>
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-xs uppercase tracking-widest text-muted-foreground">Office</dt>
            <dd className="text-lg font-medium text-navy">
              {company.address.street}, {company.address.locality}, {company.address.city}
            </dd>
          </div>
        </dl>
      </Container>
    </section>
  )
}
