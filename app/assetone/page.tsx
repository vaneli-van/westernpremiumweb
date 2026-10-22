import type { Metadata } from 'next'
import { ExternalLink } from 'lucide-react'
import { CompanyComparison } from '@/components/sections/company-comparison'
import { ActionLink, actionClasses } from '@/components/site/action-link'
import { Container, PageHeader } from '@/components/site/page-primitives'
import { assetOneAfrica, assetOneAfricaPage } from '@/content/company'

export const metadata: Metadata = {
  title: assetOneAfricaPage.title,
  description: assetOneAfricaPage.metaDescription,
  alternates: { canonical: '/assetone' },
  openGraph: {
    title: `${assetOneAfricaPage.title} | Western Premium`,
    description: assetOneAfricaPage.metaDescription,
    url: '/assetone',
  },
}

export default function AssetOneAfricaPage() {
  return (
    <>
      <PageHeader eyebrow={assetOneAfricaPage.eyebrow} title={assetOneAfricaPage.heading} intro={assetOneAfricaPage.intro} />

      <section>
        <Container className="py-20 md:py-28">
          <CompanyComparison headingLevel="h2" />
        </Container>
      </section>

      <section className="on-navy bg-navy text-navy-foreground">
        <Container className="flex flex-col gap-6 py-20 md:py-24">
          <p className="max-w-3xl text-balance font-serif text-2xl leading-snug md:text-4xl">
            {assetOneAfricaPage.supportingMessage}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <ActionLink href="/contact?solution=asset-governance" variant="light" arrow>
              {assetOneAfricaPage.actionLabel}
            </ActionLink>
            {assetOneAfrica.url && (
              <a href={assetOneAfrica.url} target="_blank" rel="noopener noreferrer" className={actionClasses('outline-light')}>
                {assetOneAfricaPage.externalLabel}
                <ExternalLink className="size-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </Container>
      </section>
    </>
  )
}
