import { useMutation, useQueryClient } from '@tanstack/react-query'

import { postApi } from '@/apis/post/post.api'
import type { PostDetailData } from '@/features/post/post.types'

type UseTogglePostLikeMutationParams = {
  postId: number
  isLiked: boolean
  likeCount: number
}

export function useTogglePostLikeMutation({
  postId,
  isLiked,
  likeCount,
}: UseTogglePostLikeMutationParams) {
  const queryClient = useQueryClient()
  const nextIsLiked = !isLiked
  const nextLikeCount = Math.max(0, likeCount + (isLiked ? -1 : 1))

  return useMutation({
    mutationFn: () => postApi.toggleLike(postId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['postDetail', postId] })

      const previousPostDetail = queryClient.getQueryData<PostDetailData>([
        'postDetail',
        postId,
      ])

      queryClient.setQueryData<PostDetailData>(
        ['postDetail', postId],
        (post) =>
          post
            ? {
                ...post,
                isLiked: nextIsLiked,
                likeCount: nextLikeCount,
              }
            : post
      )

      return { previousPostDetail }
    },
    onError: (_error, _variables, context) => {
      if (!context) return

      queryClient.setQueryData(
        ['postDetail', postId],
        context.previousPostDetail
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['postDetail', postId] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export function useTogglePostScrapMutation({
  postId,
  isScrapped,
}: {
  postId: number
  isScrapped: boolean
}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () =>
      isScrapped ? postApi.unscrapPost(postId) : postApi.scrapPost(postId),
    onSuccess: () => {
      // 스크랩 상태 변경 후 게시글 상세 데이터를 다시 조회
      queryClient.invalidateQueries({ queryKey: ['postDetail', postId] })
    },
  })
}

export function useReportPostMutation(postId: number) {
  return useMutation({
    mutationFn: (body: { reason_type: string; reason_detail: string }) =>
      postApi.reportPost(postId, body),
  })
}
