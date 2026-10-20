import { cn } from '@/lib/utils'

const defaultHeights = [38, 56, 74, 92, 100]

/** Abstract architectural columns inspired by the brand's pillar symbol. Decorative only. */
export function Pillars({
  heights = defaultHeights,
  tone = 'blue',
  className,
}: {
  heights?: number[]
  tone?: 'blue' | 'pale' | 'navy'
  className?: string
}) {
  const colour = tone === 'blue' ? 'bg-primary' : tone === 'pale' ? 'bg-pale' : 'bg-navy'
  return (
    <div aria-hidden="true" className={cn('flex h-full items-end gap-[6%]', className)}>
      {heights.map((h, i) => (
        <span
          key={i}
          className={cn('block flex-1', colour)}
          style={{ height: `${h}%`, opacity: 0.35 + (i / Math.max(heights.length - 1, 1)) * 0.65 }}
        />
      ))}
    </div>
  )
}
