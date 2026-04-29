// 댓글 좋아요 토글 API
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '@/apis/apiClient'
import { POST_ENDPOINTS } from '@/apis/post'

export function useToggleCommentLikeMutation(postId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      commentId,
      isLiked,
    }: {
      commentId: number
      isLiked: boolean
    }) => {
      if (isLiked) {
        return apiClient.delete(POST_ENDPOINTS.commentLikes(commentId))
      }
      return apiClient.post(POST_ENDPOINTS.commentLikes(commentId))
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', postId],
      })
    },
  })
}
