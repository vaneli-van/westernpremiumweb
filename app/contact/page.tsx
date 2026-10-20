import type { Metadata } from 'next'
import { Clock, ExternalLink, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { QuoteForm } from '@/components/contact/quote-form'
import { Container, Eyebrow, Pending } from '@/components/site/page-primitives'
import { actionClasses } from '@/components/site/action-link'
import { company, contactPage as copy, solutionOptions } from '@/content/company'
import { getFormConfig } from '@/lib/quote-server'

export const metadata: Metadata = {
  title: copy.title,
  description: copy.metaDescription,
  alternates: { canonical: '/contact' },
}

const fullAddress = `${company.address.street}, ${company.address.locality}, ${company.address.city}, ${company.address.country}`
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`
const whatsappLink = `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(company.whatsappMessage)}`

function ContactRow({ icon: Icon, label, children }: { icon: typeof Phone; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 border-b border-border py-5">
      <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
        {children}
      </div>
    </div>
  )
}

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ solution?: string }> }) {
  const { solution } = await searchParams
  const defaultSolution = solutionOptions.some((o) => o.value === solution) ? solution : undefined
  const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY

  return (
    <section>
      <Container className="grid gap-14 py-16 md:py-24 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-12">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1 className="text-balance font-serif text-4xl leading-tight text-navy md:text-6xl">{copy.title}</h1>
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">{copy.intro}</p>
        </div>

        <div className="flex flex-col gap-10 lg:col-span-5">
          <section aria-labelledby="reach-heading" className="flex flex-col gap-2">
            <h2 id="reach-heading" className="font-serif text-2xl text-navy">
              {copy.reachHeading}
            </h2>
            <address className="flex flex-col border-t border-navy not-italic">
              <ContactRow icon={Phone} label={copy.labels.phone}>
                <a href={company.phoneHref} className="text-navy hover:text-primary hover:underline">
                  {company.phone}
                </a>
              </ContactRow>
              <ContactRow icon={MessageCircle} label={copy.labels.whatsapp}>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={actionClasses('outline', 'mt-2 self-start px-4 py-2.5')}
                >
                  {copy.labels.whatsappAction}
                  <span className="sr-only"> {copy.newTab}</span>
                </a>
              </ContactRow>
              <ContactRow icon={Mail} label={copy.labels.email}>
                <a
                  href={`mailto:${company.enquiriesEmail}`}
                  className="break-all text-navy hover:text-primary hover:underline"
                >
                  {company.enquiriesEmail}
                </a>
              </ContactRow>
              <ContactRow icon={MapPin} label={copy.labels.address}>
                <span className="leading-relaxed text-navy">
                  {company.address.street}
                  <br />
                  {company.address.locality}, {company.address.city}
                  <br />
                  {company.address.country}
                </span>
              </ContactRow>
              <ContactRow icon={Clock} label={copy.labels.hours}>
                <span className="text-navy">
                  <Pending value={company.businessHours} token="BUSINESS_HOURS" />
                </span>
              </ContactRow>
            </address>
          </section>

          <div className="flex flex-col gap-3">
            {mapsKey && (
              <iframe
                title={copy.mapTitle}
                src={`https://www.google.com/maps/embed/v1/place?key=${mapsKey}&q=${encodeURIComponent(fullAddress)}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[4/3] w-full border border-border"
              />
            )}
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              {copy.mapLink}
              <ExternalLink className="size-4" aria-hidden="true" />
              <span className="sr-only"> {copy.newTab}</span>
            </a>
          </div>

          <section aria-labelledby="include-heading" className="flex flex-col gap-4 border-t border-border pt-8">
            <h2 id="include-heading" className="font-serif text-2xl text-navy">
              {copy.includeHeading}
            </h2>
            <ul className="flex flex-col gap-2">
              {copy.includeItems.map((item) => (
                <li key={item} className="flex items-start gap-3 leading-relaxed text-muted-foreground">
                  <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="relative lg:col-span-7">
          <QuoteForm
            defaultSolution={defaultSolution}
            config={getFormConfig()}
            turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
          />
        </div>
      </Container>
    </section>
  )
}
