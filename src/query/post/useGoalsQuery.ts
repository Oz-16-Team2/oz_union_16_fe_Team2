import { useQuery } from '@tanstack/react-query'

import { postApi } from '@/apis/post'
import { toGoalOption } from '@/features/post'

export function useGoalsQuery() {
  return useQuery({
    queryKey: ['goals'], // staleTime, gcTime 설정 필요
    queryFn: () =>
      postApi.getGoals().then((res) => res.data.results.map(toGoalOption)),
  })
}
