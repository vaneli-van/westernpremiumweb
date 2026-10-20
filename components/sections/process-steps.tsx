import { processSteps } from '@/content/company'
import { cn } from '@/lib/utils'

export function ProcessSteps({ detailed = false, tone = 'light' }: { detailed?: boolean; tone?: 'light' | 'navy' }) {
  const onNavy = tone === 'navy'
  return (
    <ol className="grid gap-px md:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((step, i) => (
        <li
          key={step.title}
          className={cn(
            'flex flex-col gap-4 border-t pt-6 lg:pr-8',
            onNavy ? 'border-pale/30' : 'border-navy',
          )}
        >
          <span
            className={cn('font-serif text-4xl leading-none', onNavy ? 'text-pale' : 'text-primary')}
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <h3 className={cn('text-lg font-medium', onNavy ? 'text-navy-foreground' : 'text-navy')}>
            <span className="sr-only">Step {i + 1}: </span>
            {step.title}
          </h3>
          <p className={cn('text-pretty leading-relaxed', onNavy ? 'text-pale/85' : 'text-muted-foreground')}>
            {detailed ? step.detail : step.short}
          </p>
        </li>
      ))}
    </ol>
  )
}
