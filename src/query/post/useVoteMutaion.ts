import { useMutation, useQueryClient } from '@tanstack/react-query'

import { postApi } from '@/apis/post/post.api'

type VoteMutationParams = {
  postId: number
  voteId: number
  voteOptionId: number
}

export function useVoteMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ voteId, voteOptionId }: VoteMutationParams) =>
      postApi.vote(voteId, { vote_option_id: voteOptionId }),
    // 투표 참여 후 상세페이지 데이터 최신화
    // - 게시글 상세 (likeCount 등 반영)
    // - 투표 결과 (득표율, 참여 여부 반영)
    // - 댓글 (동시 참여 상황 고려하여 최신화)
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['postDetail', variables.postId],
      })

      queryClient.invalidateQueries({
        queryKey: ['vote', variables.voteId],
      })

      queryClient.invalidateQueries({
        queryKey: ['comments', variables.postId],
      })
    },
  })
}
