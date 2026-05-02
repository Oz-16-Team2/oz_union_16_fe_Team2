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
      // 댓글 리스트 갱신
      queryClient.invalidateQueries({
        queryKey: ['comments', postId],
      })

      // 게시글 상세 다시 가져오기 (commentCount 갱신)
      queryClient.invalidateQueries({
        queryKey: ['postDetail', postId],
      })
    },
  })
}
