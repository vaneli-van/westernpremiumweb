import Image from 'next/image'
import { ActionLink } from '@/components/site/action-link'
import { Container } from '@/components/site/page-primitives'
import { Pillars } from '@/components/site/pillars'
import { company } from '@/content/company'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <Container className="grid gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
        <div className="flex flex-col justify-center gap-8 lg:col-span-6">
          <h1 className="text-balance font-serif text-5xl leading-[1.05] text-navy md:text-7xl">
            Reliable equipment.{' '}
            <span className="italic text-primary">Lasting value.</span>
          </h1>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Western Premium supplies enterprise IT, industrial equipment and operational essentials, with procurement
            and delivery coordinated around your requirements.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ActionLink href="/contact" arrow className="w-full sm:w-auto">
              Request a Quote
            </ActionLink>
            <ActionLink href="/solutions" variant="outline" className="w-full sm:w-auto">
              Explore Our Solutions
            </ActionLink>
          </div>
          {company.quoteResponseTime && (
            <p className="-mt-4 text-sm text-muted-foreground">Quotations typically returned {company.quoteResponseTime}.</p>
          )}
          <p className="border-t border-border pt-5 text-sm text-muted-foreground">
            {company.heroSupportingLine}
          </p>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-pale lg:aspect-[5/6]">
            <Image
              src="/images/hero-equipment.png"
              alt="New business laptops, tablets and boxed printer consumables ready for delivery"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-px left-0 hidden h-36 w-40 bg-background p-4 pb-0 pl-0 lg:block">
            <Pillars />
          </div>
          <p className="mt-3 text-xs text-muted-foreground lg:text-right">Illustrative photography.</p>
        </div>
      </Container>
    </section>
  )
}
