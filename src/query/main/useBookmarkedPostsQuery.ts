import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import type { ApiErrorResponse } from '@/apis/api.types'
import { postApi } from '@/apis/post'
import type { ApiPostListResponse } from '@/features/main/post-list/PostList.api.types'

// TODO: API 수정 완료 시 postApi.getScrappedPosts(params)로 교체
export function useBookmarkedPostsQuery(params: {
  page: number
  size: number
}) {
  return useQuery<ApiPostListResponse, AxiosError<ApiErrorResponse>>({
    queryKey: ['bookmarkedPosts', params],
    retry: false,
    queryFn: async () => {
      const res = await postApi.getPosts(params)
      return res.data
    },
    gcTime: 0,
  })
}
