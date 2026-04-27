import { apiClient } from '@/apis/apiClient'

import type {
  ApiCheckGoalResponse,
  ApiCreateGoalRequest,
  ApiCreateGoalResponse,
  ApiDeleteGoalResponse,
  ApiGoalListParams,
  ApiGoalListResponse,
  ApiUpdateGoalRequest,
  ApiUpdateGoalResponse,
} from '../../features/my-page/components/goal/goal.api.types'
import { GOAL_ENDPOINTS } from './endpoint'

export const goalApi = {
  // 목표 목록 조회 (query params: status, page, size 등)
  getGoals: (params?: ApiGoalListParams) =>
    apiClient.get<ApiGoalListResponse>(GOAL_ENDPOINTS.goals, { params }),

  // 목표 생성 (body: snake_case 기준으로 서버에 전달)
  createGoal: (body: ApiCreateGoalRequest) =>
    apiClient.post<ApiCreateGoalResponse>(GOAL_ENDPOINTS.goals, body),

  // 목표 수정 (path param + body 함께 사용, goal_id를 body에도 포함)
  updateGoal: (goalId: number, body: ApiUpdateGoalRequest) =>
    apiClient.patch<ApiUpdateGoalResponse>(GOAL_ENDPOINTS.goal(goalId), {
      ...body,
      goal_id: goalId,
    }),

  // 목표 삭제 (goalId는 path param으로 전달)
  deleteGoal: (goalId: number) =>
    apiClient.delete<ApiDeleteGoalResponse>(GOAL_ENDPOINTS.goal(goalId)),

  // 목표 체크/완료 처리 (해당 goalId에 대해 완료 상태 변경)
  checkGoal: (goalId: number) =>
    apiClient.post<ApiCheckGoalResponse>(GOAL_ENDPOINTS.goalCheck(goalId)),
} as const
