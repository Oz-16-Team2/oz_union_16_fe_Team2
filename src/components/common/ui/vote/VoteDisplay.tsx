import { CalendarDays, Check, Users } from 'lucide-react'

import { cn } from '@/utils/cn'

import { voteButtonVariants } from './Vote.style'
import type { VoteDisplayProps } from './Vote.type'

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

export function VoteDisplay({
  mode,
  options,
  participantCount = 0,
  startDate,
  endDate,
  actionLabel,
  showMoreButton = false,
  actionSlot,
  onSelectOption,
  onActionClick,
}: VoteDisplayProps) {
  const isClosed = mode === 'closed'
  const isVoted = mode === 'voted'
  const showResult = isVoted || isClosed

  const hasCheckedOption = options.some((o) => o.checked)
  const isActionDisabled = isClosed || (mode === 'member' && !hasCheckedOption)

  const buttonLabel = isClosed ? '투표 마감' : (actionLabel ?? '투표하기')
  const statusLabel = isClosed ? '투표 마감' : '투표 진행중'
  const hasPeriod = Boolean(startDate && endDate)

  return (
    <>
      <div className="mb-2 flex items-center gap-2 text-sm">
        <span className="text-text-muted">{statusLabel}</span>

        {hasPeriod && (
          <>
            <CalendarDays className="h-4 w-4 text-text-muted" />
            <span className="text-text-primary">
              {startDate} ~ {endDate}
            </span>
          </>
        )}
      </div>

      <section
        className={cn(
          'w-full rounded-2xl border border-border-default bg-gray-100 px-6 py-6 shadow-card-main',
          isClosed && 'opacity-50'
        )}
      >
        {(showMoreButton || actionSlot) && (
          <div className="mb-4 flex justify-end">
            {actionSlot ?? (
              <button
                type="button"
                aria-label="더보기"
                className="text-xl text-text-muted"
              >
                ...
              </button>
            )}
          </div>
        )}

        <div className="flex flex-col gap-4">
          {options.map((option, index) => {
            const isSelected = Boolean(option.checked)
            const percentage = Math.min(
              100,
              Math.max(0, option.percentage ?? 0)
            )

            const textColor = isSelected
              ? optionVariants.text.selected
              : showResult
                ? optionVariants.text.result
                : optionVariants.text.default

            return (
              <button
                key={option.id}
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
                      'flex h-full items-center rounded-full px-6 text-xs',
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
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onActionClick}
            disabled={isActionDisabled}
            className={cn(
              voteButtonVariants.base,
              isActionDisabled
                ? voteButtonVariants.disabled
                : voteButtonVariants.enabled
            )}
          >
            {buttonLabel}
          </button>
        </div>
      </section>

      <div className="mt-4 flex items-center gap-2 text-sm text-text-muted">
        <Users className="h-4 w-4" />
        <span>{participantCount}명 참여중</span>
      </div>
    </>
  )
}
