import { type Assignment, assignmentClient, assignmentDescription } from '@/content/company'
import { cn } from '@/lib/utils'

export function StatusBadge({ status }: { status: Assignment['status'] }) {
  const awarded = status === 'Contract awarded'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-sm px-2 py-1 text-xs font-medium',
        awarded ? 'border border-primary text-primary' : 'bg-pale text-navy',
      )}
    >
      <span aria-hidden="true" className={cn('size-1.5 rounded-full', awarded ? 'bg-primary' : 'bg-navy')} />
      {status}
    </span>
  )
}

export function AssignmentCard({ assignment }: { assignment: Assignment }) {
  const meta = [assignment.sector, assignment.year].filter(Boolean)
  return (
    <article className="flex h-full flex-col gap-5 border-t-2 border-navy bg-background pt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{meta.join(' · ')}</p>
        <StatusBadge status={assignment.status} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-primary">{assignmentClient(assignment)}</p>
        <h3 className="font-serif text-2xl leading-snug text-navy">{assignment.title}</h3>
      </div>
      <p className="text-pretty leading-relaxed text-muted-foreground">{assignmentDescription(assignment).join(' ')}</p>
    </article>
  )
}
