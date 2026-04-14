import { cn } from '@/utils/cn'

import type { LoadingProps } from './Loading.type'

const sizeClassMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-[3px]',
}

const textSizeClassMap = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
}

// 로딩 인디케이터 컴포넌트
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
            'inline-block animate-spin rounded-full border-[var(--color-gray-300)] border-t-[var(--color-primary-500)]',
            sizeClassMap[size]
          )}
        />
        {showLabel ? (
          <span
            className={cn(
              'font-medium text-[var(--color-text-muted)]',
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
