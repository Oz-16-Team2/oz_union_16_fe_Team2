import { useMutation, useQueryClient } from '@tanstack/react-query'

import { postApi } from '@/apis/post/post.api'

type UpdateVoteBody = {
  options: string[]
  start_at?: string
  end_at?: string
}

type UpdateVoteVariables = {
  voteId: number
  body: UpdateVoteBody
}

export function useUpdateVoteMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ voteId, body }: UpdateVoteVariables) =>
      postApi.updateVote(voteId, body),

    onSuccess: (_, variables) => {
      // 투표 수정 후 전체 리패치
      queryClient.invalidateQueries({
        queryKey: ['postDetail'],
      })

      queryClient.invalidateQueries({
        queryKey: ['vote', variables.voteId],
      })
    },
  })
}
