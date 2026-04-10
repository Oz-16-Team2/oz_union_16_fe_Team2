import { useCallback, useState } from 'react'

import { useOutsideClick } from '../../../../hooks/useOutsideClick'
import { cn } from '../../../../utils/cn'

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
            'absolute z-10 mt-1 min-w-[100px] rounded-[12px] shadow-card-main px-[16px] py-[14px]',
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
                className="w-full px-[6px] py-[3px] text-center text-[12px] rounded-[4px] cursor-pointer hover:bg-[#C3DBFF]/21 hover:text-[#1B57FF] hover:font-semibold"
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
