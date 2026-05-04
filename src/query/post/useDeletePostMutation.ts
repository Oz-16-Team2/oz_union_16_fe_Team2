import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import type { ApiErrorResponse } from '@/apis/api.types'
import { formatError } from '@/apis/api.utils'
import { postApi } from '@/apis/post'

type Options = {
  onSuccess: () => void
  onError: (message: string) => void
}

export function useDeletePostMutation(options: Options) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: number) => postApi.deletePost(postId),
    onSuccess: () => {
      // invalidateQueries는 캐시에 있는 모든 posts 쿼리를 stale 처리한다.
      // 하지만 목록 조회는 캐싱을 하지 않으므로 (staleTime=0),
      // 현재 마운트된 (화면에 보이는) 쿼리만 즉시 다시 불러오는 refetchQueries를 사용한다.
      queryClient.refetchQueries({ queryKey: ['posts'] })
      options.onSuccess()
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const detail = error.response?.data.error_detail
      options.onError(
        detail ? formatError(detail) : '게시글 삭제에 실패했습니다.'
      )
    },
  })
}
