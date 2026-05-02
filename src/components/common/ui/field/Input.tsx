import { cn } from '@/utils/cn'

export type InputProps = {
  error?: boolean
  errorMessage?: string
} & React.ComponentProps<'input'>

export function Input({
  className,
  error,
  errorMessage,
  ref,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-4">
      <input
        ref={ref}
        {...props}
        className={cn(
          'w-full rounded-xl border border-border-default bg-input-bg px-4.5 py-3.5 text-text-primary outline-none placeholder:text-text-muted disabled:cursor-not-allowed disabled:opacity-50',
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
