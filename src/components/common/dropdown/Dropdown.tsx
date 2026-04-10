import { useCallback, useState } from 'react'

import { cva } from 'class-variance-authority'
import { ChevronDown } from 'lucide-react'

import { useOutsideClick } from '@/hooks/useOutsideClick'
import { cn } from '@/utils/cn'

const ITEM_HEIGHT = 53
const MAX_VISIBLE_ITEMS = 4
const LIST_MAX_HEIGHT = ITEM_HEIGHT * MAX_VISIBLE_ITEMS

const dropdownTriggerVariants = cva(
  'flex w-full items-center justify-between border border-gray-200 bg-white text-[14px] text-gray-400 transition-colors cursor-pointer',
  {
    variants: {
      size: {
        md: 'rounded-[4px] px-[16px] py-[10px]',
        // 추가 가능
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const dropdownListVariants = cva(
  'absolute left-0 right-0 z-10 mt-[8px] overflow-hidden bg-white',
  {
    variants: {
      size: {
        sm: 'rounded-[6px] ',
        md: 'rounded-[12px] p-[6px]',
        lg: 'rounded-[9999px]',
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
  options: DropdownOption[]
  placeholder?: string
  size?: 'md' // 추가 가능
  value?: string
  onChange?: (value: string) => void
}

export function Dropdown({
  options,
  placeholder = '해당되는 항목을 선택해 주세요.',
  size = 'md',
  value,
  onChange,
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
    <div ref={ref} className="relative w-full min-w-[250px]">
      {/* TODO: 버튼 공통 컴포넌트 만들면 적용 */}
      <button
        type="button"
        onClick={() => (isOpen ? close() : setIsOpen(true))}
        className={cn(
          dropdownTriggerVariants({ size }),
          (isOpen || value) && 'border-border-active',
          value && 'text-gray-900 cursor-pointer'
        )}
      >
        <span>{selectedLabel ?? placeholder}</span>
        <ChevronDown
          size={16}
          strokeWidth={1.5}
          className={cn(
            'text-gray-700 transition-transform duration-200',
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
                    'w-full p-[16px] text-left text-[14px] rounded-[4px] transition-colors cursor-pointer',
                    value === opt.value
                      ? 'bg-primary-500 text-white'
                      : 'hover:bg-primary-100/21 hover:text-primary-600 hover:font-semibold'
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
