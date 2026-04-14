import { cn } from '@/utils/cn'

import type { LoadingProps, LoadingSize } from './Loading.type'

const sizeClassMap: Record<LoadingSize, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-[3px]',
}

const textSizeClassMap: Record<LoadingSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
}

export function Loading({
  size = 'md',
  label = '로딩 중',
  showLabel = false,
  fullScreen = false,
  className,
  ...props
}: LoadingProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={cn(
        'flex items-center justify-center',
        fullScreen && 'min-h-screen w-full',
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-2">
        <span
          aria-hidden="true"
          className={cn(
            'inline-block animate-spin rounded-full border-border-default border-t-button-primary-bg',
            sizeClassMap[size]
          )}
        />
        {showLabel ? (
          <span
            className={cn(
              'font-medium text-text-muted',
              textSizeClassMap[size]
            )}
          >
            {label}
          </span>
        ) : null}
      </div>
    </div>
  )
}
