// 댓글 삭제 API

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '@/apis/apiClient'
import { POST_ENDPOINTS } from '@/apis/post'

export function useDeleteCommentMutation(postId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (commentId: number) =>
      apiClient.delete(POST_ENDPOINTS.comment(postId, commentId)),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', postId],
      })
    },
  })
}
