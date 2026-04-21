import { apiClient } from '@/apis/apiClient'
import type {
  ApiGoalResponse,
  ApiPostCreateRequest,
  ApiPostCreateResponse,
  ApiPostResponse,
  ApiPostUpdateRequest,
  ApiTagResponse,
} from '@/features/post/post.api.types'

import { POST_ENDPOINTS } from './endpoints'

export const postApi = {
  getGoals: () => apiClient.get<ApiGoalResponse[]>(POST_ENDPOINTS.goals),

  getTags: () => apiClient.get<ApiTagResponse[]>(POST_ENDPOINTS.tags),

  getPost: (postId: number) =>
    apiClient.get<ApiPostResponse>(POST_ENDPOINTS.post(postId)),

  createPost: (body: ApiPostCreateRequest) =>
    apiClient.post<ApiPostCreateResponse>(POST_ENDPOINTS.posts, body),

  updatePost: (postId: number, body: ApiPostUpdateRequest) =>
    apiClient.patch<void>(POST_ENDPOINTS.post(postId), body),
} as const
