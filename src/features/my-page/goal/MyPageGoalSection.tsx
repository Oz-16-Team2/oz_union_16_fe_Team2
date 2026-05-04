import { useState } from 'react'

import { Plus, RotateCcw } from 'lucide-react'

import {
  Button,
  Calendar,
  EmptyState,
  GoalCard,
  GoalCardEdit,
  GoalCardSkeleton,
  Pagination,
  TabButton,
} from '@/components/common/ui'
import { toDateRange } from '@/utils/date'

import { GoalHistorySection } from './GoalHistorySection'
import {
  GOAL_FILTERS,
  useGoalActions,
  useGoalDeleteFlow,
  useGoalFormHandlers,
  useGoalListView,
} from './hooks'

type MyPageGoalSectionProps = {
  selectedDate?: string | null
  selectedDateCheckCount: number
  onClearSelectedDate: () => void
}

function GoalListSection() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingGoalId, setEditingGoalId] = useState<number | null>(null)

  const {
    activeFilter,
    selectedPeriod,
    currentPage,
    goals,
    safePage,
    totalPages,
    isEmpty,
    isLoading,
    emptyStateMessage,
    shouldShowPagination,
    setFilter,
    setPeriod,
    resetFilters,
    setCurrentPage,
  } = useGoalListView()
  const { createGoal, checkGoal, isCreatingGoal, isUpdatingGoal, updateGoal } =
    useGoalActions({
      onCreateSuccess: () => {
        setIsCreateOpen(false)
      },
      onUpdateSuccess: () => {
        setEditingGoalId(null)
      },
    })
  const { handleCreateSubmit, handleEditSubmit } = useGoalFormHandlers({
    createGoal,
    updateGoal,
  })
  const { handleDeleteGoal } = useGoalDeleteFlow({
    currentPage,
    goalCountOnPage: goals.length,
    setCurrentPage,
  })
  const skeletonCount = isCreateOpen ? 7 : 8

  return (
    <section className="flex flex-col gap-8">
      <div className="flex min-h-16 flex-wrap items-start justify-between gap-x-3 gap-y-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-x-[clamp(0.25rem,1vw,0.5rem)] gap-y-2 sm:gap-0.5">
            {GOAL_FILTERS.map((filter) => (
              <TabButton
                key={filter}
                type="button"
                isActive={activeFilter === filter}
                onClick={() => setFilter(filter)}
                className="min-w-0 whitespace-nowrap px-2 py-1 text-xs sm:min-w-18 sm:text-sm"
              >
                {filter}
              </TabButton>
            ))}
            <span
              className="mt-1 hidden text-text-muted/35 min-[721px]:inline"
              aria-hidden="true"
            >
              |
            </span>
            <div className="w-fit shrink-0">
              <Calendar
                className="w-full sm:w-fit"
                panelClassName="left-auto right-0 translate-x-16 sm:left-0 sm:right-auto"
                label="기간 설정"
                ariaLabel="기간 설정"
                hideLabelOnMobile
                // 마이페이지 목표 필터는 과거 기간 조회가 가능해야 하므로 제한을 해제합니다.
                allowPastDates
                value={selectedPeriod}
                onChange={(value) =>
                  setPeriod(value ?? { start: null, end: null })
                }
              />
            </div>
            <span
              className="mt-1 hidden text-text-muted/35 min-[721px]:inline"
              aria-hidden="true"
            >
              |
            </span>
            <Button
              variant="ghost"
              rounded="full"
              aria-label="필터 초기화"
              leftIcon={<RotateCcw className="size-4" aria-hidden="true" />}
              onClick={resetFilters}
              className="h-8 shrink-0 px-2 text-sm text-text-muted hover:bg-transparent hover:text-tab-active-text sm:px-3"
            >
              <span className="hidden min-[721px]:inline">초기화</span>
            </Button>
          </div>
        </div>

        <div className="flex basis-full justify-end sm:basis-auto">
          <Button
            size="md"
            rounded="full"
            leftIcon={<Plus className="size-4" aria-hidden="true" />}
            onClick={() => setIsCreateOpen(true)}
            className="shrink-0 whitespace-nowrap"
          >
            목표 생성
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isCreateOpen ? (
            <GoalCardEdit
              key="create-goal"
              mode="create"
              initialTitle=""
              initialDateRange={{ start: null, end: null }}
              initialProgressRate={0}
              initialStatus="in_progress"
              isSubmitting={isCreatingGoal}
              onClose={() => setIsCreateOpen(false)}
              onSubmit={handleCreateSubmit}
            />
          ) : null}
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <GoalCardSkeleton key={`goal-skeleton-${index}`} />
          ))}
        </div>
      ) : isEmpty && !isCreateOpen ? (
        <EmptyState
          title={emptyStateMessage.title}
          description={emptyStateMessage.description}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isCreateOpen && (
            <GoalCardEdit
              key="create-goal"
              mode="create"
              initialTitle=""
              initialDateRange={{ start: null, end: null }}
              initialProgressRate={0}
              initialStatus="in_progress"
              isSubmitting={isCreatingGoal}
              onClose={() => setIsCreateOpen(false)}
              onSubmit={handleCreateSubmit}
            />
          )}
          {/* 서버 페이지네이션 결과만 렌더링해서 현재 페이지와 API 응답을 일치시킵니다. */}
          {goals.map((goal) => {
            const isEditing = editingGoalId === goal.goalId

            return isEditing ? (
              <GoalCardEdit
                key={`edit-${goal.goalId}`}
                mode="edit"
                initialTitle={goal.title}
                initialDateRange={toDateRange(goal)}
                initialProgressRate={goal.progressRate}
                initialStatus={goal.status}
                isSubmitting={isUpdatingGoal}
                onClose={() => setEditingGoalId(null)}
                onSubmit={({ title }) =>
                  handleEditSubmit({
                    goalId: goal.goalId,
                    title,
                  })
                }
              />
            ) : (
              <GoalCard
                key={goal.goalId}
                title={goal.title}
                status={goal.status}
                progressRate={goal.progressRate}
                period={toDateRange(goal)}
                isCheckedToday={goal.isCheckedToday}
                onCheck={() => checkGoal(goal.goalId)}
                onEdit={() => setEditingGoalId(goal.goalId)}
                onDelete={() => void handleDeleteGoal(goal.goalId)}
              />
            )
          })}
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

export function MyPageGoalSection({
  selectedDate,
  selectedDateCheckCount,
  onClearSelectedDate,
}: MyPageGoalSectionProps) {
  return selectedDate && selectedDateCheckCount > 0 ? (
    <GoalHistorySection
      selectedDate={selectedDate}
      onClearSelectedDate={onClearSelectedDate}
    />
  ) : (
    <GoalListSection />
  )
}
