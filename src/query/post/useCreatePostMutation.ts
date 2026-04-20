import { useMutation } from '@tanstack/react-query'

import { postApi } from '@/apis/post'
import { type PostFormData, toApiCreateRequest } from '@/features/post'

type Options = {
  onSuccess: () => void
  onError: () => void
}

// 추후 성공 시 stale한 값 설정 후 캐시 제거 필요
export function useCreatePostMutation(options: Options) {
  return useMutation({
    mutationFn: (data: PostFormData) => {
      const body = toApiCreateRequest(data)
      return postApi.createPost(body)
    },
    onSuccess: options.onSuccess,
    onError: options.onError,
  })
}
