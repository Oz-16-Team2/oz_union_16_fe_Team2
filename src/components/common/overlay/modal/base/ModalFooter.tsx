import { cn } from '@/utils/cn'

type ModalFooterProps = {
  children: React.ReactNode
  className?: string
}

export function ModalFooter({ children, className }: ModalFooterProps) {
  return <div className={cn('flex justify-end', className)}>{children}</div>
}
