import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import type { ApiErrorResponse } from '@/apis/api.types'
import { postApi } from '@/apis/post'
import type { ApiPostListResponse } from '@/features/main/post-list/PostList.api.types'

export function useBookmarkedPostsQuery(params: {
  page: number
  size: number
}) {
  return useQuery<ApiPostListResponse, AxiosError<ApiErrorResponse>>({
    queryKey: ['bookmarkedPosts', params],
    retry: false,
    queryFn: async () => {
      const res = await postApi.getScrappedPosts(params)
      return res.data
    },
    gcTime: 0,
    placeholderData: keepPreviousData,
  })
}
