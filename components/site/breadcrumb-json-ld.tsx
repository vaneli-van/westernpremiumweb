'use client'

import { usePathname } from 'next/navigation'
import { company, navigation } from '@/content/company'

/** Page names for routes outside the main navigation. */
const extraRoutes: Record<string, string> = {
  '/contact': 'Request a Quote',
  '/privacy': 'Privacy Notice',
}

/** BreadcrumbList data (Home, then the current page) for every page except the homepage. */
export function BreadcrumbJsonLd() {
  const pathname = usePathname()
  if (!pathname || pathname === '/') return null

  const name = navigation.find((n) => n.href === pathname)?.label ?? extraRoutes[pathname]
  if (!name) return null

  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: company.siteUrl },
      { '@type': 'ListItem', position: 2, name, item: `${company.siteUrl}${pathname}` },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
