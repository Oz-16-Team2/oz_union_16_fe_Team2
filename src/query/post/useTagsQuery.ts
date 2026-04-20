import { useQuery } from '@tanstack/react-query'

import { postApi } from '@/apis/post'

export function useTagsQuery() {
  return useQuery({
    queryKey: ['tags'], // staleTime, gcTime 설정 필요
    queryFn: () => postApi.getTags().then((res) => res.data),
  })
}
