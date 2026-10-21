import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ActionLink } from '@/components/site/action-link'
import { Container } from '@/components/site/page-primitives'
import { company, solutions } from '@/content/company'

export function Hero() {
  return (
    <section className="on-navy relative isolate flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden bg-navy text-navy-foreground">
      <Image
        src="/images/home-hero-port.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/60 to-navy/20" />

      <Container className="flex flex-1 flex-col justify-end gap-8 pb-14 pt-32 md:pb-20">
        <p className="text-xs font-medium uppercase tracking-widest text-pale">
          {company.city}, {company.country} &middot; Since {company.founded}
        </p>
        <h1 className="max-w-5xl text-balance font-sans text-5xl font-medium leading-none tracking-tight md:text-7xl lg:text-8xl">
          Reliable equipment. Lasting value.
        </h1>
        <p className="max-w-2xl text-pretty text-lg leading-relaxed text-pale md:text-xl">
          Enterprise IT, industrial equipment and operational essentials, sourced and delivered for institutions and
          businesses across Ghana.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ActionLink href="/contact" arrow className="w-full sm:w-auto">
            Request a Quote
          </ActionLink>
          <ActionLink href="/solutions" variant="outline-light" className="w-full sm:w-auto">
            Explore Our Solutions
          </ActionLink>
        </div>
      </Container>

      <nav aria-label="Solutions" className="border-t border-navy-foreground/20 bg-navy/70 backdrop-blur">
        <Container>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((s) => (
              <li key={s.id} className="border-b border-navy-foreground/15 sm:odd:border-r lg:border-b-0 lg:border-r lg:last:border-r-0">
                <Link
                  href={`/solutions#${s.id}`}
                  className="group flex items-center justify-between gap-4 py-5 pr-4 text-sm font-medium transition-colors hover:text-pale sm:px-5 lg:first:pl-0"
                >
                  {s.title}
                  <ArrowRight
                    className="size-4 shrink-0 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </section>
  )
}
