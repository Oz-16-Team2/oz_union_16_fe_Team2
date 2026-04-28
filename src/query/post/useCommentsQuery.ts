import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/apis/apiClient'
import type { GetCommentsApiResponse } from '@/features/post/post.api.types'
import { mapCommentsApiToComments } from '@/features/post/post.mappers'

export function useCommentsQuery(postId: number) {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const { data } = await apiClient.get<GetCommentsApiResponse>(
        `/posts/${postId}/comments`
      )

      return mapCommentsApiToComments(data)
    },
  })
}
