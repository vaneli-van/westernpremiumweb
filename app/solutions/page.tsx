import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CompanyComparison } from '@/components/sections/company-comparison'
import { ProcessSteps } from '@/components/sections/process-steps'
import { ActionLink } from '@/components/site/action-link'
import { ClosingCta, Container, Eyebrow, PageHeader } from '@/components/site/page-primitives'
import { assetGovernance, type Solution, solutions, solutionsPage } from '@/content/company'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: solutionsPage.seoTitle,
  description: solutionsPage.metaDescription,
  alternates: { canonical: '/solutions' },
}

export default function SolutionsPage() {
  const supplied = solutions.filter((s) => !s.affiliated)
  const affiliated = solutions.find((s) => s.affiliated)

  return (
    <>
      <PageHeader eyebrow={solutionsPage.eyebrow} title={solutionsPage.title} intro={solutionsPage.intro}>
        <nav aria-label="Solutions on this page">
          <ul className="flex flex-wrap gap-2 pt-2">
            {solutions.map((s) => (
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

      {supplied.map((s, i) => (
        <SolutionSection key={s.id} solution={s} index={i} />
      ))}

      {affiliated && <AssetGovernanceSection solution={affiliated} />}

      <section>
        <Container className="flex flex-col gap-12 py-20 md:py-28">
          <div className="flex max-w-2xl flex-col gap-5">
            <Eyebrow>{solutionsPage.processEyebrow}</Eyebrow>
            <h2 className="text-balance font-serif text-3xl leading-tight text-navy md:text-5xl">
              {solutionsPage.processTitle}
            </h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">{solutionsPage.processIntro}</p>
          </div>
          <ProcessSteps detailed />
        </Container>
      </section>

      <ClosingCta />
    </>
  )
}

function SolutionSection({ solution: s, index }: { solution: Solution; index: number }) {
  const flipped = index % 2 === 1
  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className={cn('scroll-mt-20', flipped && 'bg-pale/40')}>
      <Container className="grid gap-12 py-20 md:py-24 lg:grid-cols-12">
        <div className={cn('flex flex-col gap-6 lg:col-span-6', flipped && 'lg:order-2 lg:col-start-7')}>
          <Eyebrow>{`Capability ${index + 1}`}</Eyebrow>
          <h2 id={`${s.id}-title`} className="text-balance font-serif text-3xl leading-tight text-navy md:text-5xl">
            {s.title}
          </h2>
          <div className="flex flex-col gap-4">
            {s.paragraphs.map((p) => (
              <p key={p} className="text-pretty leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-medium uppercase tracking-widest text-navy">{solutionsPage.examplesHeading}</h3>
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {s.examples.map((item) => (
                <li key={item} className="flex gap-3 border-b border-border py-3 text-sm leading-relaxed text-navy">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-2">
            <ActionLink href={`/contact?solution=${s.id}`} variant="primary" arrow>
              {s.enquireLabel}
            </ActionLink>
          </div>
        </div>
        {s.image && (
          <div className={cn('lg:col-span-5', flipped ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8')}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-pale lg:sticky lg:top-24">
              <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}

function AssetGovernanceSection({ solution: s }: { solution: Solution }) {
  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className="on-navy scroll-mt-20 bg-navy text-navy-foreground">
      <Container className="flex flex-col gap-14 py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Eyebrow tone="light">{assetGovernance.eyebrow}</Eyebrow>
            <h2 id={`${s.id}-title`} className="text-balance font-serif text-3xl leading-tight md:text-5xl">
              {s.title}
            </h2>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-6 lg:col-start-7">
            {s.paragraphs.map((p) => (
              <p key={p} className="text-pretty text-lg leading-relaxed text-pale/90">
                {p}
              </p>
            ))}
          </div>
        </div>

        <CompanyComparison tone="navy" />

        <div className="flex flex-wrap gap-3">
          <ActionLink href={`/contact?solution=${s.id}`} variant="light" arrow>
            {s.enquireLabel}
          </ActionLink>
          <ActionLink href="/assetone" variant="outline-light">
            {assetGovernance.secondaryLabel}
          </ActionLink>
        </div>
      </Container>
    </section>
  )
}
