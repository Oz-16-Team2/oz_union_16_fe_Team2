import type React from 'react'

import { cn } from '@/utils/cn'

export type TextareaProps = {
  error?: boolean
  errorMessage?: string
  size?: 'sm' | 'lg'
} & React.ComponentProps<'textarea'>

const textareaSizeClass = {
  sm: 'h-15 py-4',
  lg: 'h-58 py-5',
}

export function Textarea({
  className,
  error,
  errorMessage,
  ref,
  size = 'sm',
  ...props
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-4">
      <textarea
        ref={ref}
        {...props}
        className={cn(
          'max-h-58 w-full resize-none overflow-y-auto rounded-xl border border-border-default bg-white px-4.5 text-text-primary outline-none placeholder:text-text-muted transition-colors disabled:cursor-not-allowed disabled:opacity-50',
          textareaSizeClass[size],
          error
            ? 'border-status-error-border focus:border-status-error-border'
            : 'focus:border-focus-border',
          className
        )}
      />

      {error && errorMessage && (
        <p className="text-sm text-status-error-text">{errorMessage}</p>
      )}
    </div>
  )
}

export default Textarea
