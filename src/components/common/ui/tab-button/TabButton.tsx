import { cn } from '@/utils/cn'

type TabButtonProps = {
  isActive?: boolean
} & React.ComponentProps<'button'>

export function TabButton({
  isActive = false,
  className,
  children,
  ...props
}: TabButtonProps) {
  return (
    <button
      className={cn(
        'min-w-18 rounded-full px-4 py-1 text-center text-sm font-medium focus-visible:outline-none',
        isActive
          ? 'bg-tab-active-bg text-tab-active-text hover:bg-tab-hover-bg'
          : 'text-text-muted hover:bg-tab-hover-bg hover:text-tab-active-text',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
