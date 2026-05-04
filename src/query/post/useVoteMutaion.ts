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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['postDetail', variables.postId],
      })

      queryClient.invalidateQueries({
        queryKey: ['vote', variables.voteId],
      })
    },
  })
}
