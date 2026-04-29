import { useState } from 'react'

import { Plus, RotateCcw } from 'lucide-react'

import {
  Button,
  Calendar,
  EmptyState,
  GoalCard,
  GoalCardEdit,
  Pagination,
  TabButton,
} from '@/components/common/ui'
import type { DateRange } from '@/components/common/ui/calendar/Calendar.type'
import { useGoalActions } from '@/features/my-page/hook/useGoalActions'
import {
  GOAL_FILTERS,
  useGoalListView,
} from '@/features/my-page/hook/useGoalListView'
import { useGoalsQuery } from '@/query/goal'
import { toDateRange, toLocalDateString } from '@/utils/date'

export function MyPageGoalSection() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingGoalId, setEditingGoalId] = useState<number | null>(null)

  const { data: goals = [] } = useGoalsQuery()
  const {
    activeFilter,
    selectedPeriod,
    safePage,
    pageGoals,
    totalPages,
    isEmpty,
    emptyStateMessage,
    shouldShowPagination,
    setFilter,
    setPeriod,
    resetFilters,
    setCurrentPage,
  } = useGoalListView(goals)
  const { createGoal, deleteGoal, checkGoal, updateGoal } = useGoalActions({
    onCreateSuccess: () => {
      setIsCreateOpen(false)
    },
    onUpdateSuccess: () => {
      setEditingGoalId(null)
    },
  })

  const handleEditSubmit = ({
    goalId,
    title,
  }: {
    goalId: number
    title: string
  }) => {
    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      return
    }

    updateGoal({
      goalId,
      data: {
        title: trimmedTitle,
      },
    })
  }

  const handleCreateSubmit = ({
    title,
    dateRange,
  }: {
    title: string
    dateRange: DateRange
  }) => {
    const trimmedTitle = title.trim()
    const startDate = dateRange.start
      ? toLocalDateString(dateRange.start)
      : undefined
    // 하루짜리 목표는 종료일을 따로 고르지 않아도 시작일과 동일하게 처리합니다.
    const endDate = dateRange.end ? toLocalDateString(dateRange.end) : startDate

    if (!trimmedTitle || !startDate || !endDate) {
      return
    }

    createGoal({
      title: trimmedTitle,
      startDate,
      endDate,
    })
  }

  return (
    <section className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-0.5">
          {GOAL_FILTERS.map((filter) => (
            <TabButton
              key={filter}
              type="button"
              isActive={activeFilter === filter}
              onClick={() => setFilter(filter)}
              className="px-2 py-1"
            >
              {filter}
            </TabButton>
          ))}
          <span className="mt-1 text-text-muted/35" aria-hidden="true">
            |
          </span>
          <div className="w-fit">
            <Calendar
              className="w-fit"
              label="기간 설정"
              value={selectedPeriod}
              onChange={(value) =>
                setPeriod(value ?? { start: null, end: null })
              }
            />
          </div>
          <span className="mt-1 text-text-muted/35" aria-hidden="true">
            |
          </span>
          <Button
            variant="ghost"
            rounded="full"
            leftIcon={<RotateCcw className="size-4" aria-hidden="true" />}
            onClick={resetFilters}
            className="h-8 px-3 text-sm text-text-muted hover:bg-transparent hover:text-tab-active-text"
          >
            초기화
          </Button>
        </div>

        <Button
          size="md"
          rounded="full"
          leftIcon={<Plus className="size-4" aria-hidden="true" />}
          onClick={() => setIsCreateOpen(true)}
          className="w-fit"
        >
          목표 생성
        </Button>
      </div>

      {isEmpty && !isCreateOpen ? (
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
              onClose={() => setIsCreateOpen(false)}
              onSubmit={handleCreateSubmit}
            />
          )}
          {pageGoals.map((goal) => {
            const isEditing = editingGoalId === goal.goalId

            return isEditing ? (
              <GoalCardEdit
                key={`edit-${goal.goalId}`}
                mode="edit"
                initialTitle={goal.title}
                initialDateRange={toDateRange(goal)}
                initialProgressRate={goal.progressRate}
                initialStatus={goal.status}
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
                onCheck={() => {
                  if (goal.isCheckedToday) return
                  checkGoal(goal.goalId)
                }}
                onEdit={() => setEditingGoalId(goal.goalId)}
                onDelete={() => deleteGoal(goal.goalId)}
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
