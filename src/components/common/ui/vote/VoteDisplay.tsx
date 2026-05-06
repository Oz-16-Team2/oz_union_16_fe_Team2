import { Users } from 'lucide-react'

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
  actionSlot,
  onSelectOption,
  onActionClick,
}: VoteDisplayProps) {
  const isClosed = mode === VoteViewerMode.CLOSED
  const isVoted = mode === VoteViewerMode.VOTED
  const showResult = true // 투표 결과 항상 보여주기

  const hasCheckedOption = options.some((option) => option.checked)
  const isActionDisabled =
    isClosed || isVoted || (mode === VoteViewerMode.MEMBER && !hasCheckedOption)

  const buttonLabel = isClosed
    ? '투표 마감'
    : isVoted
      ? '투표 완료'
      : '투표하기'

  const statusLabel = isClosed ? '투표 마감' : '투표 진행중'
  const hasPeriod = Boolean(period?.start && period?.end)

  return (
    <>
      <div className="mb-2 flex items-center gap-2 text-sm">
        <span className="text-text-primary">{statusLabel}</span>

        {hasPeriod && (
          <span className="text-text-primary">
            {formatSelectedDate(period ?? { start: null, end: null }, '')}
          </span>
        )}
      </div>

      <section
        className={cn(
          'relative mx-auto min-h-62 w-full max-w-267.5 rounded-2xl border border-border-default bg-gray-100 px-6 py-6 shadow-card-main dark:bg-white/10',
          isClosed && 'opacity-50'
        )}
      >
        {actionSlot && (
          <div className="absolute top-4 right-4">{actionSlot}</div>
        )}

        <div className="flex flex-col gap-4 pt-8">
          {options.map((option, index) => (
            <VoteOptionItem
              key={option.id}
              option={option}
              index={index}
              isClosed={isClosed || isVoted}
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
