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
  const normalizeGoalCheckErrorMessage = (message: string) => {
    if (message.includes('이미') && message.includes('인증')) {
      return '오늘은 이미 인증했습니다.'
    }

    if (
      message.includes('오늘') &&
      (message.includes('날짜에만') || message.includes('만 가능합니다'))
    ) {
      return '오늘 날짜에만 목표를 체크할 수 있습니다.'
    }

    return message
  }

  const errorDetail = error.response?.data?.error_detail

  if (!errorDetail) {
    return '목표 체크에 실패했습니다.'
  }

  if (typeof errorDetail === 'string') {
    return normalizeGoalCheckErrorMessage(errorDetail)
  }

  if ('detail' in errorDetail && Array.isArray(errorDetail.detail)) {
    return normalizeGoalCheckErrorMessage(
      errorDetail.detail[0] ?? '목표 체크에 실패했습니다.'
    )
  }

  return normalizeGoalCheckErrorMessage(formatError(errorDetail))
}

export function useCheckGoalMutation(options: Options = {}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (goalId: number) => goalApi.checkGoal(goalId),
    onSuccess: async () => {
      options.onSuccess?.()

      // - goals: 목표 목록 (체크 상태 반영)
      // - activitySummary: 전체 통계/완료 개수 갱신
      // - heatmap: 잔디(날짜별 체크 횟수) 최신화
      await queryClient.invalidateQueries({ queryKey: ['goals'] })
      await queryClient.invalidateQueries({ queryKey: ['activitySummary'] })
      await queryClient.invalidateQueries({ queryKey: ['heatmap'] })
    },
    onError: (error: AxiosError<GoalCheckErrorResponse>) => {
      options.onError?.(getGoalCheckErrorMessage(error))
    },
  })
}
