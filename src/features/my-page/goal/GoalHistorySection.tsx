import { LayoutGrid } from 'lucide-react'

import {
  Button,
  GoalCard,
  GoalCardSkeleton,
  Pagination,
} from '@/components/common/ui'
import { useGoalHistoryView } from '@/features/my-page/goal/hooks'
import { toLocalDate } from '@/utils/date'

type GoalHistorySectionProps = {
  selectedDate: string
  onClearSelectedDate: () => void
}

function toHistoryDateRange(startDate: string, endDate: string) {
  return {
    start: toLocalDate(startDate),
    end: toLocalDate(endDate),
  }
}

export function GoalHistorySection({
  selectedDate,
  onClearSelectedDate,
}: GoalHistorySectionProps) {
  const {
    goals,
    safePage,
    totalPages,
    isEmpty,
    isLoading,
    shouldShowPagination,
    setCurrentPage,
  } = useGoalHistoryView(selectedDate)

  const shouldShowSkeleton = isLoading || isEmpty
  const skeletonCount = 4

  return (
    <section className="flex flex-col gap-6 sm:gap-8">
      <div className="flex min-h-16 flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[clamp(1rem,1.6vw,1.375rem)] font-semibold leading-tight text-text-primary">
            {selectedDate} 인증 목표
          </h3>
        </div>
        <Button
          variant="ghost"
          rounded="full"
          aria-label="선택한 날짜 해제"
          leftIcon={<LayoutGrid className="size-3.5" aria-hidden="true" />}
          onClick={onClearSelectedDate}
          className="py-0.5 shrink-0 gap-1.5 px-3 text-xs sm:text-sm text-text-muted hover:bg-transparent hover:text-tab-active-text"
        >
          전체 목표 보기
        </Button>
      </div>

      {shouldShowSkeleton ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <GoalCardSkeleton key={`goal-history-skeleton-${index}`} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {goals.map((goal) => (
            <GoalCard
              key={goal.goalId}
              title={goal.title}
              status={goal.status}
              progressRate={goal.progressRate}
              period={toHistoryDateRange(goal.startDate, goal.endDate)}
              isCheckedToday={goal.isCheckedToday}
            />
          ))}
        </div>
      )}

      {shouldShowPagination && (
        <div className="flex justify-center">
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </section>
  )
}
