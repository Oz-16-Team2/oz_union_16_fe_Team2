import { useCallback, useState } from 'react'

import { useOutsideClick } from '@/hooks/useOutsideClick'
import { cn } from '@/utils/cn'

type ActionMenuItem = {
  label: string
  onClick: () => void
}

type ActionMenuProps = {
  trigger: React.ReactNode
  items: ActionMenuItem[]
  align?: 'left' | 'right'
}

export function ActionMenu({
  trigger,
  items,
  align = 'right',
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
        className="cursor-pointer"
        aria-label="메뉴 열기"
      >
        {trigger}
      </button>

      {(isOpen || isClosing) && (
        <ul
          className={cn(
            'absolute z-10 mt-1 min-w-30 rounded-xl shadow-card-main bg-surface px-4 py-3.5',
            align === 'right' ? 'right-0' : 'left-0',
            isClosing
              ? 'animate-[dropdown-out_0.2s_ease-in_forwards]'
              : 'animate-[dropdown-in_0.2s_ease-out]'
          )}
          onAnimationEnd={handleAnimationEnd}
        >
          {items.map(({ label, onClick }) => (
            <li key={label}>
              <button
                type="button"
                onClick={() => {
                  onClick()
                  close()
                }}
                className="w-full px-1.5 py-1 text-center text-sm rounded-sm cursor-pointer text-text-primary hover:bg-dropdown-item-hover-bg hover:text-dropdown-item-hover-text hover:font-semibold"
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
