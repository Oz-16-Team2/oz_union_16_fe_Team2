import { cn } from '@/utils/cn'

type ModalContentProps = {
  children: React.ReactNode
  className?: string
}

export function ModalContent({ children, className }: ModalContentProps) {
  return <div className={cn('py-1', className)}>{children}</div>
}
