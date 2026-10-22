import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ChevronRight } from 'lucide-react'
import { assignmentClient, assignments, company, solutions, whatsappHref } from '@/content/company'
import { cn } from '@/lib/utils'
import { WhatWeDo } from './what-we-do'

function Wrap({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-6xl px-5 md:px-8', className)}>{children}</div>
}

function Rule({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn('block h-0.5 w-10 bg-primary', className)} />
}

function Heading({ id, children, className }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <h2 id={id} className={cn('text-balance font-serif text-3xl font-normal leading-tight text-navy md:text-4xl', className)}>
      {children}
    </h2>
  )
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={cn('text-[13px] font-medium uppercase tracking-[0.12em]', light ? 'text-navy-foreground' : 'text-navy')}>
      {children}
    </p>
  )
}

function TextLink({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
  const cls =
    'group inline-flex items-center gap-1 text-[13px] font-semibold uppercase tracking-[0.12em] text-primary hover:text-navy'
  const Icon = external ? ArrowUpRight : ChevronRight
  const inner = (
    <>
      {children}
      <Icon className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </>
  )
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  )
}

function PillLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-2 self-start rounded-full border px-8 py-3 text-[13px] font-medium uppercase tracking-[0.12em] transition-colors',
        light
          ? 'border-navy-foreground/60 text-navy-foreground hover:bg-navy-foreground hover:text-navy'
          : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground',
      )}
    >
      {children}
      <ChevronRight className="size-3.5" aria-hidden="true" />
    </Link>
  )
}

