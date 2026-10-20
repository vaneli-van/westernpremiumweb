import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'outline' | 'light' | 'outline-light' | 'text'

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-navy',
  outline: 'border border-navy text-navy hover:bg-navy hover:text-navy-foreground',
  light: 'bg-background text-navy hover:bg-pale',
  'outline-light': 'border border-pale/60 text-navy-foreground hover:bg-navy-foreground hover:text-navy',
  text: 'px-0 py-0 text-primary underline-offset-4 hover:underline',
}

export const actionClasses = (variant: Variant = 'primary', className?: string) =>
  cn(
    'inline-flex items-center justify-center gap-2 rounded-sm text-sm font-medium transition-[color,background-color,transform]',
    variant !== 'text' && 'px-5 py-3 active:translate-y-px',
    variants[variant],
    className,
  )

export function ActionLink({
  href,
  children,
  variant = 'primary',
  arrow = false,
  className,
}: {
  href: string
  children: React.ReactNode
  variant?: Variant
  arrow?: boolean
  className?: string
}) {
  return (
    <Link href={href} className={actionClasses(variant, className)}>
      {children}
      {arrow && <ArrowRight className="size-4" aria-hidden="true" />}
    </Link>
  )
}
