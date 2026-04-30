//댓글 수정 API
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '@/apis/apiClient'
import { POST_ENDPOINTS } from '@/apis/post'

export function useUpdateCommentMutation(postId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: number
      content: string
    }) =>
      apiClient.patch(POST_ENDPOINTS.comment(postId, commentId), {
        content,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', postId],
      })
    },
  })
}
