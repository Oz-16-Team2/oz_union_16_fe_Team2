import { Check } from 'lucide-react'

import { cn } from '@/utils/cn'

import type { VoteDisplayOption } from '../Vote.type'

// 옵션 1개 렌더링
type VoteOptionItemProps = {
  option: VoteDisplayOption
  index: number
  isClosed: boolean
  showResult: boolean
  onSelectOption?: (optionId: string) => void
}

const optionVariants = {
  base: 'grid w-full grid-cols-[24px_64px_minmax(0,1fr)_56px] items-center gap-2 text-left',

  text: {
    selected: 'text-primary-400',
    result: 'text-text-primary',
    default: 'text-text-muted',
  },

  gauge: {
    first: 'bg-gray-300',
    second: 'bg-primary-100',
  },

  indicator: {
    selected:
      'flex size-4 items-center justify-center rounded-sm bg-primary-400 text-white',
    default: 'flex size-4 items-center justify-center rounded-sm bg-gray-300',
  },
}

export function VoteOptionItem({
  option,
  index,
  isClosed,
  showResult,
  onSelectOption,
}: VoteOptionItemProps) {
  const isSelected = Boolean(option.checked)
  const percentage = Math.min(100, Math.max(0, option.percentage ?? 0))

  const textColor = isSelected
    ? optionVariants.text.selected
    : showResult
      ? optionVariants.text.result
      : optionVariants.text.default

  return (
    <button
      type="button"
      disabled={isClosed}
      onClick={() => onSelectOption?.(option.id)}
      className={optionVariants.base}
    >
      <span className="flex items-center justify-center">
        <span
          className={cn(
            isSelected
              ? optionVariants.indicator.selected
              : optionVariants.indicator.default
          )}
        >
          {isSelected && <Check className="size-3" strokeWidth={3} />}
        </span>
      </span>

      <span className={cn('text-sm font-medium', textColor)}>
        {option.optionLabel}
      </span>

      <div className="h-14 overflow-hidden rounded-full bg-gray-100 shadow-sm">
        <div
          className={cn(
            'flex h-full items-center overflow-hidden rounded-full text-xs',
            percentage > 0 && 'px-6',
            index === 0
              ? optionVariants.gauge.first
              : optionVariants.gauge.second
          )}
          style={{
            width: showResult ? `${percentage}%` : '100%',
          }}
        >
          <span className="truncate">{option.valueLabel}</span>
        </div>
      </div>

      <span className={cn('text-right text-xs', textColor)}>
        {showResult ? `${percentage}%` : ''}
      </span>
    </button>
  )
}
