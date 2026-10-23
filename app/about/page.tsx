import type { Metadata } from 'next'
import Image from 'next/image'
import { ClosingCta, Container, Eyebrow, PageHeader, Pending } from '@/components/site/page-primitives'
import { ProfileDownload } from '@/components/site/profile-download'
import { aboutPage, company, type Leader, leadership, principles, showPortraitPlaceholders } from '@/content/company'

export const metadata: Metadata = {
  title: { absolute: aboutPage.seoTitle },
  description: aboutPage.metaDescription,
  alternates: { canonical: '/about' },
  openGraph: { title: aboutPage.seoTitle, description: aboutPage.metaDescription, url: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow={aboutPage.title} title={aboutPage.statement} />

      <section aria-labelledby="story-title">
        <Container className="grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <Eyebrow>Our story</Eyebrow>
            <h2 id="story-title" className="sr-only">
              Our story
            </h2>
            {aboutPage.story.map((p) => (
              <p key={p} className="text-pretty text-lg leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-pale">
              <Image
                src="/images/logistics.png"
                alt="Wrapped pallets and labelled cartons in a warehouse aisle"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="principles-title" className="bg-pale/40">
        <Container className="flex flex-col gap-12 py-20 md:py-28">
          <div className="flex max-w-2xl flex-col gap-5">
            <Eyebrow>{aboutPage.principlesEyebrow}</Eyebrow>
            <h2 id="principles-title" className="text-balance font-serif text-3xl leading-tight text-navy md:text-5xl">
              {aboutPage.principlesTitle}
            </h2>
          </div>
          <ul className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-5">
            {principles.map((p) => (
              <li key={p.title} className="flex flex-col gap-3 bg-background p-6">
                <h3 className="text-lg font-semibold text-navy">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="leadership-title">
        <Container className="grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-4">
            <Eyebrow>{aboutPage.leadershipEyebrow}</Eyebrow>
            <h2 id="leadership-title" className="text-balance font-serif text-3xl leading-tight text-navy md:text-4xl">
              {aboutPage.leadershipTitle}
            </h2>
          </div>
          <ul className="grid gap-px bg-border sm:grid-cols-2 lg:col-span-8">
            {leadership.map((person) => (
              <LeaderCard key={person.name} person={person} />
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="details-title" className="border-t border-border">
        <Container className="grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-4">
            <Eyebrow>{aboutPage.detailsEyebrow}</Eyebrow>
            <h2 id="details-title" className="text-balance font-serif text-3xl leading-tight text-navy md:text-4xl">
              {aboutPage.detailsTitle}
            </h2>
            <ProfileDownload className="pt-2" />
          </div>
          <dl className="flex flex-col lg:col-span-8">
            <DetailRow label="Legal name">{company.legalName}</DetailRow>
            <DetailRow label="Registration number">
              <Pending value={company.registrationNumber} token="REG_NUMBER" />
            </DetailRow>
            <DetailRow label="Registered address">
              <address className="not-italic">
                {company.address.street}, {company.address.locality}, {company.address.city}, {company.address.country}
              </address>
            </DetailRow>
            <DetailRow label="Telephone">
              <a href={company.phoneHref} className="hover:text-primary hover:underline">
                {company.phone}
              </a>
            </DetailRow>
            <DetailRow label="Enquiries">
              <a href={`mailto:${company.email}`} className="break-all hover:text-primary hover:underline">
                {company.email}
              </a>
            </DetailRow>
            <DetailRow label="Business hours">
              <Pending value={company.businessHours} token="BUSINESS_HOURS" />
            </DetailRow>
          </dl>
        </Container>
      </section>

      <ClosingCta />
    </>
  )
}

function LeaderCard({ person }: { person: Leader }) {
  const showSlot = !person.portrait && showPortraitPlaceholders
  return (
    <li className="flex flex-col gap-4 bg-background py-6 sm:p-6">
      {person.portrait ? (
        <div className="relative aspect-square w-24 overflow-hidden rounded-sm bg-pale">
          <Image src={person.portrait} alt={`Portrait of ${person.name}`} fill sizes="96px" className="object-cover" />
        </div>
      ) : (
        showSlot && (
          <div className="flex aspect-square w-24 items-center justify-center rounded-sm border border-dashed border-primary/60 bg-pale/50 p-2 text-center text-xs text-primary">
            Portrait placeholder
          </div>
        )
      )}
      <div className="flex flex-col gap-1">
        <p className="font-serif text-2xl text-navy">{person.name}</p>
        <p className="text-sm text-muted-foreground">{person.role}</p>
      </div>
      {person.bio && <p className="text-sm leading-relaxed text-muted-foreground">{person.bio}</p>}
    </li>
  )
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-border py-4 first:border-t sm:grid-cols-3 sm:gap-6">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-navy sm:col-span-2">{children}</dd>
    </div>
  )
}
