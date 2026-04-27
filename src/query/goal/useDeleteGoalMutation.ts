import { useMutation, useQueryClient } from '@tanstack/react-query'

import { goalApi } from '@/apis/goal'

type Options = {
  onSuccess?: () => void
  onError?: () => void
}

export function useDeleteGoalMutation(options: Options = {}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (goalId: number) => goalApi.deleteGoal(goalId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['goals'] })
      options.onSuccess?.()
    },
    onError: () => {
      options.onError?.()
    },
  })
}
