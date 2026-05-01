import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import type { ApiErrorResponse } from '@/apis/api.types'
import { formatError } from '@/apis/api.utils'
import { goalApi } from '@/apis/goal'

type Options = {
  onError?: (message: string) => void
}

const getDeleteGoalErrorMessage = (error: AxiosError<ApiErrorResponse>) => {
  const errorDetail = error.response?.data?.error_detail

  if (!errorDetail) {
    return '목표 삭제에 실패했습니다.'
  }

  return typeof errorDetail === 'string'
    ? errorDetail
    : formatError(errorDetail)
}

export function useDeleteGoalMutation(options: Options = {}) {
  return useMutation({
    mutationFn: (goalId: number) => goalApi.deleteGoal(goalId),
    onError: (error: AxiosError<ApiErrorResponse>) => {
      options.onError?.(getDeleteGoalErrorMessage(error))
    },
  })
}
