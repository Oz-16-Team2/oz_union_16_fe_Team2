import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import type { ApiErrorResponse } from '@/apis/api.types'
import { postApi } from '@/apis/post'
import { POSTS_PAGE_SIZE } from '@/features/main/post-list'
import type { ApiPostListResponse } from '@/features/main/post-list/PostList.api.types'

type PostListMode =
  | { type: 'latest'; page: number }
  | { type: 'trending'; page: number }
  | { type: 'suggested'; page: number }
  | { type: 'search'; keyword: string; page: number }

export function usePostListQuery(mode: PostListMode, size = POSTS_PAGE_SIZE) {
  return useQuery<ApiPostListResponse, AxiosError<ApiErrorResponse>>({
    queryKey: ['posts', mode],
    retry: false,
    queryFn: async () => {
      if (mode.type === 'search') {
        const res = await postApi.searchPosts({
          keyword: mode.keyword,
          type: 'title',
          page: mode.page,
          size,
        })
        const {
          search_results,
          total_count,
          page,
          size: resSize,
        } = res.data.detail
        return { posts: search_results, total_count, page, size: resSize }
      }

      if (mode.type === 'trending') {
        const res = await postApi.getTrendingPosts({
          period: 'week',
          page: mode.page,
          size,
        })
        const { posts, total_count, page, size: resSize } = res.data.detail
        return { posts, total_count, page, size: resSize }
      }

      if (mode.type === 'suggested') {
        const res = await postApi.getSuggestedPosts({ page: mode.page, size })
        const { posts, total_count, page, size: resSize } = res.data.detail
        return { posts, total_count, page, size: resSize }
      }

      // latest
      const res = await postApi.getPosts({ page: mode.page, size })
      return res.data.detail
    },
    // 탭 전환 시 이전 캐시를 남기지 않고 항상 새로 fetch
    // gcTime: 0 → 쿼리가 비활성화되는 즉시 캐시에서 제거됨
    gcTime: 0,
    placeholderData: keepPreviousData,
  })
}
