import { useQuery } from '@tanstack/react-query'

import { postApi } from '@/apis/post/post.api'

export function useVoteQuery(voteId: number) {
  return useQuery({
    queryKey: ['vote', voteId],
    queryFn: () => postApi.getVote(voteId),
    enabled: voteId > 0,
  })
}
