import { apiClient } from '@/apis/apiClient'
import type {
  ApiPostListParams,
  ApiPostListResponse,
} from '@/features/main/post-list/PostList.api.types'
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
  // 전체 목표 조회
  getGoals: () => apiClient.get<ApiGoalResponse[]>(POST_ENDPOINTS.goals),

  // 전체 태그 조회
  getTags: () => apiClient.get<ApiTagResponse[]>(POST_ENDPOINTS.tags),

  // 단일 게시글 조회
  getPost: (postId: number) =>
    apiClient.get<ApiPostResponse>(POST_ENDPOINTS.post(postId)),

  // 게시글 생성a
  createPost: (body: ApiPostCreateRequest) =>
    apiClient.post<ApiPostCreateResponse>(POST_ENDPOINTS.posts, body),

  // 게시글 목록 조회
  getPosts: (params?: ApiPostListParams) =>
    apiClient.get<ApiPostListResponse>(POST_ENDPOINTS.posts, { params }),

  // 게시글 수정
  updatePost: (postId: number, body: ApiPostUpdateRequest) =>
    apiClient.patch<void>(POST_ENDPOINTS.post(postId), body),

  // 게시글 좋아요 토글
  toggleLike: (postId: number) =>
    apiClient.post<void>(POST_ENDPOINTS.postLikes(postId)),

  // 게시글 스크랩
  scrapPost: (postId: number) =>
    apiClient.post<void>(POST_ENDPOINTS.postScraps(postId)),

  // 게시글 스크랩 취소
  unscrapPost: (postId: number) =>
    apiClient.delete<void>(POST_ENDPOINTS.postScraps(postId)),

  // 게시글 신고
  reportPost: (postId: number) =>
    apiClient.post<void>(POST_ENDPOINTS.postReports(postId)),
} as const
