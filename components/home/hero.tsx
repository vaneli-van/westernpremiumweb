'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Container } from '@/components/site/page-primitives'
import { cn } from '@/lib/utils'

const slides = [
  {
    image: '/images/home-hero-port.png',
    headline: ['We are Western Premium.', 'Reliable equipment. Lasting value.'],
    subline: 'Sourcing and delivering the equipment that keeps institutions and businesses across Ghana running.',
  },
  {
    image: '/images/home-datacentre.png',
    headline: ['Enterprise IT,', 'sourced to specification.'],
    subline: 'End-user hardware, printers, networking, structured cabling and related power equipment.',
  },
  {
    image: '/images/industrial.png',
    headline: ['Industrial supply', 'for demanding operations.'],
    subline: 'Spares, electrical equipment and MRO essentials for mining, energy and industrial sites.',
  },
  {
    image: '/images/logistics.png',
    headline: ['Coordinated delivery,', 'from requirement to site.'],
    subline: 'One accountable process across sourcing markets in Ghana, the UK, the UAE and the US.',
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
      className="on-navy relative isolate flex h-[min(48rem,calc(100svh-4.5rem))] min-h-[34rem] flex-col overflow-hidden bg-navy text-navy-foreground"
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
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy/60" />

      <div className="relative flex flex-1 items-center">
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
                'absolute inset-x-0 transition-all duration-700 motion-reduce:transition-none',
                isActive ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
              )}
            >
              <Container className="flex flex-col items-center gap-6 text-center">
                <Heading className="max-w-5xl text-balance font-sans text-4xl font-semibold leading-tight tracking-tight md:text-6xl lg:text-7xl">
                  {slide.headline.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </Heading>
                <p className="max-w-2xl text-pretty text-lg leading-relaxed text-navy-foreground/90 md:text-xl">
                  {slide.subline}
                </p>
              </Container>
            </div>
          )
        })}
      </div>

      <Container className="flex flex-col gap-8 pb-10 md:pb-12">
        <div className="relative flex items-center justify-center">
          <Link href="#services" className="group flex items-center gap-5">
            <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-y-0.5 md:size-16">
              <ArrowDown className="size-5" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold uppercase tracking-widest">Explore</span>
          </Link>
          <div className="absolute right-0 hidden gap-3 md:flex">
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous slide"
              className="flex size-14 items-center justify-center rounded-full bg-navy-foreground text-navy transition-colors hover:bg-pale"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next slide"
              className="flex size-14 items-center justify-center rounded-full bg-navy-foreground text-navy transition-colors hover:bg-pale"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 md:gap-5">
          {slides.map((slide, i) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show slide ${i + 1}: ${slide.headline.join(' ')}`}
              aria-current={i === active}
              className="group py-3"
            >
              <span className="block h-1 overflow-hidden rounded-full bg-navy-foreground/35 transition-colors group-hover:bg-navy-foreground/55">
                <span
                  key={i === active ? `active-${active}` : 'idle'}
                  className={cn(
                    'block h-full origin-left rounded-full bg-navy-foreground',
                    i < active && 'scale-x-100',
                    i > active && 'scale-x-0',
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
      </Container>
    </section>
  )
}
