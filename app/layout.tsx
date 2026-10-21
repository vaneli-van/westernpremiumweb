import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans, PT_Serif_Caption } from 'next/font/google'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { OrganizationJsonLd } from '@/components/site/organization-json-ld'
import { BreadcrumbJsonLd } from '@/components/site/breadcrumb-json-ld'
import { company } from '@/content/company'
import './globals.css'

const plex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex',
  display: 'swap',
})

const ptSerif = PT_Serif_Caption({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-pt-serif',
  display: 'swap',
})

const defaultDescription =
  'Western Premium supplies enterprise IT, industrial equipment and operational essentials to institutional and commercial organisations, with procurement and delivery coordinated from Accra, Ghana.'

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: 'Western Premium | Enterprise IT, industrial supply and infrastructure',
    template: '%s | Western Premium',
  },
  description: defaultDescription,
  applicationName: company.brandName,
  openGraph: {
    type: 'website',
    siteName: company.brandName,
    locale: 'en_GB',
    title: 'Western Premium | Reliable equipment. Lasting value.',
    description: defaultDescription,
    images: [{ url: '/images/hero-equipment.png', width: 1200, height: 630, alt: 'Business laptops, tablets and consumables' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Western Premium | Reliable equipment. Lasting value.',
    description: defaultDescription,
    images: ['/images/hero-equipment.png'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#020553',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB" className={`${plex.variable} ${ptSerif.variable} bg-background`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <OrganizationJsonLd />
        <BreadcrumbJsonLd />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
