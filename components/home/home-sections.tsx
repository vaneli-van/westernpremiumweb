import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ActionLink } from '@/components/site/action-link'
import { Container, Eyebrow } from '@/components/site/page-primitives'
import { ProfileDownload } from '@/components/site/profile-download'
import { AssignmentCard } from '@/components/sections/assignment-card'
import { ProcessSteps } from '@/components/sections/process-steps'
import {
  assignments,
  company,
  organisationLabel,
  sectors,
  solutions,
  sourcingNetwork,
  suppliedBrands,
} from '@/content/company'

export function Introduction() {
  return (
    <section>
      <Container className="grid gap-10 py-20 md:grid-cols-12 md:py-28">
        <div className="flex flex-col gap-10 md:col-span-4">
          <Eyebrow>Who we are</Eyebrow>
          <dl className="flex flex-col border-t border-border">
            {[
              { term: 'Founded', detail: company.founded },
              { term: 'Based in', detail: `${company.city}, Ghana` },
              { term: 'Sourcing from', detail: sourcingNetwork.join(', ') },
            ].map((fact) => (
              <div key={fact.term} className="flex flex-col gap-1 border-b border-border py-4">
                <dt className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{fact.term}</dt>
                <dd className="font-serif text-xl leading-snug text-navy">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex flex-col gap-6 md:col-span-7 md:col-start-6">
          <h2 className="text-balance font-serif text-3xl leading-tight text-navy md:text-5xl">
            The supply partner behind your daily operations.
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            From workplace technology and recurring consumables to industrial spares and specialist equipment, we help
            organisations source what they need and coordinate delivery around the agreed scope.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <ActionLink href="/about" variant="text" arrow>
              About Western Premium
            </ActionLink>
            <ProfileDownload />
          </div>
        </div>
      </Container>
    </section>
  )
}

export function SolutionsOverview() {
  return (
    <section className="bg-pale/40">
      <Container className="flex flex-col gap-12 py-20 md:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="flex max-w-2xl flex-col gap-5">
            <Eyebrow>Solutions</Eyebrow>
            <h2 className="text-balance font-serif text-3xl leading-tight text-navy md:text-5xl">
              Four capabilities, one coordinated supply process.
            </h2>
          </div>
          <ActionLink href="/solutions" variant="outline" arrow>
            All solutions
          </ActionLink>
        </div>
        <ul className="grid gap-px bg-border md:grid-cols-2">
          {solutions.map((s) => (
            <li key={s.id} className="bg-background">
              <Link
                href={`/solutions#${s.id}`}
                className="group flex h-full flex-col gap-4 p-8 transition-colors hover:bg-pale/30 md:p-10"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-2xl leading-snug text-navy">{s.title}</h3>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-pretty leading-relaxed text-muted-foreground">{s.summary}</p>
                {s.affiliated && (
                  <p className="mt-auto text-xs font-medium uppercase tracking-widest text-primary">
                    Via sister company Asset One Africa
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export function SectorExperience() {
  return (
    <section>
      <Container className="grid gap-12 py-20 md:py-28 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-4">
          <Eyebrow>Sector experience</Eyebrow>
          <h2 className="text-balance font-serif text-3xl leading-tight text-navy md:text-4xl">
            Experience with institutional procurement.
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Our supply experience spans organisations with structured procurement processes, specific documentation
            and multi-stage delivery requirements.
          </p>
          <ActionLink href="/sectors" variant="text" arrow>
            Explore sectors
          </ActionLink>
        </div>
        <ul className="grid gap-px bg-border sm:grid-cols-2 lg:col-span-8">
          {sectors.map((sector) => (
            <li key={sector.id} className="flex flex-col gap-4 bg-background p-6 md:p-8">
              <h3 className="font-serif text-2xl leading-snug text-navy">{sector.title}</h3>
              <ul className="flex flex-col gap-2">
                {sector.organisationIds.map((id) => (
                  <li key={id} className="flex gap-3 text-base leading-relaxed text-muted-foreground">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-primary" />
                    {organisationLabel(id)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export function SelectedAssignments() {
  const featured = assignments.filter((a) => a.status === 'Delivered' && a.organisationId).slice(0, 3)
  return (
    <section className="border-t border-border">
      <Container className="flex flex-col gap-12 py-20 md:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="flex max-w-2xl flex-col gap-5">
            <Eyebrow>Selected assignments</Eyebrow>
            <h2 className="text-balance font-serif text-3xl leading-tight text-navy md:text-5xl">
              Requirements we have supplied.
            </h2>
          </div>
          <ActionLink href="/experience" variant="outline" arrow>
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

export function SuppliedBrands() {
  return (
    <section aria-labelledby="supplied-brands-title" className="border-t border-border bg-pale/40">
      <Container className="flex flex-col gap-8 py-14 md:py-16">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="flex flex-col gap-4">
            <Eyebrow>{suppliedBrands.eyebrow}</Eyebrow>
            <h2 id="supplied-brands-title" className="text-balance font-serif text-2xl leading-tight text-navy md:text-3xl">
              {suppliedBrands.title}
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">{suppliedBrands.note}</p>
        </div>
        <ul className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-6">
          {suppliedBrands.names.map((name) => (
            <li
              key={name}
              className="flex h-20 items-center justify-center bg-background px-4 text-center text-lg font-semibold tracking-tight text-navy/80"
            >
              {name}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export function AffiliationPanel() {
  return (
    <section className="on-navy bg-navy text-navy-foreground">
      <Container className="grid gap-12 py-20 md:py-28 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-7">
          <Eyebrow tone="light">Sister company</Eyebrow>
          <h2 className="text-balance font-serif text-3xl leading-tight md:text-5xl">
            Supporting assets beyond procurement.
          </h2>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-pale/90">
            Western Premium supplies the equipment and operational essentials organisations depend on. Through our
            sister company, Asset One Africa, clients can also explore asset tracking and reporting solutions, with
            the scope agreed around their requirements.
          </p>
          <div className="pt-2">
            <ActionLink href="/asset-one-africa" variant="light" arrow>
              Explore Asset One Africa
            </ActionLink>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm lg:col-span-5 lg:col-start-8 lg:self-center">
          <Image
            src="/images/network.png"
            alt="Labelled network switches and patch cabling in a server rack"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  )
}

export function DeliveryProcess() {
  return (
    <section>
      <Container className="flex flex-col gap-12 py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-6">
            <Eyebrow>How we deliver</Eyebrow>
            <h2 className="text-balance font-serif text-3xl leading-tight text-navy md:text-5xl">
              A clear process from requirement to delivery.
            </h2>
            <p className="max-w-lg text-pretty leading-relaxed text-muted-foreground">
              Every order follows the same coordinated sequence, so you know what happens next and who is responsible
              for it.
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-pale lg:col-span-6">
            <Image
              src="/images/logistics.png"
              alt="Wrapped pallets and labelled cartons on warehouse racking"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <ProcessSteps />
      </Container>
    </section>
  )
}
