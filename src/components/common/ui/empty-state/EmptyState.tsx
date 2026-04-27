import { emptySate } from '@/assets/images'
import { cn } from '@/utils/cn'

type EmptyStateProps = {
  title: string
  description?: string
  className?: string
}

export function EmptyState({ title, description, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 py-16 text-center',
        className
      )}
    >
      <img
        src={emptySate}
        className="w-36 select-none sm:w-44"
        loading="lazy"
      />

      <div className="flex flex-col gap-1">
        <p className="text-lg font-semibold text-text-primary">{title}</p>
        {description ? (
          <p className="text-sm text-text-muted">{description}</p>
        ) : null}
      </div>
    </div>
  )
}
