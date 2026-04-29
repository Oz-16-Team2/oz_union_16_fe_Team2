import { useMutation } from '@tanstack/react-query'

import { postApi } from '@/apis/post'
import { type PostFormData, toApiCreateRequest } from '@/features/post'

type Options = {
  onSuccess: () => void
  onError: () => void
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
    onError: options.onError,
  })
}
