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
  const showResult = true

  const hasCheckedOption = options.some((option) => option.checked)
  const isActionDisabled =
    isClosed || isVoted || (mode === VoteViewerMode.MEMBER && !hasCheckedOption)

  const buttonLabel = isClosed
    ? '투표 마감'
    : isVoted
      ? '투표 완료'
      : '투표하기'

  const hasPeriod = Boolean(period?.start && period?.end)

  return (
    <>
      {/* 상단 헤더 */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex w-50">
          <div className="inline-flex items-center justify-center gap-1 px-4 py-1.5">
            {/* 상태 dot (토큰 사용) */}
            <span className="flex size-4 items-center justify-center">
              <span
                className={cn(
                  'inline-block size-2 rounded-full',
                  isClosed ? 'bg-gray-400 dark:bg-white/25' : 'bg-success-500'
                )}
              />
            </span>

            {/* 날짜 */}
            {hasPeriod && (
              <span className="text-xs font-semibold text-text-primary">
                {formatSelectedDate(period ?? { start: null, end: null }, '')}
              </span>
            )}
          </div>
        </div>

        {actionSlot && <div>{actionSlot}</div>}
      </div>

      {/* 투표 컨테이너 */}
      <section
        className={cn(
          'w-full rounded-2xl border border-border-default bg-gray-100 px-3 py-3 dark:bg-white/10 sm:px-3.5 sm:py-3.5',
          isClosed && 'opacity-50'
        )}
      >
        {/* 옵션 리스트 */}
        <div className="flex flex-col gap-2">
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

        {/* 버튼 */}
        <div className="mt-4 flex justify-center sm:mt-5">
          <Button
            type="button"
            variant="primary"
            onClick={onActionClick}
            disabled={isActionDisabled}
            className="h-10 w-full text-md disabled:bg-gray-300 disabled:text-text-muted disabled:hover:bg-gray-300 dark:disabled:bg-white/15 dark:disabled:text-white/40 dark:disabled:hover:bg-white/15 sm:max-w-md"
          >
            {buttonLabel}
          </Button>
        </div>
      </section>

      {/* 참여자 */}
      <div className="mt-3 flex items-center gap-2 text-sm text-text-muted">
        <Users className="h-4 w-4" />
        <span>{participantCount}명 참여중</span>
      </div>
    </>
  )
}
