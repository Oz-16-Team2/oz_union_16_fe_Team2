import { cn } from '@/utils/cn'

type ModalHeaderProps = {
  children: React.ReactNode
  description?: React.ReactNode
  className?: string
}

export function ModalHeader({
  children,
  description,
  className,
}: ModalHeaderProps) {
  return (
    <div className={cn('pb-2.5', className)}>
      <h2 id="modal-title" className="text-lg font-bold text-text-primary">
        {children}
      </h2>
      {description && <div>{description}</div>}
    </div>
  )
}
