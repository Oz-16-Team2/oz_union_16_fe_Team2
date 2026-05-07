import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/apis/apiClient'
import type { GetCommentsApiResponse } from '@/features/post/post.api.types'
import { mapCommentApiToComment } from '@/features/post/post.mappers'

export function useCommentsQuery(postId: number, page: number = 1) {
  return useQuery({
    queryKey: ['comments', postId, page],
    queryFn: async () => {
      const { data } = await apiClient.get<GetCommentsApiResponse>(
        `/posts/${postId}/comments`,
        { params: { page, ordering: '-created_at' } }
      )
      return {
        comments: data.results.comments.map(mapCommentApiToComment),
        count: data.results.total_count,
        totalPages: Math.ceil(data.results.total_count / data.results.size),
      }
    },
  })
}
