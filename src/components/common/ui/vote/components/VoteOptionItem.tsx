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
  base: 'grid w-full min-w-0 grid-cols-[16px_minmax(0,1fr)_40px] items-center gap-2 text-left sm:grid-cols-[24px_minmax(0,1fr)_56px]',

  text: {
    selected: 'text-primary-500 dark:text-white',
    result: 'text-text-primary',
    default: 'text-text-muted',
  },

  gauge: {
    first: 'bg-gray-300 dark:bg-white/20',
    second: 'bg-primary-100 dark:bg-primary-600/20',
  },

  indicator: {
    selected:
      'flex size-4 items-center justify-center rounded-sm bg-primary-500 text-white',
    default:
      'flex size-4 items-center justify-center rounded-sm bg-gray-300 dark:bg-white/20',
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
  const displayPercentage = Math.round(percentage)

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
      {/* 체크박스 */}
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

      {/* 게이지 */}
      <div className="relative h-12 min-w-0 overflow-hidden rounded-full bg-gray-100 shadow-sm dark:bg-white/5 sm:h-14">
        {showResult && percentage > 0 && (
          <div
            className={cn(
              'absolute inset-y-0 left-0 rounded-full',
              index === 0
                ? optionVariants.gauge.first
                : optionVariants.gauge.second
            )}
            style={{ width: `${percentage}%` }}
          />
        )}

        {/* 게이지 내부 텍스트 */}
        <span
          className={cn(
            'relative z-10 flex h-full min-w-0 items-center truncate px-3 text-sm font-medium sm:px-6',
            textColor
          )}
          title={option.valueLabel}
        >
          {option.valueLabel}
        </span>
      </div>

      {/* 퍼센트 */}
      <span className={cn('text-right text-sm font-medium', textColor)}>
        {showResult ? `${displayPercentage}%` : ''}
      </span>
    </button>
  )
}
