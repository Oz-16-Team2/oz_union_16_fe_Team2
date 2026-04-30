import { useMutation } from '@tanstack/react-query'

import { goalApi } from '@/apis/goal'

export function useDeleteGoalMutation() {
  return useMutation({
    mutationFn: (goalId: number) => goalApi.deleteGoal(goalId),
  })
}
