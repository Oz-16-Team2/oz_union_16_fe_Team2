import { useMutation, useQueryClient } from '@tanstack/react-query'

import { goalApi } from '@/apis/goal'
import type { UpdateGoalRequest } from '@/features/my-page/components/goal/goal.types'
import { toApiUpdateGoalRequest } from '@/features/my-page/components/goal/mapper'

// 외부에서 mutation 성공/실패 시 실행할 콜백 옵션
type Options = {
  onSuccess?: () => void
  onError?: () => void
}

// mutation에 전달되는 변수 타입 (수정할 목표 ID + 수정 데이터)
type UpdateGoalVariables = {
  goalId: number
  data: UpdateGoalRequest
}

// 목표 수정 mutation 훅
// goalId와 수정할 데이터를 받아 API 호출 → 성공 시 goals 목록 재조회
export function useUpdateGoalMutation(options: Options = {}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ goalId, data }: UpdateGoalVariables) =>
      goalApi.updateGoal(goalId, toApiUpdateGoalRequest(goalId, data)),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['goals'] })
      options.onSuccess?.()
    },
    onError: () => {
      // 수정 실패 시 외부에서 전달한 에러 콜백 실행
      options.onError?.()
    },
  })
}
