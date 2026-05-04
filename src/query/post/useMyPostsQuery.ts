import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import type { ApiErrorResponse } from '@/apis/api.types'
import { postApi } from '@/apis/post'
import type {
  ApiMyPostListParams,
  ApiMyPostListResponse,
} from '@/features/my-posts/myPosts.api.types'

export function useMyPostsQuery(params: ApiMyPostListParams) {
  return useQuery<ApiMyPostListResponse, AxiosError<ApiErrorResponse>>({
    queryKey: ['posts', 'me', params],
    retry: false,
    queryFn: async () => {
      const res = await postApi.getMyPosts(params)
      return res.data.detail
    },
  })
}
