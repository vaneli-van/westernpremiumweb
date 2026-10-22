import { company } from '@/content/company'

/**
 * Organization and LocalBusiness data for search engines, built only from verified
 * facts in content/company.ts. Values that are still null are left out, never guessed.
 */
export function OrganizationJsonLd() {
  const site = company.siteUrl
  const orgId = `${site}/#organization`
  const logo = new URL(company.logoSrc, site).toString()
  const address = {
    '@type': 'PostalAddress',
    streetAddress: `${company.address.street}, ${company.address.locality}`,
    addressLocality: company.address.city,
    addressRegion: 'Greater Accra',
    addressCountry: company.address.countryCode,
  }

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: company.legalName,
        alternateName: company.brandName,
        url: site,
        logo,
        foundingDate: company.founded,
        description: company.description,
        email: company.email,
        telephone: company.phone,
        address,
        ...(company.registrationNumber ? { identifier: company.registrationNumber } : {}),
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${site}/#office`,
        name: company.brandName,
        parentOrganization: { '@id': orgId },
        url: site,
        image: logo,
        email: company.email,
        telephone: company.phone,
        address,
        areaServed: company.areaServed.map((name) => ({ '@type': 'Place', name })),
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: company.openingHours.days,
          opens: company.openingHours.opens,
          closes: company.openingHours.closes,
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
