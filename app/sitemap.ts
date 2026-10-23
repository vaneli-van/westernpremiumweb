import type { MetadataRoute } from 'next'
import { assignments, company, navigation } from '@/content/company'
import { solutionPages } from '@/content/solution-pages'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.siteUrl
  const now = new Date()
  const routes = [
    ...navigation.map((n) => n.href),
    ...solutionPages.map((p) => `/solutions/${p.slug}`),
    ...assignments.filter((a) => a.caseStudy).map((a) => `/case-studies/${a.caseStudy!.slug}`),
    '/contact',
    '/privacy',
  ]
  return routes.map((path) => ({
    url: `${base}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path === '/contact' || path.startsWith('/solutions') ? 0.9 : 0.7,
  }))
}
