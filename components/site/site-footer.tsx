import Link from 'next/link'
import { assetOneAfrica, company, navigation } from '@/content/company'
import { Logo } from './logo'
import { ProfileDownload } from './profile-download'

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="on-navy bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="flex flex-col gap-5 md:col-span-5">
          <Logo tone="light" />
          <p className="max-w-sm text-sm leading-relaxed text-pale/85">
            An indigenous Ghanaian enterprise supply and infrastructure company, established in {company.founded}.
            Enterprise IT, industrial supplies and practical support to keep your operations moving.
          </p>
          <ProfileDownload tone="light" />
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-pale/70">Company</h2>
          <ul className="flex flex-col gap-2.5 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-navy-foreground/90 hover:text-pale hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="text-navy-foreground/90 hover:text-pale hover:underline">
                Request a Quote
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-pale/70">Contact</h2>
          <address className="flex flex-col gap-2.5 text-sm not-italic leading-relaxed">
            <a href={company.phoneHref} className="hover:text-pale hover:underline">
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="break-all hover:text-pale hover:underline">
              {company.email}
            </a>
            <span className="text-pale/85">
              {company.address.street}, {company.address.locality}
              <br />
              {company.address.city}, {company.address.country}
            </span>
          </address>
          <p className="mt-6 text-sm leading-relaxed text-pale/85">
            Asset tracking and reporting through our {assetOneAfrica.relationship},{' '}
            <Link href="/asset-one-africa" className="text-navy-foreground underline underline-offset-4 hover:text-pale">
              {assetOneAfrica.name}
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="border-t border-pale/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-pale/75 md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            &copy; {year} {company.legalName}. All rights reserved.
          </p>
          <Link href="/privacy" className="hover:text-navy-foreground hover:underline">
            Privacy notice
          </Link>
        </div>
      </div>
    </footer>
  )
}
