import Link from 'next/link'
import { ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react'
import { company, whatsappHref } from '@/content/company'
import { Logo } from './logo'

const moreLinks = [
  { label: 'About us', href: '/about' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Sectors', href: '/sectors' },
  { label: 'Experience', href: '/experience' },
]

const helpfulLinks = [
  { label: 'Request a Quote', href: '/contact' },
  { label: 'Asset One Africa', href: '/asset-one-africa' },
  { label: 'Contact Us', href: '/contact' },
]

export function SiteFooter() {
  const year = new Date().getFullYear()
  const contactIcons = [
    { label: `Call ${company.phone}`, href: company.phoneHref, icon: Phone, external: false },
    { label: `Email ${company.email}`, href: `mailto:${company.email}`, icon: Mail, external: false },
    { label: 'Message us on WhatsApp', href: whatsappHref, icon: MessageCircle, external: true },
  ]
  return (
    <footer className="on-navy bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-12 pt-20 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
        <Link href="/" aria-label="Western Premium, home" className="self-start">
          <Logo tone="light" className="h-9" />
        </Link>

        <nav aria-labelledby="footer-more" className="flex flex-col gap-5">
          <h2 id="footer-more" className="text-[15px]">
            More Western Premium
          </h2>
          <ul className="flex flex-col gap-2 text-[15px] text-pale/75">
            {moreLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-navy-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-helpful" className="flex flex-col gap-5">
          <h2 id="footer-helpful" className="text-[15px]">
            Helpful Links
          </h2>
          <ul className="flex flex-col gap-2 text-[15px] text-pale/75">
            {helpfulLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-navy-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-5">
          <h2 className="text-[15px]">Contact</h2>
          <ul className="flex gap-3">
            {contactIcons.map(({ label, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex size-8 items-center justify-center rounded-full border border-pale/60 transition-colors hover:bg-navy-foreground hover:text-navy"
                >
                  <Icon className="size-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <address className="text-[15px] not-italic leading-relaxed text-pale/75">
            {company.address.street}, {company.address.locality}
            <br />
            {company.address.city}, {company.address.country}
          </address>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-4 border-t border-pale/25 py-10 text-[15px] text-pale/75 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {company.legalName}
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            <li>
              <Link href="/privacy" className="hover:text-navy-foreground">
                Privacy Notice
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-navy-foreground">
                Contact
              </Link>
            </li>
            <li>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-navy-foreground"
              >
                WhatsApp
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
