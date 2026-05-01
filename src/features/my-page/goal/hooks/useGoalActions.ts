import { useToast } from '@/components/common/ui'
import {
  useCheckGoalMutation,
  useCreateGoalMutation,
  useUpdateGoalMutation,
} from '@/query/goal'

type UseGoalActionsOptions = {
  onCreateSuccess?: () => void
  onUpdateSuccess?: () => void
}

export function useGoalActions({
  onCreateSuccess,
  onUpdateSuccess,
}: UseGoalActionsOptions = {}) {
  const toast = useToast()

  const createGoalMutation = useCreateGoalMutation({
    onSuccess: () => {
      onCreateSuccess?.()
      toast.success('목표를 생성했습니다.')
    },
    onError: (message) => {
      toast.error(message)
    },
  })

  const checkGoalMutation = useCheckGoalMutation({
    onSuccess: () => {
      toast.success('오늘의 목표를 체크했습니다.')
    },
    onError: (message) => {
      toast.error(message)
    },
  })

  const updateGoalMutation = useUpdateGoalMutation({
    onSuccess: () => {
      onUpdateSuccess?.()
      toast.success('목표를 수정했습니다.')
    },
    onError: (message) => {
      toast.error(message)
    },
  })

  return {
    createGoal: createGoalMutation.mutate,
    checkGoal: checkGoalMutation.mutate,
    updateGoal: updateGoalMutation.mutate,
  }
}
