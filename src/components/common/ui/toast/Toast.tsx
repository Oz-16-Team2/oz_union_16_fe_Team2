import { AlertTriangle, CircleCheck, Info, XCircle } from 'lucide-react'

import { cn } from '@/utils/cn'

import type { ToastProps } from './useToast'

const toastVariants = {
  success: {
    className: 'border-success-200 bg-success-200/10 text-success-200',
    icon: <CircleCheck size={18} />,
  },
  error: {
    className: 'border-danger-500 bg-danger-100/10 text-danger-500',
    icon: <XCircle size={18} />,
  },
  warning: {
    className: 'border-orange-400 bg-orange-50/10 text-orange-400',
    icon: <AlertTriangle size={18} />,
  },
  info: {
    className: 'border-primary-500 bg-primary-100/5 text-primary-400',
    icon: <Info size={18} />,
  },
}

export function Toast({ message, type = 'success' }: ToastProps) {
  const { className, icon } = toastVariants[type]

  return (
    <div
      className={cn(
        'inline-flex w-auto items-start justify-start gap-2 rounded-xl border px-4 py-3 max-w-[min(420px,calc(100vw-32px))]',
        className
      )}
    >
      <div className="shrink-0 mt-0.5">{icon}</div>
      <span className="flex-1 min-w-0 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
        {message}
      </span>
    </div>
  )
}
