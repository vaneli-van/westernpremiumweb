import type { MetadataRoute } from 'next'
import { assignments, company, navigation } from '@/content/company'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.siteUrl
  const now = new Date()
  const routes = [
    ...navigation.map((n) => n.href),
    ...assignments.filter((a) => a.caseStudy).map((a) => `/case-studies/${a.caseStudy!.slug}`),
    '/contact',
    '/privacy',
  ]
  return routes.map((path) => ({
    url: `${base}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path === '/contact' || path === '/solutions' ? 0.9 : 0.7,
  }))
}