export function ServicesStrip() {
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-28 border-b border-border bg-pale/25">
      <h2 id="services-title" className="sr-only">
        Our services
      </h2>
      <ul className="mx-auto grid max-w-7xl px-5 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        {solutions.map((s) => (
          <li
            key={s.id}
            className="border-b border-border py-8 last:border-b-0 md:py-8 md:[&:nth-child(-n+2)]:border-b md:even:border-l md:even:pl-10 md:odd:pr-10 lg:border-b-0 lg:border-l lg:px-10 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0 lg:[&:nth-child(-n+2)]:border-b-0"
          >
            <Link href={`/solutions#${s.id}`} className="group flex flex-col gap-2">
              <span className="text-[15px] text-primary">{s.title}</span>
              <span className="text-[13px] text-muted-foreground">
                {s.affiliated ? 'Via Asset One Africa' : 'Western Premium'}
              </span>
              <span className="text-pretty text-[17px] leading-relaxed text-navy group-hover:text-primary">
                {s.summary}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function WhoWeAre() {
  return (
    <section aria-labelledby="who-title">
      <Wrap className="flex flex-col gap-10 py-20">
        <div className="flex flex-col gap-4">
          <Rule />
          <Heading id="who-title">Who we are</Heading>
        </div>
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-12">
          <div className="flex flex-col gap-7 text-[17px] font-light leading-relaxed text-muted-foreground">
            <p className="text-pretty">
              Organisations depend on the right equipment arriving as specified, when it is needed. Since{' '}
              {company.founded}, Western Premium has worked within that cycle from {company.city}, sourcing IT
              equipment, industrial spares and operational essentials for institutional and commercial buyers.
            </p>
            <p className="text-pretty">
              Today, with a sourcing network across Ghana, the United Kingdom, the United Arab Emirates and the
              United States, our promise is simple: reliable equipment and lasting value, delivered to the agreed
              scope.
            </p>
            <PillLink href="/about">Discover more</PillLink>
          </div>
          <div className="relative aspect-square overflow-hidden bg-navy">
            <Image
              src="/images/who-we-are.jpg"
              alt="A Western Premium field technician checks a crated valve against its delivery record on a tablet"
              fill
              sizes="(min-width: 768px) 560px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Wrap>
    </section>
  )
}

export function WhatWeDoSection() {
  return (
    <section aria-labelledby="what-title" className="relative isolate">
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[55%] bg-navy" />
      <Wrap className="flex flex-col gap-4 pb-24 pt-4">
        <Rule />
        <Heading id="what-title">What we do</Heading>
        <p className="max-w-5xl text-pretty pb-12 pt-2 text-[17px] font-light leading-relaxed text-muted-foreground">
          We source and deliver the equipment that institutional and commercial organisations rely on, from end-user
          IT and networking to industrial spares and specialist items. Every requirement follows one coordinated
          process, from specification to delivery.
        </p>
        <WhatWeDo />
      </Wrap>
    </section>
  )
}

const exploreCards = [
  { title: 'Sectors we serve', href: '/sectors', image: '/images/home-hero-port.png' },
  { title: 'Requirements we have delivered', href: '/experience', image: '/images/logistics.png' },
  { title: 'Asset tracking with Asset One Africa', href: '/asset-one-africa', image: '/images/network.png' },
]

export function ExploreMore() {
  return (
    <section aria-labelledby="explore-title">
      <Wrap className="flex flex-col gap-12 py-20">
        <div className="flex flex-col gap-4">
          <Rule />
          <Heading id="explore-title">Explore more</Heading>
        </div>
        <ul className="grid gap-8 md:grid-cols-3">
          {exploreCards.map((card) => (
            <li key={card.href}>
              <Link
                href={card.href}
                className="on-navy group relative isolate flex aspect-[7/10] flex-col justify-end overflow-hidden bg-navy p-10 text-navy-foreground"
              >
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 360px, 100vw"
                  className="-z-20 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/85 via-navy/30 to-navy/10" />
                <Rule className="mb-4" />
                <h3 className="text-balance font-serif text-2xl font-normal leading-snug">{card.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  )
}

const workImages: Record<string, string> = {
  'wfp-ghana-tablets': '/images/hero-equipment.png',
  'mdf-workplace': '/images/home-datacentre.png',
  'unhrd-warehouse': '/images/industrial.png',
}

export function SelectedWork() {
  const [lead, ...rest] = assignments.filter((a) => a.status === 'Delivered' && a.organisationId).slice(0, 3)
  return (
    <section aria-labelledby="work-title" className="bg-pale/25">
      <Wrap className="flex flex-col gap-12 py-20">
        <div className="flex flex-col items-center gap-4 text-center">
          <Rule className="w-5" />
          <Eyebrow>Selected work</Eyebrow>
          <Heading id="work-title">Requirements we have delivered</Heading>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <article className="on-navy relative isolate flex min-h-[24rem] flex-col justify-end gap-4 overflow-hidden bg-navy p-10 text-navy-foreground">
            <Image
              src={workImages[lead.id]}
              alt=""
              fill
              sizes="(min-width: 768px) 560px, 100vw"
              className="-z-20 object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/90 via-navy/50 to-navy/10" />
            <Rule />
            <h3 className="text-balance font-serif text-2xl font-normal leading-snug">
              {lead.title} for {assignmentClient(lead).replace(/^International/, 'an international')}
            </h3>
            <p className="max-w-md text-pretty text-[15px] font-light leading-relaxed">{lead.description[0]}</p>
            <PillLink href="/experience" light>
              Read more
            </PillLink>
          </article>
          <ul className="flex flex-col gap-8">
            {rest.map((a) => (
              <li key={a.id} className="flex gap-7">
                <div className="relative size-28 shrink-0 overflow-hidden sm:size-40">
                  <Image src={workImages[a.id]} alt="" fill sizes="165px" className="object-cover" />
                </div>
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-5">
                    <Rule className="w-5" />
                    <Eyebrow>{a.sector}</Eyebrow>
                  </div>
                  <h3 className="text-pretty font-serif text-xl leading-snug text-navy">
                    {a.title} for {assignmentClient(a)}
                  </h3>
                  <p className="line-clamp-2 text-[13px] font-light leading-relaxed text-muted-foreground">
                    {a.description.join(' ')}
                  </p>
                  <div className="pt-1">
                    <TextLink href="/experience">Read more</TextLink>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Wrap>
    </section>
  )
}

const engageCards = [
  { title: 'Request a quotation', cta: 'Learn more', href: '/contact', image: '/images/hero-equipment.png', external: false },
  { title: 'Message us on WhatsApp', cta: 'Chat now', href: whatsappHref, image: '/images/home-datacentre.png', external: true },
]

export function Engage() {
  return (
    <section aria-labelledby="engage-title">
      <Wrap className="grid gap-10 py-20 md:grid-cols-3 md:gap-8">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-5">
            <Rule />
            <Eyebrow>Get in touch</Eyebrow>
          </div>
          <Heading id="engage-title">Start your next requirement</Heading>
          <p className="text-pretty text-[17px] font-light leading-relaxed text-muted-foreground">
            Share your specification, quantities and delivery location, and we will prepare a clear quotation.
          </p>
          <TextLink href="/contact">Explore</TextLink>
        </div>
        {engageCards.map((card) => (
          <div key={card.title} className="relative flex aspect-[9/10] flex-col justify-end">
            <Image src={card.image} alt="" fill sizes="(min-width: 768px) 360px, 100vw" className="object-cover" />
            <div className="relative flex w-3/4 flex-col gap-6 bg-background px-3 pb-8 pt-12">
              <h3 className="text-balance font-serif text-2xl font-normal leading-snug text-navy">{card.title}</h3>
              <TextLink href={card.href} external={card.external}>
                {card.cta}
              </TextLink>
            </div>
          </div>
        ))}
      </Wrap>
    </section>
  )
}
