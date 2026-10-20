import { FileDown } from 'lucide-react'
import { company } from '@/content/company'
import { cn } from '@/lib/utils'

/**
 * Download link for the company profile. While no PDF has been uploaded, renders a
 * non-interactive, clearly labelled placeholder instead of a dead link.
 */
export function ProfileDownload({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  const colour = tone === 'dark' ? 'text-primary' : 'text-pale'

  if (company.profilePdf) {
    return (
      <a
        href={company.profilePdf}
        download
        className={cn('inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline', colour, className)}
      >
        <FileDown className="size-4" aria-hidden="true" />
        Download Company Profile
        <span className="sr-only">(PDF)</span>
      </a>
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-sm',
        tone === 'dark' ? 'text-muted-foreground' : 'text-pale/80',
        className,
      )}
    >
      <FileDown className="size-4" aria-hidden="true" />
      Company profile PDF: placeholder, awaiting upload
    </span>
  )
}
