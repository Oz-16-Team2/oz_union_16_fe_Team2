import { apiClient } from '@/apis/apiClient'
import type {
  ApiPostListParams,
  ApiPostListResponse,
  ApiPostSearchParams,
  ApiPostSearchResponse,
  ApiTrendingParams,
  ApiTrendingResponse,
} from '@/features/main/post-list/PostList.api.types'
import type {
  ApiGoalListResponse,
  ApiPostCreateRequest,
  ApiPostCreateResponse,
  ApiPostResponse,
  ApiPostUpdateRequest,
  ApiPresignedUrlRequest,
  ApiPresignedUrlResponse,
  ApiTagListResponse,
} from '@/features/post/post.api.types'

import { POST_ENDPOINTS } from './endpoints'

export const postApi = {
  // 진행 중인 목표 조회
  getGoals: () =>
    apiClient.get<ApiGoalListResponse>(POST_ENDPOINTS.goals, {
      params: { status: 'in_progress' },
    }),

  // 태그 목록 조회
  getTags: () => apiClient.get<ApiTagListResponse>(POST_ENDPOINTS.tags),

  // 단일 게시글 조회
  getPost: (postId: number) =>
    apiClient.get<ApiPostResponse>(POST_ENDPOINTS.post(postId)),

  // 게시글 생성
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
  reportPost: (
    postId: number,
    body: { reason_type: string; reason_detail: string }
  ) => apiClient.post<void>(POST_ENDPOINTS.postReports(postId), body),

  // 게시글 삭제
  deletePost: (postId: number) =>
    apiClient.delete<void>(POST_ENDPOINTS.post(postId)),

  // 이미지 S3 업로드용 presigned URL 발급
  getPresignedUrl: (body: ApiPresignedUrlRequest) =>
    apiClient.post<ApiPresignedUrlResponse>(POST_ENDPOINTS.presignedUrl, body),

  // 게시글 검색
  searchPosts: (params: ApiPostSearchParams) =>
    apiClient.get<ApiPostSearchResponse>(POST_ENDPOINTS.postSearch, { params }),

  // 인기 게시글 조회
  getTrendingPosts: (params: ApiTrendingParams) =>
    apiClient.get<ApiTrendingResponse>(POST_ENDPOINTS.postTrending, { params }),

  // 추천 게시글 조회
  getSuggestedPosts: (params: { page?: number; size?: number }) =>
    apiClient.get<ApiTrendingResponse>(POST_ENDPOINTS.postSuggestions, {
      params,
    }),
} as const
