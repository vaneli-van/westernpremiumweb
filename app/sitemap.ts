import type { MetadataRoute } from 'next'
import { company, navigation } from '@/content/company'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.siteUrl
  const now = new Date()
  const routes = [...navigation.map((n) => n.href), '/contact', '/privacy']
  return routes.map((path) => ({
    url: `${base}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path === '/contact' || path === '/solutions' ? 0.9 : 0.7,
  }))
}
