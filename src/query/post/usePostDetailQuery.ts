import { useQuery } from '@tanstack/react-query'

import { postApi } from '@/apis/post/post.api'
import { toPostDetailData } from '@/features/post/post.mappers.ts'

export function usePostDetailQuery(postId: number) {
  return useQuery({
    queryKey: ['postDetail', postId],
    queryFn: async () => {
      const res = await postApi.getPost(postId)
      return toPostDetailData(res.data)
    },
    enabled: !!postId,
  })
}
