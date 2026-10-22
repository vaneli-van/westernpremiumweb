'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
import { company, sectors, solutions, whatsappHref } from '@/content/company'
import { cn } from '@/lib/utils'
import { Logo } from './logo'

type MenuCard = { title: string; description: string; href: string }

const menus: { label: string; href: string; cards: MenuCard[] }[] = [
  {
    label: 'Solutions',
    href: '/solutions',
    cards: solutions.map((s) => ({ title: s.title, description: s.summary, href: `/solutions#${s.id}` })),
  },
  {
    label: 'Sectors',
    href: '/sectors',
    cards: sectors.map((s) => ({ title: s.title, description: s.description, href: `/sectors#${s.id}` })),
  },
  {
    label: 'Company',
    href: '/about',
    cards: [
      { title: 'About us', description: 'An indigenous Ghanaian company, founded in Accra in 2015.', href: '/about' },
      { title: 'Experience', description: 'Requirements we have delivered for institutional buyers.', href: '/experience' },
      {
        title: 'AssetOne',
        description: 'Asset tracking and reporting through our partner company.',
        href: '/assetone',
      },
    ],
  },
]

const utilityLinks = [
  { label: 'Contact Us', href: '/contact', external: false },
  { label: 'Request a Quote', href: '/contact', external: false },
  { label: 'WhatsApp', href: whatsappHref, external: true },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpenMenu(null)
      if (mobileOpen) {
        setMobileOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenMenu(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-background" onMouseLeave={() => setOpenMenu(null)}>
      <div className="on-navy hidden bg-navy text-navy-foreground md:block">
        <div className="mx-auto flex h-10 max-w-6xl items-center justify-end gap-8 px-5 text-[13px] md:px-8">
          {utilityLinks.map((l) =>
            l.external ? (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-pale"
              >
                {l.label}
                <ArrowUpRight className="size-3" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : (
              <Link key={l.label} href={l.href} className="hover:text-pale">
                {l.label}
              </Link>
            ),
          )}
          <a href={company.phoneHref} className="text-[15px] hover:text-pale">
            {company.phone}
          </a>
        </div>
      </div>

      <div className="relative border-b border-border">
        <div className="mx-auto flex h-[4.375rem] max-w-6xl items-center justify-between gap-6 px-5 md:px-8">
          <Link href="/" aria-label="Western Premium, home">
            <Logo className="h-10" />
          </Link>

          <nav aria-label="Main" className="hidden flex-1 justify-center lg:flex">
            <ul className="flex items-center gap-20">
              {menus.map((menu, i) => {
                const isOpen = openMenu === i
                return (
                  <li key={menu.label} onMouseEnter={() => setOpenMenu(i)}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`menu-${i}`}
                      onClick={() => setOpenMenu(isOpen ? null : i)}
                      className={cn(
                        'flex items-center gap-2 py-6 text-[15px] transition-colors hover:text-navy',
                        isOpen || pathname.startsWith(menu.href) ? 'text-navy' : 'text-muted-foreground',
                      )}
                    >
                      {menu.label}
                      <ChevronDown
                        className={cn('size-4 transition-transform', isOpen && 'rotate-180')}
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="hidden w-40 lg:block" aria-hidden="true" />

          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center text-navy lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
            <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>

        {menus.map((menu, i) => (
          <div
            key={menu.label}
            id={`menu-${i}`}
            hidden={openMenu !== i}
            className="absolute inset-x-0 top-full hidden border-b border-border bg-background shadow-lg lg:block"
          >
            <div className="mx-auto grid max-w-6xl grid-cols-3 gap-px px-8 py-10">
              {menu.cards.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group flex flex-col gap-2 border-l-2 border-transparent p-5 transition-colors hover:border-primary hover:bg-pale/30"
                >
                  <span className="text-base font-medium text-navy">{card.title}</span>
                  <span className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </span>
                  <span className="mt-1 flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-primary">
                    Explore
                    <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        id="mobile-nav"
        hidden={!mobileOpen}
        className="on-navy fixed inset-x-0 bottom-0 top-[4.375rem] overflow-y-auto bg-navy text-navy-foreground lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col gap-8 px-5 py-8">
          {menus.map((menu) => (
            <div key={menu.label} className="flex flex-col gap-3">
              <p className="text-xs font-medium uppercase tracking-widest text-pale">{menu.label}</p>
              <ul className="flex flex-col">
                {menu.cards.map((card) => (
                  <li key={card.href} className="border-b border-pale/15">
                    <Link href={card.href} className="block py-3 text-lg">
                      {card.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-navy-foreground px-6 py-3 text-sm font-medium uppercase tracking-widest text-navy"
          >
            Request a Quote
          </Link>
        </nav>
      </div>
    </header>
  )
}
