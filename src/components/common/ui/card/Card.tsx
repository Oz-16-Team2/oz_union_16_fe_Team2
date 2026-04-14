import { cn } from '@/utils/cn'

export type CardProps = React.ComponentProps<'div'>

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'w-69 h-85 px-2.5 py-3 rounded-2xl bg-surface border border-border-default hover:shadow-card-light hover:border-border-active transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
