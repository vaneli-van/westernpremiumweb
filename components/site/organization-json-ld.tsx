import { company } from '@/content/company'

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.legalName,
    alternateName: company.brandName,
    url: company.siteUrl,
    foundingDate: company.founded,
    description: company.description,
    email: company.email,
    telephone: company.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: `${company.address.locality}, ${company.address.city}`,
      addressCountry: company.address.countryCode,
    },
    ...(company.logoSrc ? { logo: new URL(company.logoSrc, company.siteUrl).toString() } : {}),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
