import type { Metadata } from 'next'
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
  title: experiencePage.title,
  description: experiencePage.metaDescription,
  alternates: { canonical: '/experience' },
}

export default function ExperiencePage() {
  return (
    <>
      <PageHeader eyebrow={experiencePage.eyebrow} title={experiencePage.title} intro={experiencePage.intro} />

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
        </Container>
      </section>

      <section aria-labelledby="assignments-title" className="bg-pale/40">
        <Container className="flex flex-col gap-10 py-20 md:py-24">
          <div className="flex max-w-2xl flex-col gap-4">
            <h2 id="assignments-title" className="text-balance font-serif text-3xl leading-tight text-navy md:text-4xl">
              {experiencePage.assignmentsHeading}
            </h2>
          </div>
          <ol className="flex flex-col">
            {assignments.map((a) => (
              <li key={a.id} className="grid gap-4 border-t border-navy/30 py-8 lg:grid-cols-12 lg:gap-8">
                <div className="flex flex-col gap-2 lg:col-span-4">
                  <p className="text-sm font-medium text-primary">{assignmentClient(a)}</p>
                  <h3 className="font-serif text-2xl leading-snug text-navy">{a.title}</h3>
                </div>
                <div className="flex flex-wrap items-start gap-3 lg:col-span-2 lg:flex-col">
                  {a.year && <span className="text-sm text-muted-foreground">{a.year}</span>}
                  <StatusBadge status={a.status} />
                </div>
                <div className="flex flex-col gap-2 lg:col-span-6">
                  {assignmentDescription(a).map((sentence) => (
                    <p key={sentence} className="text-pretty leading-relaxed text-navy/80">
                      {sentence}
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ol>
          <p className="max-w-3xl border-t border-navy/30 pt-6 text-sm leading-relaxed text-muted-foreground">
            {experiencePage.footnote}
          </p>
        </Container>
      </section>

      <ClosingCta />
    </>
  )
}
