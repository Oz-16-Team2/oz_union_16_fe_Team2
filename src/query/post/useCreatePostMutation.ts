import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import type { ApiErrorResponse } from '@/apis/api.types'
import { formatError } from '@/apis/api.utils'
import { postApi } from '@/apis/post'
import { type PostFormData, toApiCreateRequest } from '@/features/post'

type Options = {
  onSuccess: () => void
  onError: (message: string) => void
}

export function useCreatePostMutation(options: Options) {
  return useMutation({
    mutationFn: (data: PostFormData) => {
      const body = toApiCreateRequest(data)
      return postApi.createPost(body)
    },
    // 생성 성공 후 navigate('/')로 이동하면 PostListSection이 새로 마운트되면서
    // staleTime=0 기본값에 의해 목록을 자동으로 다시 fetch한다.
    // 별도 invalidate 없이도 최신 목록을 보여줄 수 있다.
    onSuccess: options.onSuccess,
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const detail = error.response?.data.error_detail
      options.onError(
        detail ? formatError(detail) : '게시글 생성에 실패했습니다.'
      )
    },
  })
}
