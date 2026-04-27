import { useQuery } from '@tanstack/react-query'

import { goalApi } from '@/apis/goal'
import type { Goal } from '@/features/my-page/components/goal/goal.types'
import { mapGoal } from '@/features/my-page/components/goal/mapper'

// 전체 목표 데이터를 가져오는 함수
// 현재는 "필터 기준 페이지네이션"을 위해 전체 데이터를 프론트에서 보유해야 하는 구조
async function fetchAllGoals(): Promise<Goal[]> {
  //  먼저 기본 요청 (기본 size로 일부 데이터 + 전체 count 확인)
  const firstResponse = await goalApi.getGoals()
  const { count, results } = firstResponse.data

  // 만약 전체 데이터 개수가 현재 받아온 개수보다 작거나 같으면
  // → 이미 전체 데이터를 받은 상태이므로 그대로 사용
  if (count <= results.length) {
    return results.map(mapGoal)
  }

  // 전체 데이터를 다 못 가져온 경우
  // → count를 size로 다시 요청해서 전체 데이터를 한 번에 가져옴
  const allResponse = await goalApi.getGoals({ page: 1, size: count })
  return allResponse.data.results.map(mapGoal)
}

// 전체 목표 데이터를 캐싱하는 query
// 페이지네이션은 서버가 아니라 "프론트에서 필터 + slice"로 처리할 예정
// (현재 구조: 필터 기준 페이지네이션을 위해 전체 데이터를 들고 있는 방식)
export function useGoalsQuery() {
  return useQuery<Goal[]>({
    queryKey: ['goals'],
    queryFn: fetchAllGoals,
  })
}
