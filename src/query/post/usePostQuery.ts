import { useQuery } from '@tanstack/react-query'

import { postApi } from '@/apis/post'

export function usePostQuery(postId: number) {
  return useQuery({
    queryKey: ['post', postId], // staleTime, gcTime 설정 필요
    queryFn: () => postApi.getPost(postId).then((res) => res.data),
    enabled: !isNaN(postId),
  })
}
