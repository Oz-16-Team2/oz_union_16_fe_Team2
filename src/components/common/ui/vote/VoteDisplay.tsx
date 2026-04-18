import { CalendarDays, Users } from 'lucide-react'

import { Button } from '@/components/common/ui'
import { formatSelectedDate } from '@/components/common/ui/calendar/Calendar.util'
import { cn } from '@/utils/cn'

import { VoteOptionItem } from './components/VoteOptionItem'
import { type VoteDisplayProps, VoteViewerMode } from './Vote.type'

export function VoteDisplay({
  mode,
  options,
  participantCount = 0,
  period,
  actionLabel,
  showMoreButton = false,
  actionSlot,
  onSelectOption,
  onActionClick,
}: VoteDisplayProps) {
  const isClosed = mode === VoteViewerMode.CLOSED
  const isVoted = mode === VoteViewerMode.VOTED
  const showResult = isVoted || isClosed

  const hasCheckedOption = options.some((option) => option.checked)
  const isActionDisabled =
    isClosed || (mode === VoteViewerMode.MEMBER && !hasCheckedOption)

  const buttonLabel = isClosed ? '투표 마감' : (actionLabel ?? '투표하기')
  const statusLabel = isClosed ? '투표 마감' : '투표 진행중'
  const hasPeriod = Boolean(period?.start && period?.end)

  return (
    <>
      <div className="mb-2 flex items-center gap-2 text-sm">
        <span className="text-text-muted">{statusLabel}</span>

        {hasPeriod && (
          <>
            <CalendarDays className="h-4 w-4 text-text-muted" />
            <span className="text-text-primary">
              {formatSelectedDate(period ?? { start: null, end: null }, '')}
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
        {(showMoreButton || actionSlot) && actionSlot && (
          <div className="mb-4 flex justify-end">{actionSlot}</div>
        )}

        <div className="flex flex-col gap-4">
          {options.map((option, index) => (
            <VoteOptionItem
              key={option.id}
              option={option}
              index={index}
              isClosed={isClosed}
              showResult={showResult}
              onSelectOption={onSelectOption}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            type="button"
            variant="primary"
            onClick={onActionClick}
            disabled={isActionDisabled}
            className="h-10 w-full max-w-md text-md"
          >
            {buttonLabel}
          </Button>
        </div>
      </section>

      <div className="mt-4 flex items-center gap-2 text-sm text-text-muted">
        <Users className="h-4 w-4" />
        <span>{participantCount}명 참여중</span>
      </div>
    </>
  )
}
