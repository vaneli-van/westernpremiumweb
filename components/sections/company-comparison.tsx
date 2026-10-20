import { assetGovernance } from '@/content/company'
import { cn } from '@/lib/utils'

/** Two-column comparison of what Western Premium and Asset One Africa each provide. */
export function CompanyComparison({ tone = 'light', headingLevel = 'h3' }: { tone?: 'light' | 'navy'; headingLevel?: 'h2' | 'h3' }) {
  const onNavy = tone === 'navy'
  const ColumnHeading = headingLevel === 'h2' ? 'h3' : 'h4'
  const Heading = headingLevel

  return (
    <div className="flex flex-col gap-6">
      <Heading className={cn('text-xs font-medium uppercase tracking-widest', onNavy ? 'text-pale' : 'text-navy')}>
        {assetGovernance.comparisonHeading}
      </Heading>
      <div className={cn('grid gap-px md:grid-cols-2', onNavy ? 'bg-pale/20' : 'bg-border')}>
        {assetGovernance.columns.map((col) => (
          <div key={col.name} className={cn('flex flex-col gap-5 p-6 md:p-8', onNavy ? 'bg-navy' : 'bg-background')}>
            <ColumnHeading className={cn('font-sans text-2xl font-semibold', onNavy ? 'text-navy-foreground' : 'text-navy')}>
              {col.name}
            </ColumnHeading>
            <ul className="flex flex-col">
              {col.items.map((item) => (
                <li
                  key={item}
                  className={cn(
                    'flex gap-3 border-b py-3 text-sm leading-relaxed',
                    onNavy ? 'border-pale/20 text-navy-foreground' : 'border-border text-navy',
                  )}
                >
                  <span aria-hidden="true" className={cn('mt-2 size-1.5 shrink-0', onNavy ? 'bg-pale' : 'bg-primary')} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className={cn('text-pretty leading-relaxed', onNavy ? 'text-pale/90' : 'text-muted-foreground')}>
        {assetGovernance.scopeStatement}
      </p>
    </div>
  )
}
