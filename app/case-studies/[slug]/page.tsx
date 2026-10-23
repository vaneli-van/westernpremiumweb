import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { StatusBadge } from '@/components/sections/assignment-card'
import { ClosingCta, Container, Eyebrow } from '@/components/site/page-primitives'
import { assignmentClient, assignments } from '@/content/company'

const studies = assignments.filter((a) => a.caseStudy)

function find(slug: string) {
  return studies.find((a) => a.caseStudy!.slug === slug)
}

export function generateStaticParams() {
  return studies.map((a) => ({ slug: a.caseStudy!.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = find((await params).slug)
  if (!a) return {}
  return {
    title: `${a.title} for ${assignmentClient(a)}`,
    description: a.caseStudy!.summary,
    alternates: { canonical: `/case-studies/${a.caseStudy!.slug}` },
    openGraph: { images: [a.caseStudy!.image] },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const a = find((await params).slug)
  if (!a) notFound()
  const cs = a.caseStudy!
  const facts = [
    { label: 'Client', value: assignmentClient(a) },
    { label: 'Sector', value: a.sector },
    { label: 'Country', value: cs.country },
    ...(a.year ? [{ label: 'Year', value: a.year }] : []),
  ]
  const others = studies.filter((s) => s.id !== a.id).slice(0, 3)

  return (
    <>
      <section className="border-b border-border">
        <Container className="flex flex-col gap-8 py-14 md:py-20">
          <Link
            href="/case-studies"
            className="inline-flex w-fit items-center gap-1 text-[13px] font-semibold uppercase tracking-[0.12em] text-primary hover:text-navy"
          >
            <ChevronLeft className="size-3.5" aria-hidden="true" />
            All case studies
          </Link>
          <div className="flex flex-col gap-5 md:max-w-3xl">
            <Eyebrow>Case study</Eyebrow>
            <h1 className="text-balance font-serif text-4xl leading-tight text-navy md:text-5xl">
              {a.title} for {assignmentClient(a)}
            </h1>
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">{cs.summary}</p>
          </div>
        </Container>
      </section>

      <section>
        <Container className="grid gap-12 py-14 md:grid-cols-12 md:py-20">
          <div className="flex flex-col gap-12 md:col-span-8">
            <div className="relative aspect-[3/2] overflow-hidden bg-pale">
              <Image src={cs.image} alt={cs.imageAlt} fill priority sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-2xl text-navy md:text-3xl">The requirement</h2>
              <p className="text-pretty text-lg leading-relaxed text-navy/80">{cs.requirement}</p>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-2xl text-navy md:text-3xl">What we did</h2>
              {cs.approach.map((p) => (
                <p key={p} className="text-pretty text-lg leading-relaxed text-navy/80">
                  {p}
                </p>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-2xl text-navy md:text-3xl">Outcome</h2>
              <p className="text-pretty text-lg leading-relaxed text-navy/80">{cs.outcome}</p>
            </div>
          </div>

          <aside className="flex flex-col gap-8 md:col-span-4">
            <div className="flex flex-col gap-6 border-t-2 border-navy pt-6 md:sticky md:top-32">
              {cs.highlight && (
                <div className="flex flex-col gap-1">
                  <p className="font-serif text-5xl text-primary">{cs.highlight.value}</p>
                  <p className="text-sm uppercase tracking-widest text-muted-foreground">{cs.highlight.label}</p>
                </div>
              )}
              <dl className="flex flex-col">
                {facts.map((f) => (
                  <div key={f.label} className="flex flex-col gap-1 border-b border-border py-4">
                    <dt className="text-xs uppercase tracking-widest text-muted-foreground">{f.label}</dt>
                    <dd className="text-navy">{f.value}</dd>
                  </div>
                ))}
                <div className="flex flex-col gap-2 py-4">
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground">Status</dt>
                  <dd>
                    <StatusBadge status={a.status} />
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </Container>
      </section>

      {others.length > 0 && (
        <section aria-labelledby="more-title" className="bg-pale/40">
          <Container className="flex flex-col gap-10 py-20">
            <h2 id="more-title" className="font-serif text-3xl text-navy">
              More case studies
            </h2>
            <ul className="grid gap-8 md:grid-cols-3">
              {others.map((o) => (
                <li key={o.id}>
                  <Link href={`/case-studies/${o.caseStudy!.slug}`} className="group flex flex-col gap-4">
                    <div className="relative aspect-[3/2] overflow-hidden bg-pale">
                      <Image
                        src={o.caseStudy!.image}
                        alt={o.caseStudy!.imageAlt}
                        fill
                        sizes="(min-width: 768px) 360px, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <p className="text-xs font-medium uppercase tracking-widest text-primary">
                      {[o.sector, o.caseStudy!.country].join(' · ')}
                    </p>
                    <h3 className="text-balance font-serif text-xl leading-snug text-navy">
                      {o.title} for {assignmentClient(o)}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <ClosingCta />
    </>
  )
}
