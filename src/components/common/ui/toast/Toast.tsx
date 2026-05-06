import { AlertTriangle, CircleCheck, Info, XCircle } from 'lucide-react'

import { cn } from '@/utils/cn'

import type { ToastProps } from './useToast'

const toastVariants = {
  success: {
    className:
      'border-teal-600 bg-teal-50 text-teal-700 dark:border-teal-300 dark:bg-teal-950 dark:text-teal-200',
    iconClassName: 'text-teal-600 dark:text-teal-200',
    icon: <CircleCheck size={18} />,
  },
  error: {
    className:
      'border-rose-400 bg-rose-50 text-rose-500 dark:border-rose-300 dark:bg-rose-950 dark:text-rose-200',
    iconClassName: 'text-rose-400 dark:text-rose-200',
    icon: <XCircle size={18} />,
  },
  warning: {
    className:
      'border-orange-400 bg-orange-50 text-orange-500 dark:border-orange-300 dark:bg-orange-950 dark:text-orange-200',
    iconClassName: 'text-orange-400 dark:text-orange-200',
    icon: <AlertTriangle size={18} />,
  },
  info: {
    className:
      'border-sky-500 bg-sky-50 text-sky-600 dark:border-sky-300 dark:bg-sky-950 dark:text-sky-200',
    iconClassName: 'text-sky-500 dark:text-sky-200',
    icon: <Info size={18} />,
  },
}

export function Toast({ message, type = 'success' }: ToastProps) {
  const { className, icon, iconClassName } = toastVariants[type]

  return (
    <div
      className={cn(
        'pointer-events-auto inline-flex w-auto max-w-[min(420px,calc(100vw-32px))] items-start justify-start gap-2 rounded-xl border-2 px-4 py-3 shadow-card-main',
        className
      )}
    >
      <div className={cn('mt-0.5 shrink-0', iconClassName)}>{icon}</div>
      <span className="flex-1 min-w-0 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
        {message}
      </span>
    </div>
  )
}
