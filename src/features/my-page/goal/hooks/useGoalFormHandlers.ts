import type { DateRange } from '@/components/common/ui/calendar/Calendar.type'
import type {
  CreateGoalRequest,
  UpdateGoalRequest,
} from '@/features/my-page/goal/goal.types'
import { toLocalDateString } from '@/utils/date'

type UseGoalFormHandlersParams = {
  createGoal: (data: CreateGoalRequest) => void
  updateGoal: (params: { goalId: number; data: UpdateGoalRequest }) => void
}

export function useGoalFormHandlers({
  createGoal,
  updateGoal,
}: UseGoalFormHandlersParams) {
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

  return {
    handleCreateSubmit,
    handleEditSubmit,
  }
}
