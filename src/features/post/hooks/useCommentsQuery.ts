import { useQuery } from '@tanstack/react-query'

import { postApi } from '../post.api'

export const commentsQueryKey = {
  all: ['comments'] as const,
  list: (postId: number) => [...commentsQueryKey.all, postId] as const,
}

export function useCommentsQuery(postId: number) {
  return useQuery({
    queryKey: commentsQueryKey.list(postId),
    queryFn: () => postApi.getComments(postId),
  })
}
