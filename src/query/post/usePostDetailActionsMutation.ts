import { useMutation, useQueryClient } from '@tanstack/react-query'

import { postApi } from '@/apis/post/post.api'

export function useTogglePostLikeMutation(postId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => postApi.toggleLike(postId),
    onSuccess: () => {
      // 좋아요 변경 후 게시글 상세 데이터를 다시 조회
      queryClient.invalidateQueries({ queryKey: ['postDetail', postId] })
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
    mutationFn: () => postApi.reportPost(postId),
  })
}
