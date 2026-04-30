import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import type { ApiErrorResponse } from '@/apis/api.types'
import { formatError } from '@/apis/api.utils'
import { goalApi } from '@/apis/goal'

type GoalCheckErrorResponse = ApiErrorResponse & {
  error_detail:
    | ApiErrorResponse['error_detail']
    | {
        detail?: string[]
      }
}

type Options = {
  onSuccess?: () => void
  onError?: (message: string) => void
}

const getGoalCheckErrorMessage = (
  error: AxiosError<GoalCheckErrorResponse>
) => {
  const errorDetail = error.response?.data?.error_detail

  if (!errorDetail) {
    return '오늘 날짜에만 목표를 체크할 수 있습니다.'
  }

  if (typeof errorDetail === 'string') {
    return errorDetail
  }

  if ('detail' in errorDetail && Array.isArray(errorDetail.detail)) {
    return errorDetail.detail[0] ?? '목표 체크에 실패했습니다.'
  }

  return formatError(errorDetail)
}

export function useCheckGoalMutation(options: Options = {}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (goalId: number) => goalApi.checkGoal(goalId),
    onSuccess: async () => {
      options.onSuccess?.()
      // 토스트는 즉시 노출하고, 목록 재조회는 그 다음에 이어서 처리합니다.
      await queryClient.invalidateQueries({ queryKey: ['goals'] })
      await queryClient.invalidateQueries({ queryKey: ['activitySummary'] })
    },
    onError: (error: AxiosError<GoalCheckErrorResponse>) => {
      options.onError?.(getGoalCheckErrorMessage(error))
    },
  })
}
