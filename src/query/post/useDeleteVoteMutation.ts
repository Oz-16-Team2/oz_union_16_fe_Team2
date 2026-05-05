import { useMutation, useQueryClient } from '@tanstack/react-query'

import { postApi } from '@/apis/post/post.api'

export function useDeleteVoteMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (voteId: number) => postApi.deleteVote(voteId),

    onSuccess: () => {
      // 삭제 후 상세 리패치
      queryClient.invalidateQueries({
        queryKey: ['postDetail'],
      })
    },
  })
}
