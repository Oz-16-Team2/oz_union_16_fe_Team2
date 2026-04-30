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

<<<<<<< HEAD
// TODO: 포스트 디테일 페이지에서 신고가 필요할 때는 src/query/post에서 useReportPostMutation을 import해서 사용하면 됩니다.

// export function useReportPostMutation(postId: number) {
//   return useMutation({
//     mutationFn: (body: { reason_type: string; reason_detail: string }) =>
//       postApi.reportPost(postId, body),
//   })
// }
=======
export function useDeletePostMutation(postId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => postApi.deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['postDetail', postId] })
    },
  })
}
>>>>>>> 84abc54 (feat: connect post detail api (#138))
