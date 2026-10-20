import Image from 'next/image'
import { company } from '@/content/company'
import { cn } from '@/lib/utils'

/**
 * `dark` renders the original logo for light backgrounds. `light` renders the reversed
 * version (white wordmark, brand blue accent kept) for navy backgrounds such as the footer.
 */
export function Logo({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  return (
    <Image
      src={tone === 'light' ? company.logoReversedSrc : company.logoSrc}
      alt={company.legalName}
      width={831}
      height={228}
      className={cn('h-11 w-auto self-start', className)}
      priority={tone === 'dark'}
      unoptimized
    />
  )
}
