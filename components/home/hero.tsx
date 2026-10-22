'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const slides = [
  {
    image: '/images/hero-office.jpg',
    eyebrow: 'We are Western Premium',
    headline: ['Reliable equipment.', 'Lasting value.'],
    subline: 'We source and deliver the equipment that keeps institutions and businesses across Ghana running.',
  },
  {
    image: '/images/home-hero-port.png',
    eyebrow: 'Sourcing and delivery',
    headline: ['Sourced to specification.', 'Delivered to site.'],
    subline: 'One accountable process across sourcing markets in Ghana, the UK, the UAE and the US.',
  },
  {
    image: '/images/industrial.png',
    eyebrow: 'Industrial and MRO supply',
    headline: ['Industrial supply for', 'demanding operations.'],
    subline: 'Spares, electrical equipment and MRO essentials for mining, energy and industrial sites.',
  },
]

const SLIDE_MS = 7000

export function Hero() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = (index: number) => setActive((index + slides.length) % slides.length)

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Western Premium highlights"
      className="on-navy relative isolate overflow-hidden bg-navy text-navy-foreground"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <Image
          key={slide.image}
          src={slide.image}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={cn(
            '-z-20 object-cover transition-opacity duration-1000 motion-reduce:transition-none',
            i === active ? 'opacity-100' : 'opacity-0',
          )}
        />
      ))}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy/70 md:hidden" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-navy/90 via-navy/60 to-navy/10 md:block"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy/70 to-transparent" />

      <div className="mx-auto flex min-h-[34rem] max-w-6xl flex-col px-5 pt-16 pb-6 md:h-[38rem] md:min-h-0 md:px-8 md:pt-24">
        <div className="grid flex-1">
          {slides.map((slide, i) => {
            const isActive = i === active
            const Heading = i === 0 ? 'h1' : 'h2'
            return (
              <div
                key={slide.image}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}`}
                aria-hidden={!isActive}
                inert={!isActive}
                className={cn(
                  'col-start-1 row-start-1 flex max-w-2xl flex-col items-start gap-6 text-left transition-opacity duration-700 motion-reduce:transition-none',
                  isActive ? 'opacity-100' : 'pointer-events-none opacity-0',
                )}
              >
                <p className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.18em] text-navy-foreground/85">
                  <span aria-hidden="true" className="block h-0.5 w-8 bg-primary" />
                  {slide.eyebrow}
                </p>
                <Heading className="text-balance font-sans text-4xl font-semibold leading-[1.05] tracking-[-0.025em] md:text-[3.75rem]">
                  {slide.headline.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </Heading>
                <p className="max-w-xl text-pretty text-base font-light leading-relaxed text-navy-foreground/90 md:text-lg">
                  {slide.subline}
                </p>
                <Link href="#services" className="group mt-2 flex items-center gap-4" tabIndex={isActive ? undefined : -1}>
                  <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-y-0.5">
                    <ArrowDown className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-[13px] font-semibold uppercase tracking-[0.15em]">Explore what we do</span>
                </Link>
              </div>
            )
          })}
        </div>

        <div className="flex items-center gap-6 pt-8">
          <div className="grid flex-1 grid-cols-3 gap-2.5">
            {slides.map((slide, i) => (
              <button
                key={slide.image}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show slide ${i + 1}: ${slide.headline.join(' ')}`}
                aria-current={i === active}
                className="py-3"
              >
                <span className="block h-1 overflow-hidden bg-navy-foreground/35">
                  <span
                    key={i === active ? `active-${active}` : 'idle'}
                    className={cn(
                      'block h-full origin-left bg-navy-foreground',
                      i !== active && 'scale-x-0',
                      i === active && 'animate-[hero-progress_linear_forwards] motion-reduce:animate-none',
                    )}
                    style={
                      i === active
                        ? { animationDuration: `${SLIDE_MS}ms`, animationPlayState: paused ? 'paused' : 'running' }
                        : undefined
                    }
                    onAnimationEnd={i === active ? () => go(active + 1) : undefined}
                  />
                </span>
              </button>
            ))}
          </div>
          <div className="hidden gap-2.5 md:flex">
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous slide"
              className="flex size-11 items-center justify-center rounded-full border border-navy-foreground/40 text-navy-foreground transition-colors hover:bg-navy-foreground hover:text-navy"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next slide"
              className="flex size-11 items-center justify-center rounded-full border border-navy-foreground/40 text-navy-foreground transition-colors hover:bg-navy-foreground hover:text-navy"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
