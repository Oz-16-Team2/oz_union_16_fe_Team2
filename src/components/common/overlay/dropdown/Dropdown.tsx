import { useCallback, useState } from 'react'

import { cva } from 'class-variance-authority'
import { ChevronDown } from 'lucide-react'

import { useOutsideClick } from '@/hooks/useOutsideClick'
import { cn } from '@/utils/cn'

const ITEM_HEIGHT = 53
const MAX_VISIBLE_ITEMS = 4
const LIST_MAX_HEIGHT = ITEM_HEIGHT * MAX_VISIBLE_ITEMS

const dropdownTriggerVariants = cva(
  'flex w-full items-center justify-between border border-border-default bg-surface text-sm text-text-muted transition-colors cursor-pointer',
  {
    variants: {
      size: {
        md: 'rounded-sm px-4 py-2.5',
        // 추가 가능
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const dropdownListVariants = cva(
  'absolute left-0 right-0 z-50 mt-2 overflow-hidden bg-surface',
  {
    variants: {
      size: {
        sm: 'rounded-md ',
        md: 'rounded-xl p-1.5',
        lg: 'rounded-full',
      },
      shadow: {
        sm: 'shadow-card-main',
        md: 'shadow-card-light',
        lg: 'shadow-card-hover',
      },
    },
    defaultVariants: {
      size: 'md',
      shadow: 'md',
    },
  }
)

export type DropdownOption = {
  value: string
  label: string
}

type DropdownProps = {
  id?: string
  options: DropdownOption[]
  placeholder?: string
  size?: 'md' // 추가 가능
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  className?: string
}

export function Dropdown({
  id,
  options,
  placeholder = '해당되는 항목을 선택해 주세요.',
  size = 'md',
  value,
  onChange,
  disabled = false,
  className,
}: DropdownProps) {
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

  const selectedLabel = options.find((opt) => opt.value === value)?.label

  return (
    <div ref={ref} className={cn('relative w-full min-w-64', className)}>
      <button
        id={id}
        type="button"
        onClick={() => (isOpen ? close() : setIsOpen(true))}
        className={cn(
          dropdownTriggerVariants({ size }),
          isOpen && 'border-border-active',
          value && 'text-text-primary cursor-pointer',
          disabled && 'cursor-not-allowed opacity-50'
        )}
        disabled={disabled}
      >
        <span>{selectedLabel ?? placeholder}</span>
        <ChevronDown
          size={16}
          strokeWidth={1.5}
          className={cn(
            'text-text-muted transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {(isOpen || isClosing) && (
        <ul
          className={cn(
            dropdownListVariants({ size }),
            isClosing
              ? 'animate-[dropdown-out_0.2s_ease-in_forwards]'
              : 'animate-[dropdown-in_0.2s_ease-out]'
          )}
          onAnimationEnd={handleAnimationEnd}
        >
          <div
            style={{ maxHeight: LIST_MAX_HEIGHT }}
            className="overflow-y-auto"
          >
            {options.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange?.(opt.value)
                    close()
                  }}
                  className={cn(
                    'w-full p-4 text-left text-sm rounded-sm transition-colors cursor-pointer',
                    value === opt.value
                      ? 'bg-primary-500 text-white'
                      : 'text-text-primary hover:bg-dropdown-item-hover-bg hover:text-dropdown-item-hover-text hover:font-semibold'
                  )}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </div>
        </ul>
      )}
    </div>
  )
}
