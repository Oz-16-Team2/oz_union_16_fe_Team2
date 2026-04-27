import { useMutation, useQueryClient } from '@tanstack/react-query'

import { goalApi } from '@/apis/goal'
import type { CreateGoalRequest } from '@/features/my-page/components/goal/goal.types'
import { toApiCreateGoalRequest } from '@/features/my-page/components/goal/mapper'

type Options = {
  onSuccess?: () => void
  onError?: () => void
}

export function useCreateGoalMutation(options: Options = {}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateGoalRequest) =>
      goalApi.createGoal(toApiCreateGoalRequest(data)),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['goals'] })
      options.onSuccess?.()
    },
    onError: () => {
      options.onError?.()
    },
  })
}
