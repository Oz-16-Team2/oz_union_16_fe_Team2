import { useQuery } from '@tanstack/react-query'

import { goalApi } from '@/apis/goal'
import type { ApiGoalListParams } from '@/features/my-page/components/goal/goal.api.types'
import type { Goal } from '@/features/my-page/components/goal/goal.types'
import { mapGoal } from '@/features/my-page/components/goal/mapper'

export const GOALS_PAGE_SIZE = 8

export type GoalListQueryData = {
  count: number
  next: string | null
  previous: string | null
  goals: Goal[]
}

// 서버 페이지네이션 응답을 그대로 사용하되 results만 화면 전용 타입으로 변환합니다.
async function fetchGoals(
  params: ApiGoalListParams
): Promise<GoalListQueryData> {
  const response = await goalApi.getGoals(params)
  const { count, next, previous, results } = response.data

  return {
    count,
    next,
    previous,
    goals: results.map(mapGoal),
  }
}

// 페이지/필터 조합별로 별도 캐시되도록 queryKey에 params를 포함합니다.
export function useGoalsQuery(params: ApiGoalListParams) {
  return useQuery<GoalListQueryData>({
    // 기간 필터(start/end)도 queryKey에 포함해야 날짜 변경 시 새 조회가 발생합니다.
    queryKey: [
      'goals',
      params.page,
      params.size,
      params.status,
      params.start,
      params.end,
    ],
    queryFn: () => fetchGoals(params),
  })
}
