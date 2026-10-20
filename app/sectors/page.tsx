import type { Metadata } from 'next'
import Link from 'next/link'
import { ActionLink } from '@/components/site/action-link'
import { ClosingCta, Container, PageHeader } from '@/components/site/page-primitives'
import { organisationLabel, sectors, sectorsPage } from '@/content/company'

export const metadata: Metadata = {
  title: sectorsPage.title,
  description: sectorsPage.metaDescription,
  alternates: { canonical: '/sectors' },
  openGraph: { title: `${sectorsPage.title} | Western Premium`, description: sectorsPage.metaDescription, url: '/sectors' },
}

export default function SectorsPage() {
  return (
    <>
      <PageHeader eyebrow={sectorsPage.eyebrow} title={sectorsPage.title} intro={sectorsPage.intro}>
        <nav aria-label="Sectors on this page">
          <ul className="flex flex-wrap gap-2 pt-2">
            {sectors.map((s) => (
              <li key={s.id}>
                <Link
                  href={`#${s.id}`}
                  className="inline-block rounded-sm border border-border px-3 py-2 text-sm text-navy hover:border-primary hover:text-primary"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      <div className="flex flex-col">
        {sectors.map((sector, i) => (
          <section
            key={sector.id}
            id={sector.id}
            aria-labelledby={`${sector.id}-title`}
            className={i % 2 === 1 ? 'scroll-mt-20 bg-pale/40' : 'scroll-mt-20'}
          >
            <Container className="grid gap-12 py-20 md:py-24 lg:grid-cols-12">
              <div className="flex flex-col gap-6 lg:col-span-6">
                <h2 id={`${sector.id}-title`} className="text-balance font-serif text-3xl leading-tight text-navy md:text-5xl">
                  {sector.title}
                </h2>
                {sector.paragraphs.map((p) => (
                  <p key={p} className="text-pretty leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
              <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:col-start-8 lg:grid-cols-1">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xs font-medium uppercase tracking-widest text-navy">{sectorsPage.itemsHeading}</h3>
                  <ul className="flex flex-col">
                    {sector.typicalItems.map((item) => (
                      <li key={item} className="flex gap-3 border-b border-border py-3 text-sm leading-relaxed text-navy">
                        <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xs font-medium uppercase tracking-widest text-navy">{sectorsPage.organisationsHeading}</h3>
                  <ul className="flex flex-col">
                    {sector.organisationIds.map((id) => (
                      <li key={id} className="border-b border-border py-3 text-sm leading-relaxed text-muted-foreground">
                        {organisationLabel(id)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Container>
          </section>
        ))}
      </div>

      <section className="border-t border-border">
        <Container className="flex flex-col items-start gap-6 py-12">
          <p className="max-w-3xl text-pretty text-sm leading-relaxed text-muted-foreground">{sectorsPage.disclaimer}</p>
          <ActionLink href="/experience" variant="outline" arrow>
            {sectorsPage.experienceLabel}
          </ActionLink>
        </Container>
      </section>

      <ClosingCta />
    </>
  )
}
