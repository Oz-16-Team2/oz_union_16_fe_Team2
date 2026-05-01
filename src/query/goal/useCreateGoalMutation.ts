// - 새로운 목표를 생성하는 API 호출
// - 성공 시 관련 데이터(goals, activitySummary, heatmap) 캐시 무효화 → 최신 데이터로 갱신
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import type { ApiErrorResponse } from '@/apis/api.types'
import { formatError } from '@/apis/api.utils'
import { goalApi } from '@/apis/goal'
import type { CreateGoalRequest } from '@/features/my-page/goal/goal.types'
import { toApiCreateGoalRequest } from '@/features/my-page/goal/mapper'

// 외부에서 성공/실패 시 추가 동작을 주입하기 위한 옵션
type Options = {
  onSuccess?: () => void
  onError?: (message: string) => void
}

const getCreateGoalErrorMessage = (error: AxiosError<ApiErrorResponse>) => {
  const errorDetail = error.response?.data?.error_detail

  if (!errorDetail) {
    return '목표 생성에 실패했습니다.'
  }

  return typeof errorDetail === 'string'
    ? errorDetail
    : formatError(errorDetail)
}

// - 목표 생성 요청을 수행하는 React Query mutation 훅
// - 생성 성공 후 관련 쿼리들을 invalidate 해서 UI를 최신 상태로 맞춤
export function useCreateGoalMutation(options: Options = {}) {
  const queryClient = useQueryClient()

  return useMutation({
    // 📡 mutationFn
    // - 목표 생성 API 호출 (프론트 → API 스펙 형태로 변환 후 요청)
    mutationFn: (data: CreateGoalRequest) =>
      goalApi.createGoal(toApiCreateGoalRequest(data)),

    // - 목표 생성 성공 시 실행
    // - 관련 데이터 캐시를 무효화하여 최신 데이터 재요청
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['goals'] })
      await queryClient.invalidateQueries({ queryKey: ['activitySummary'] })
      await queryClient.invalidateQueries({ queryKey: ['heatmap'] })
      options.onSuccess?.()
    },

    // - 요청 실패 시 외부에서 전달된 에러 핸들러 실행
    onError: (error: AxiosError<ApiErrorResponse>) => {
      options.onError?.(getCreateGoalErrorMessage(error))
    },
  })
}
