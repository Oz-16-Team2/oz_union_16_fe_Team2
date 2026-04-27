import { useMutation, useQueryClient } from '@tanstack/react-query'

import { goalApi } from '@/apis/goal'
import type { ApiGoalResponse } from '@/features/my-page/components/goal/goal.api.types'

type Options = {
  onSuccess?: () => void
  onError?: () => void
}

export function useCheckGoalMutation(options: Options = {}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (goalId: number) => goalApi.checkGoal(goalId),
    onSuccess: async (response) => {
      const checkedGoalId = response.data.goal_id
      const checkedProgressRate = response.data.progress_rate

      queryClient.setQueryData<ApiGoalResponse[]>(['goals'], (current = []) =>
        current.map((goal) =>
          goal.goal_id === checkedGoalId
            ? {
                ...goal,
                progressRate: checkedProgressRate,
                progress_rate: checkedProgressRate,
                isCheckedToday: true,
                is_checked_today: true,
              }
            : goal
        )
      )

      await queryClient.invalidateQueries({ queryKey: ['goals'] })
      options.onSuccess?.()
    },
    onError: () => {
      options.onError?.()
    },
  })
}
