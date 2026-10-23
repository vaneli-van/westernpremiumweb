import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { StatusBadge } from '@/components/sections/assignment-card'
import { ClosingCta, Container, PageHeader } from '@/components/site/page-primitives'
import {
  assignmentClient,
  assignmentDescription,
  assignments,
  experiencePage,
  organisationLabel,
  sectors,
} from '@/content/company'

export const metadata: Metadata = {
  title: experiencePage.seoTitle,
  description: experiencePage.metaDescription,
  alternates: { canonical: '/case-studies' },
}

export default function CaseStudiesPage() {
  const studies = assignments.filter((a) => a.caseStudy)
  const further = assignments.filter((a) => !a.caseStudy)
  return (
    <>
      <PageHeader eyebrow={experiencePage.eyebrow} title={experiencePage.title} intro={experiencePage.intro} />

      <section aria-labelledby="studies-title">
        <Container className="flex flex-col gap-10 py-20 md:py-24">
          <h2 id="studies-title" className="text-balance font-serif text-3xl leading-tight text-navy md:text-4xl">
            {experiencePage.caseStudiesHeading}
          </h2>
          <ul className="grid gap-10 md:grid-cols-2">
            {studies.map((a) => {
              const cs = a.caseStudy!
              return (
                <li key={a.id}>
                  <Link href={`/case-studies/${cs.slug}`} className="group flex h-full flex-col gap-5">
                    <div className="relative aspect-[3/2] overflow-hidden bg-pale">
                      <Image
                        src={cs.image}
                        alt={cs.imageAlt}
                        fill
                        sizes="(min-width: 768px) 540px, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <p className="text-xs font-medium uppercase tracking-widest text-primary">
                        {[a.sector, cs.country, a.year].filter(Boolean).join(' · ')}
                      </p>
                      <StatusBadge status={a.status} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium text-navy/70">{assignmentClient(a)}</p>
                      <h3 className="text-balance font-serif text-2xl leading-snug text-navy">{a.title}</h3>
                      <p className="text-pretty leading-relaxed text-muted-foreground">{cs.summary}</p>
                    </div>
                    <span className="mt-auto inline-flex items-center gap-1 text-[13px] font-semibold uppercase tracking-[0.12em] text-primary">
                      {experiencePage.readMore}
                      <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </Container>
      </section>

      {further.length > 0 && (
        <section aria-labelledby="further-title" className="bg-pale/40">
          <Container className="flex flex-col gap-10 py-20 md:py-24">
            <h2 id="further-title" className="text-balance font-serif text-3xl leading-tight text-navy md:text-4xl">
              {experiencePage.assignmentsHeading}
            </h2>
            <ol className="flex flex-col">
              {further.map((a) => (
                <li key={a.id} className="grid gap-4 border-t border-navy/30 py-8 lg:grid-cols-12 lg:gap-8">
                  <div className="flex flex-col gap-2 lg:col-span-4">
                    <p className="text-sm font-medium text-primary">{assignmentClient(a)}</p>
                    <h3 className="font-serif text-2xl leading-snug text-navy">{a.title}</h3>
                  </div>
                  <div className="flex flex-col gap-2 lg:col-span-8">
                    {assignmentDescription(a).map((sentence) => (
                      <p key={sentence} className="text-pretty leading-relaxed text-navy/80">
                        {sentence}
                      </p>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      )}

      <section aria-labelledby="organisations-title">
        <Container className="flex flex-col gap-10 py-20 md:py-24">
          <div className="flex max-w-2xl flex-col gap-4">
            <h2 id="organisations-title" className="text-balance font-serif text-3xl leading-tight text-navy md:text-4xl">
              {experiencePage.organisationsHeading}
            </h2>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{experiencePage.organisationsNote}</p>
          </div>
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((sector) => (
              <div key={sector.id} className="flex flex-col gap-4 bg-background p-6">
                <h3 className="text-xs font-medium uppercase tracking-widest text-primary">{sector.groupTitle}</h3>
                <ul className="flex flex-col">
                  {sector.organisationIds.map((id) => (
                    <li key={id} className="border-b border-border py-3 leading-relaxed text-navy last:border-b-0">
                      {organisationLabel(id)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="max-w-3xl border-t border-navy/30 pt-6 text-sm leading-relaxed text-muted-foreground">
            {experiencePage.footnote}
          </p>
        </Container>
      </section>

      <ClosingCta />
    </>
  )
}
