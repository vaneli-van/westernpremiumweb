'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { solutions, type SolutionId } from '@/content/company'
import { cn } from '@/lib/utils'

type Featured = { title: string; description: string; href: string; image: string }

const featured: Record<SolutionId, Featured[]> = {
  'enterprise-it': [
    {
      title: 'Field technology for a humanitarian agency',
      description: '1,200 Samsung Galaxy Tab A9 tablets with adapters, covers and screen protectors.',
      href: '/experience',
      image: '/images/hero-equipment.png',
    },
    {
      title: 'Networking and structured cabling',
      description: 'Networking equipment, cabling and related power equipment, installed where agreed.',
      href: '/solutions#enterprise-it',
      image: '/images/network.png',
    },
  ],
  'technology-operations': [
    {
      title: 'Consumables and replacement parts',
      description: 'Toner, ink, labelling supplies and parts that keep equipment in service.',
      href: '/solutions#technology-operations',
      image: '/images/hero-equipment.png',
    },
    {
      title: 'Warranty and after-sales coordination',
      description: 'We coordinate the applicable manufacturer process with the supplier.',
      href: '/solutions#technology-operations',
      image: '/images/home-datacentre.png',
    },
  ],
  'industrial-mro': [
    {
      title: 'Warehouse and electrical equipment',
      description: 'A Jungheinrich electric forklift battery and ABB 400A changeover switches.',
      href: '/experience',
      image: '/images/industrial.png',
    },
    {
      title: 'Specialist equipment to specification',
      description: 'Sourced against the make, model, rating or standard you provide.',
      href: '/solutions#industrial-mro',
      image: '/images/logistics.png',
    },
  ],
  'asset-governance': [
    {
      title: 'Asset tracking with Asset One Africa',
      description: 'A dependable record of what you hold, where it is, and who is responsible.',
      href: '/asset-one-africa',
      image: '/images/network.png',
    },
    {
      title: 'Reporting for audit and planning',
      description: 'Asset information that supports budgeting, audit and replacement planning.',
      href: '/asset-one-africa',
      image: '/images/home-hero-port.png',
    },
  ],
}

export function WhatWeDo() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }
    if (!(e.key in keys)) return
    e.preventDefault()
    const next = (active + keys[e.key] + solutions.length) % solutions.length
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div className="flex flex-col border border-border bg-background shadow-[0_24px_48px_-24px_rgb(0_0_0/0.35)] md:flex-row">
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Our solutions"
        onKeyDown={onKeyDown}
        className="flex overflow-x-auto bg-pale/55 md:w-[16.5rem] md:shrink-0 md:flex-col md:overflow-visible md:border-r md:border-border"
      >
        {solutions.map((s, i) => {
          const isActive = i === active
          return (
            <button
              key={s.id}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`tab-${s.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${s.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                'relative flex min-w-48 shrink-0 items-center border-b border-border px-6 py-6 text-left text-[15px] leading-snug text-navy transition-colors md:-mr-px md:min-h-[6.5rem] md:min-w-0 md:px-10',
                isActive
                  ? 'bg-background font-semibold shadow-[inset_0_-4px_0_var(--primary)] md:shadow-[inset_4px_0_0_var(--primary)]'
                  : 'hover:bg-background/60',
              )}
            >
              {s.title}
            </button>
          )
        })}
      </div>

      {solutions.map((s, i) => (
        <div
          key={s.id}
          role="tabpanel"
          id={`panel-${s.id}`}
          aria-labelledby={`tab-${s.id}`}
          hidden={i !== active}
          tabIndex={0}
          className="flex-1 bg-background px-6 py-10 md:px-[3.75rem]"
        >
          <p className="text-pretty text-[15px] font-light leading-relaxed text-muted-foreground">{s.paragraphs[0]}</p>
          <div className="flex flex-col gap-2 pt-12">
            <span aria-hidden="true" className="block h-0.5 w-5 bg-primary" />
            <h3 className="text-lg text-navy">Featured</h3>
          </div>
          <ul className="flex flex-col gap-10 pt-10">
            {featured[s.id].map((f) => (
              <li key={f.title} className="flex flex-col gap-5 sm:flex-row sm:gap-7">
                <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden sm:w-[16.4rem]">
                  <Image src={f.image} alt="" fill sizes="(min-width: 640px) 262px, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-col gap-3 pt-1">
                  <h4 className="text-lg font-semibold leading-snug text-navy">{f.title}</h4>
                  <p className="text-[13px] font-light leading-relaxed text-muted-foreground">{f.description}</p>
                  <Link
                    href={f.href}
                    className="group mt-5 flex items-center gap-1 text-[13px] font-medium uppercase tracking-[0.12em] text-primary"
                  >
                    Read more
                    <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    <span className="sr-only">: {f.title}</span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
