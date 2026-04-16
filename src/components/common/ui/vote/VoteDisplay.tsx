import { CalendarDays, Users } from 'lucide-react'

import { cn } from '@/utils/cn'

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
}

const buttonVariants = {
  base: 'h-[42px] w-[464px] rounded-lg text-[16px] font-medium',

  enabled:
    'bg-button-primary-bg text-button-primary-text hover:bg-button-primary-hover',

  disabled: 'cursor-not-allowed bg-gray-400 text-white',
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
      {/* 상태 + 기간 */}
      <div className="mb-2 flex items-center gap-2 text-[14px]">
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

      {/* 카드 */}
      <section
        className={cn(
          'w-full rounded-2xl border border-border-default bg-gray-100 px-6 py-6 shadow-[var(--shadow-card-main)]',
          isClosed && 'opacity-50'
        )}
      >
        {(showMoreButton || actionSlot) && (
          <div className="mb-4 flex justify-end">
            {actionSlot ?? (
              <button className="text-[20px] text-text-muted">...</button>
            )}
          </div>
        )}

        {/* 옵션 */}
        <div className="flex flex-col gap-4">
          {options.map((option, index) => {
            const isSelected = Boolean(option.checked)

            const textColor = isSelected
              ? optionVariants.text.selected
              : showResult
                ? optionVariants.text.result
                : optionVariants.text.default

            return (
              <button
                key={option.id}
                disabled={isClosed}
                onClick={() => onSelectOption?.(option.id)}
                className={optionVariants.base}
              >
                {/* 체크 */}
                <span className="flex items-center justify-center">
                  <span className="h-[11px] w-[12px] rounded-[2px] bg-gray-300" />
                </span>

                {/* 텍스트 */}
                <span className={cn('text-[14px] font-medium', textColor)}>
                  {option.optionLabel}
                </span>

                {/* 게이지 */}
                <div className="h-[54px] overflow-hidden rounded-full bg-gray-100 shadow-[0_1px_1px_rgba(0,0,0,0.1)]">
                  <div
                    className={cn(
                      'flex h-full items-center rounded-full px-6 text-[12px]',
                      index === 0
                        ? optionVariants.gauge.first
                        : optionVariants.gauge.second
                    )}
                    style={{
                      width: showResult ? `${option.percentage ?? 0}%` : '100%',
                    }}
                  >
                    <span className="truncate">{option.valueLabel}</span>
                  </div>
                </div>

                {/* 퍼센트 */}
                <span className={cn('text-right text-[12px]', textColor)}>
                  {showResult ? `${option.percentage ?? 0}%` : ''}
                </span>
              </button>
            )
          })}
        </div>

        {/* 버튼 */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onActionClick}
            disabled={isActionDisabled}
            className={cn(
              buttonVariants.base,
              isActionDisabled
                ? buttonVariants.disabled
                : buttonVariants.enabled
            )}
          >
            {buttonLabel}
          </button>
        </div>
      </section>

      {/* 참여 */}
      <div className="mt-4 flex items-center gap-2 text-[14px] text-text-muted">
        <Users className="h-4 w-4" />
        <span>{participantCount}명 참여중</span>
      </div>
    </>
  )
}
