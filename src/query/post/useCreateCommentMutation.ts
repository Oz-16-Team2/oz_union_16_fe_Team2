// 댓글 작성 API

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '@/apis/apiClient'
import type {
  CreateCommentApiRequest,
  CreateCommentApiResponse,
} from '@/features/post/post.api.types'
import { mapCommentApiToComment } from '@/features/post/post.mappers'

export function useCreateCommentMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      postId,
      content,
    }: {
      postId: number
      content: string
    }) => {
      const { data } = await apiClient.post<CreateCommentApiResponse>(
        `/posts/${postId}/comments`,
        { content } satisfies CreateCommentApiRequest
      )
      return mapCommentApiToComment(data)
    },

    onSuccess: (_, variables) => {
      //댓글 목록 갱신
      queryClient.invalidateQueries({
        queryKey: ['comments', variables.postId],
      })
      // 게시글 상세 같이 갱신 (commentCount 업데이트됨)
      queryClient.invalidateQueries({
        queryKey: ['postDetail', variables.postId],
      })
    },
  })
}
