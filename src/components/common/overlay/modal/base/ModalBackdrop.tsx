import { cn } from '@/utils/cn'

type ModalBackdropProps = {
  children?: React.ReactNode
  className?: string
  onClick?: () => void
}

export function ModalBackdrop({
  children,
  className,
  onClick,
}: ModalBackdropProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-overlay',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
