import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { ProcessSteps } from '@/components/sections/process-steps'
import { ActionLink } from '@/components/site/action-link'
import { ClosingCta, Container, Eyebrow } from '@/components/site/page-primitives'
import { assignmentClient, assignments, company, solutions, whatsappHref } from '@/content/company'
import { findSolutionPage, solutionPages } from '@/content/solution-pages'

export function generateStaticParams() {
  return solutionPages.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = findSolutionPage((await params).slug)
  if (!page) return {}
  const path = `/solutions/${page.slug}`
  return {
    title: page.seoTitle,
    description: page.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: `${page.seoTitle} | Western Premium`,
      description: page.metaDescription,
      url: path,
      images: [page.image.src],
    },
  }
}

export default async function SolutionLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const page = findSolutionPage((await params).slug)
  if (!page) notFound()
  const solution = solutions.find((s) => s.id === page.solutionId)!
  const studies = page.caseStudies
    .map((slug) => assignments.find((a) => a.caseStudy?.slug === slug))
    .filter((a): a is (typeof assignments)[number] => Boolean(a))
  const others = solutionPages.filter((p) => p.slug !== page.slug)
  const url = `${company.siteUrl}/solutions/${page.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: solution.title,
        serviceType: page.eyebrow,
        description: page.metaDescription,
        url,
        provider: { '@id': `${company.siteUrl}/#organization` },
        areaServed: company.areaServed.map((name) => ({ '@type': 'Country', name })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: company.siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Solutions', item: `${company.siteUrl}/solutions` },
          { '@type': 'ListItem', position: 3, name: solution.title, item: url },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <section className="border-b border-border">
        <Container className="grid gap-12 py-14 md:py-20 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <Link
              href="/solutions"
              className="inline-flex w-fit items-center gap-1 text-[13px] font-semibold uppercase tracking-[0.12em] text-primary hover:text-navy"
            >
              <ChevronLeft className="size-3.5" aria-hidden="true" />
              All solutions
            </Link>
            <Eyebrow>{page.eyebrow}</Eyebrow>
            <h1 className="text-balance font-serif text-4xl leading-tight text-navy md:text-6xl">{page.h1}</h1>
            <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">{page.intro}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <ActionLink href={`/contact?solution=${page.solutionId}`} variant="primary" arrow>
                Request a Quote
              </ActionLink>
              <ActionLink href={whatsappHref} variant="outline">
                Message us on WhatsApp
              </ActionLink>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-pale">
              <Image src={page.image.src} alt={page.image.alt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="supply-title">
        <Container className="flex flex-col gap-10 py-20 md:py-24">
          <h2 id="supply-title" className="font-serif text-3xl text-navy md:text-5xl">
            {page.supplyHeading}
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {page.supplyGroups.map((g) => (
              <div key={g.heading} className="flex flex-col gap-3 border-t-2 border-navy pt-5">
                <h3 className="text-xs font-medium uppercase tracking-widest text-navy">{g.heading}</h3>
                <ul className="flex flex-col">
                  {g.items.map((item) => (
                    <li key={item} className="flex gap-3 border-b border-border py-3 text-sm leading-relaxed text-navy">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-pale/40">
        <Container className="grid gap-16 py-20 md:py-24 lg:grid-cols-12">
          <div className="flex flex-col gap-14 lg:col-span-7">
            {page.sections.map((s) => (
              <div key={s.heading} className="flex flex-col gap-4">
                <h2 className="text-balance font-serif text-2xl leading-tight text-navy md:text-4xl">{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p} className="text-pretty text-lg leading-relaxed text-navy/80">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <aside className="flex flex-col gap-4 lg:col-span-4 lg:col-start-9">
            <h2 className="text-xs font-medium uppercase tracking-widest text-navy">{page.buyersHeading}</h2>
            <ul className="flex flex-col border-t-2 border-navy">
              {page.buyers.map((b) => (
                <li key={b} className="border-b border-border py-4 text-navy">
                  {b}
                </li>
              ))}
            </ul>
            <Link href="/sectors" className="text-sm font-semibold text-primary hover:text-navy">
              See the sectors we supply
            </Link>
          </aside>
        </Container>
      </section>

      {studies.length > 0 && (
        <section aria-labelledby="proof-title">
          <Container className="flex flex-col gap-10 py-20 md:py-24">
            <h2 id="proof-title" className="font-serif text-3xl text-navy md:text-5xl">
              Related case studies
            </h2>
            <ul className="grid gap-8 md:grid-cols-2">
              {studies.map((a) => (
                <li key={a.id}>
                  <Link href={`/case-studies/${a.caseStudy!.slug}`} className="group flex flex-col gap-4">
                    <div className="relative aspect-[3/2] overflow-hidden bg-pale">
                      <Image
                        src={a.caseStudy!.image}
                        alt={a.caseStudy!.imageAlt}
                        fill
                        sizes="(min-width: 768px) 560px, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <p className="text-xs font-medium uppercase tracking-widest text-primary">
                      {[a.sector, a.caseStudy!.country].join(' · ')}
                    </p>
                    <h3 className="text-balance font-serif text-2xl leading-snug text-navy">
                      {a.title} for {assignmentClient(a)}
                    </h3>
                    <p className="text-pretty leading-relaxed text-muted-foreground">{a.caseStudy!.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section className="bg-pale/40">
        <Container className="flex flex-col gap-12 py-20 md:py-24">
          <h2 className="font-serif text-3xl text-navy md:text-5xl">How an order runs</h2>
          <ProcessSteps detailed />
        </Container>
      </section>

      <section aria-labelledby="faq-title">
        <Container className="grid gap-10 py-20 md:py-24 lg:grid-cols-12">
          <h2 id="faq-title" className="font-serif text-3xl text-navy md:text-5xl lg:col-span-4">
            Common questions
          </h2>
          <dl className="flex flex-col lg:col-span-7 lg:col-start-6">
            {page.faqs.map((f) => (
              <div key={f.q} className="flex flex-col gap-2 border-b border-border py-6 first:border-t-2 first:border-t-navy">
                <dt className="font-serif text-xl text-navy">{f.q}</dt>
                <dd className="text-pretty leading-relaxed text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="border-t border-border">
        <Container className="flex flex-col gap-6 py-16">
          <h2 className="text-xs font-medium uppercase tracking-widest text-navy">Other solutions</h2>
          <ul className="flex flex-wrap gap-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/solutions/${o.slug}`}
                  className="inline-block rounded-sm border border-border px-4 py-3 text-navy hover:border-primary hover:text-primary"
                >
                  {o.h1}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/assetone"
                className="inline-block rounded-sm border border-border px-4 py-3 text-navy hover:border-primary hover:text-primary"
              >
                Asset tagging and tracking with AssetOne
              </Link>
            </li>
          </ul>
        </Container>
      </section>

      <ClosingCta />
    </>
  )
}
