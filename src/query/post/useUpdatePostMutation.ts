import { useMutation } from '@tanstack/react-query'

import { postApi } from '@/apis/post'
import { type PostFormData, toApiUpdateRequest } from '@/features/post'

type Options = {
  onSuccess: () => void
  onError: () => void
}

// 추후 성공 시 stale한 값 설정 후 캐시 제거 필요
export function useUpdatePostMutation(postId: number, options: Options) {
  return useMutation({
    mutationFn: (data: PostFormData) => {
      const body = toApiUpdateRequest(data)
      return postApi.updatePost(postId, body)
    },
    onSuccess: () => {
      options.onSuccess()
    },
    onError: options.onError,
  })
}
