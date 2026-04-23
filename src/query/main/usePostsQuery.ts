import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import type { ApiErrorResponse } from '@/apis/api.types'
import { postApi } from '@/apis/post'
import { POSTS_PAGE_SIZE, type PostSortOrder } from '@/features/main/post-list'
import type { ApiPostListResponse } from '@/features/main/post-list/PostList.api.types'

// 게시글 조회 쿼리는 데이터 캐싱 X

type PostsQueryParams = {
  sortBy: PostSortOrder
  page: number
  size?: number
}

export function usePostsQuery({
  sortBy,
  page,
  size = POSTS_PAGE_SIZE,
}: PostsQueryParams) {
  return useQuery<ApiPostListResponse, AxiosError<ApiErrorResponse>>({
    queryKey: ['posts', { sortBy, page }],
    queryFn: () =>
      postApi.getPosts({ page, sortBy, size }).then((res) => res.data),
  })
}
