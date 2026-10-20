import type { Metadata } from 'next'
import { Container, PageHeader, Pending } from '@/components/site/page-primitives'
import { company, privacyNotice } from '@/content/company'

const description = `How ${company.legalName} collects, uses and retains information submitted through the quotation form, and your rights under Ghana’s Data Protection Act, 2012 (Act 843).`

export const metadata: Metadata = {
  title: privacyNotice.title,
  description,
  alternates: { canonical: '/privacy' },
  openGraph: { title: `${privacyNotice.title} | Western Premium`, description, url: '/privacy' },
}

const address = `${company.address.street}, ${company.address.locality}, ${company.address.city}, ${company.address.country}`

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={privacyNotice.title}
        intro={`This notice explains how ${company.legalName} handles the information you submit through the quotation form on this website.`}
      >
        <p className="text-sm text-muted-foreground">
          Last updated: <time>{privacyNotice.lastUpdated}</time>
        </p>
      </PageHeader>

      <section>
        <Container className="py-16 md:py-20">
          <div className="flex max-w-3xl flex-col gap-12">
            <NoticeSection title="Who is responsible for your data">
              <p>
                The data controller is {company.legalName}, {address}.
              </p>
              <p>
                Data Protection Commission registration number:{' '}
                <Pending value={privacyNotice.dpcRegistration} token="DPC_REGISTRATION" />
              </p>
            </NoticeSection>

            <NoticeSection title="Information we collect">
              <p>When you submit a quotation request, we collect:</p>
              <BulletList items={privacyNotice.collected} />
            </NoticeSection>

            <NoticeSection title="Why we use it">
              <p>We use this information to respond to your enquiry and to prepare a quotation for your requirement.</p>
            </NoticeSection>

            <NoticeSection title="Legal basis">
              <p>
                We process this information on the basis of your consent, given when you submit the form, and our
                legitimate business interest in responding to the enquiries we receive.
              </p>
            </NoticeSection>

            <NoticeSection title="How long we keep it">
              <p>
                Enquiry records are retained for <Pending value={privacyNotice.retentionPeriod} token="RETENTION_PERIOD" />.
              </p>
            </NoticeSection>

            <NoticeSection title="Service providers">
              <p>We use third-party providers to operate the quotation form:</p>
              <BulletList items={privacyNotice.processors} />
              <p>These providers process your information on our behalf and only for the purpose of operating the form.</p>
            </NoticeSection>

            <NoticeSection title="Your rights">
              <p>Under Ghana’s Data Protection Act, 2012 (Act 843), you have the right to:</p>
              <BulletList items={privacyNotice.rights} />
            </NoticeSection>

            <NoticeSection title="Contact for data requests">
              <p>
                To make a request about your personal data, email{' '}
                <a href={`mailto:${company.email}`} className="break-all text-primary underline underline-offset-2">
                  {company.email}
                </a>
                .
              </p>
            </NoticeSection>
          </div>
        </Container>
      </section>
    </>
  )
}

function NoticeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 border-t border-border pt-8">
      <h2 className="font-serif text-2xl text-navy">{title}</h2>
      <div className="flex flex-col gap-3 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-primary" />
          {item}
        </li>
      ))}
    </ul>
  )
}
