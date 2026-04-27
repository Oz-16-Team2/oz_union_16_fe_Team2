import { useToast } from '@/components/common/ui'
import {
  useCheckGoalMutation,
  useCreateGoalMutation,
  useDeleteGoalMutation,
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
    onError: () => {
      toast.error('목표 생성에 실패했습니다.')
    },
  })

  const deleteGoalMutation = useDeleteGoalMutation({
    onSuccess: () => {
      toast.success('목표를 삭제했습니다.')
    },
    onError: () => {
      toast.error('목표 삭제에 실패했습니다.')
    },
  })

  const checkGoalMutation = useCheckGoalMutation({
    onSuccess: () => {
      toast.success('오늘의 목표를 체크했습니다.')
    },
    onError: () => {
      toast.error('오늘 날짜에만 목표를 체크할 수 있습니다.')
    },
  })

  const updateGoalMutation = useUpdateGoalMutation({
    onSuccess: () => {
      onUpdateSuccess?.()
      toast.success('목표를 수정했습니다.')
    },
    onError: () => {
      toast.error('목표 수정에 실패했습니다.')
    },
  })

  return {
    createGoal: createGoalMutation.mutate,
    deleteGoal: deleteGoalMutation.mutate,
    checkGoal: checkGoalMutation.mutate,
    updateGoal: updateGoalMutation.mutate,
  }
}
