import { AlertTriangle, CircleCheck, Info, XCircle } from 'lucide-react'

import { cn } from '@/utils/cn'

import type { ToastProps } from './useToast'

const toastVariants = {
  success: {
    className: 'border-success-200 bg-success-200/10 text-success-200',
    icon: <CircleCheck size={18} />,
  },
  error: {
    className: 'border-danger-500 bg-danger-100 text-danger-500',
    icon: <XCircle size={18} />,
  },
  warning: {
    className: 'border-orange-400 bg-orange-50 text-orange-400',
    icon: <AlertTriangle size={18} />,
  },
  info: {
    className: 'border-primary-500 bg-primary-100 text-primary-500',
    icon: <Info size={18} />,
  },
}

export function Toast({ message, type = 'success' }: ToastProps) {
  const { className, icon } = toastVariants[type]

  return (
    <div
      className={cn(
        'inline-flex h-13.5 w-full max-w-75 items-center justify-center gap-2 rounded-xl border px-8',
        className
      )}
    >
      {icon}
      <span className="min-w-0 text-sm">{message}</span>
    </div>
  )
}
