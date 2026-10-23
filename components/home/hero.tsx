'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const slides: { image: string; position?: string; headline: string[]; subline: string }[] = [
  {
    image: '/images/hero-warehouse.jpg',
    position: '50% 55%',
    headline: ['We are Western Premium.', 'Reliable equipment. Lasting value.'],
    subline: 'We source and deliver the equipment that keeps institutions and businesses across Ghana running.',
  },
  {
    image: '/images/hero-port.jpg',
    position: '50% 45%',
    headline: ['Sourced to specification.', 'Delivered to site.'],
    subline: 'One accountable process across sourcing markets in Ghana, the UK, the UAE and the US.',
  },
  {
    image: '/images/industrial.png',
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
          style={slide.position ? { objectPosition: slide.position } : undefined}
          className={cn(
            '-z-20 object-cover transition-opacity duration-1000 motion-reduce:transition-none',
            i === active ? 'opacity-100' : 'opacity-0',
          )}
        />
      ))}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy/55" />

      <div className="mx-auto flex min-h-[30rem] max-w-6xl flex-col px-5 pt-14 pb-6 md:h-[27rem] md:min-h-0 md:px-8 md:pt-16">
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
                  'col-start-1 row-start-1 flex flex-col items-center gap-5 text-center transition-opacity duration-700 motion-reduce:transition-none',
                  isActive ? 'opacity-100' : 'pointer-events-none opacity-0',
                )}
              >
                <Heading className="text-balance font-sans text-3xl font-semibold leading-tight tracking-[-0.025em] md:text-[3.25rem] md:leading-[1.1]">
                  {slide.headline.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </Heading>
                <p className="max-w-2xl text-pretty text-base leading-relaxed md:text-[17px]">{slide.subline}</p>
              </div>
            )
          })}
        </div>

        <div className="relative flex items-center justify-center pt-6">
          <Link href="#services" className="group flex items-center gap-5">
            <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-y-0.5">
              <ArrowDown className="size-4" aria-hidden="true" />
            </span>
            <span className="text-[13px] font-semibold uppercase tracking-[0.15em]">Explore</span>
          </Link>
          <div className="absolute right-0 hidden gap-2.5 md:flex">
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous slide"
              className="flex size-12 items-center justify-center rounded-full border border-navy/10 bg-navy-foreground text-primary transition-colors hover:bg-pale"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next slide"
              className="flex size-12 items-center justify-center rounded-full border border-navy/10 bg-navy-foreground text-primary transition-colors hover:bg-pale"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5 pt-4">
          {slides.map((slide, i) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show slide ${i + 1}: ${slide.headline.join(' ')}`}
              aria-current={i === active}
              className="py-3"
            >
              <span className="block h-1 overflow-hidden bg-navy-foreground/45">
                <span
                  key={i === active ? `active-${active}` : 'idle'}
                  className={cn(
                    'block h-full origin-left bg-primary',
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
      </div>
    </section>
  )
}
