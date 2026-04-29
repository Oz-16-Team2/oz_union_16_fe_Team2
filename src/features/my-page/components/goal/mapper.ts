import type {
  ApiCreateGoalRequest,
  ApiGoalResponse,
  ApiUpdateGoalRequest,
} from '@/apis/goal'

import type { CreateGoalRequest, Goal, UpdateGoalRequest } from './goal.types'

const normalizeGoalStatus = (status: string): Goal['status'] => {
  switch (status) {
    case 'completed':
      return 'completed'
    case 'failed':
      return 'failed'
    default:
      return 'in_progress'
  }
}

const readGoalDate = (
  goal: ApiGoalResponse,
  camelKey: 'startDate' | 'endDate',
  snakeKey: 'start_date' | 'end_date'
) => goal[camelKey] ?? goal[snakeKey] ?? ''

const readGoalProgress = (goal: ApiGoalResponse) =>
  goal.progressRate ?? goal.progress_rate ?? 0

const readGoalCheckedToday = (goal: ApiGoalResponse) =>
  goal.isCheckedToday ?? goal.is_checked_today ?? false

// API 응답(snake_case)을 프론트에서 사용하는 camelCase 타입으로 변환
export const mapGoal = (apiGoal: ApiGoalResponse): Goal => {
  return {
    goalId: apiGoal.goal_id,
    title: apiGoal.title,
    startDate: readGoalDate(apiGoal, 'startDate', 'start_date'),
    endDate: readGoalDate(apiGoal, 'endDate', 'end_date'),
    status: normalizeGoalStatus(apiGoal.status),
    createdAt: apiGoal.createdAt ?? apiGoal.created_at ?? '',
    progressRate: readGoalProgress(apiGoal),
    isCheckedToday: readGoalCheckedToday(apiGoal),
  }
}

// 목표 생성 시 서버로 보낼 데이터 형태로 매핑
export const toApiCreateGoalRequest = (
  goal: CreateGoalRequest
): ApiCreateGoalRequest => {
  return {
    title: goal.title,
    start_date: goal.startDate,
    end_date: goal.endDate,
  }
}

// 목표 수정 시 변경된 필드만 선택적으로 포함하여 서버에 전달
export const toApiUpdateGoalRequest = (
  goalId: number,
  goal: UpdateGoalRequest
): ApiUpdateGoalRequest => {
  return {
    goal_id: goalId,
    ...(goal.title !== undefined && { title: goal.title }),
  }
}
