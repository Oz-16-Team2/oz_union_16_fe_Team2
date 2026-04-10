import { useEffect } from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/cn'

import { ModalBackdrop } from './ModalBackdrop'
import { ModalContent } from './ModalContent'
import { ModalFooter } from './ModalFooter'
import { ModalHeader } from './ModalHeader'

const modalVariants = cva('w-full bg-white shadow-card-active', {
  variants: {
    size: {
      default: 'max-w-100 text-sm p-7',
      // 추가 가능
    },
    rounded: {
      none: 'rounded-none',
      default: 'rounded-xl',
      // 추가 가능
    },
    border: {
      none: '',
      default: 'border border-gray-200',
      // 추가 가능
    },
  },
  defaultVariants: {
    size: 'default',
    rounded: 'default',
    border: 'default',
  },
})

export type ModalProps = VariantProps<typeof modalVariants> & {
  children: React.ReactNode
  onClose: () => void
  className?: string
}

export function Modal({
  children,
  onClose,
  className,
  size,
  rounded,
  border,
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <ModalBackdrop onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        className={cn(modalVariants({ size, rounded, border }), className)}
      >
        {children}
      </div>
    </ModalBackdrop>
  )
}

Modal.Header = ModalHeader
Modal.Content = ModalContent
Modal.Footer = ModalFooter
