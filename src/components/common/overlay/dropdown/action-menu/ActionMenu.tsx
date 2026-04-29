import { useCallback, useState } from 'react'

import { useOutsideClick } from '@/hooks/useOutsideClick'
import { cn } from '@/utils/cn'

type ActionMenuItem = {
  label: string
  onClick: () => void
  variant?: 'default' | 'danger'
}

type ActionMenuProps = {
  trigger: React.ReactNode
  items: ActionMenuItem[]
  align?: 'left' | 'right'
  size?: 'sm' | 'md'
  className?: string
  menuClassName?: string
}

export function ActionMenu({
  trigger,
  items,
  align = 'right',
  size = 'md',
  className,
  menuClassName,
}: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const close = useCallback(() => {
    if (!isOpen) return
    setIsClosing(true)
  }, [isOpen])

  const ref = useOutsideClick<HTMLDivElement>(close)

  const handleAnimationEnd = () => {
    if (isClosing) {
      setIsClosing(false)
      setIsOpen(false)
    }
  }

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => (isOpen ? close() : setIsOpen(true))}
        className={cn('cursor-pointer', className)}
        aria-label="메뉴 열기"
      >
        {trigger}
      </button>

      {(isOpen || isClosing) && (
        <ul
          className={cn(
            'absolute z-10 mt-1 w-max rounded-xl shadow-card-main bg-surface',
            size === 'sm' ? 'px-2 py-2' : 'px-4 py-3.5',
            align === 'right' ? 'right-0' : 'left-0',
            isClosing
              ? 'animate-[dropdown-out_0.2s_ease-in_forwards]'
              : 'animate-[dropdown-in_0.2s_ease-out]',
            menuClassName
          )}
          onAnimationEnd={handleAnimationEnd}
        >
          {items.map(({ label, onClick, variant = 'default' }) => (
            <li key={label}>
              <button
                type="button"
                onClick={() => {
                  onClick()
                  close()
                }}
                className={cn(
                  'w-full rounded-sm cursor-pointer hover:font-semibold',
                  size === 'sm'
                    ? 'px-2 py-1 text-xs text-center'
                    : 'px-1.5 py-1 text-sm text-center',
                  variant === 'danger'
                    ? 'text-error-500 hover:bg-error-50 dark:hover:bg-error-950'
                    : 'text-text-primary hover:bg-dropdown-item-hover-bg hover:text-dropdown-item-hover-text'
                )}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
