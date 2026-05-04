// GET /api/v1/posts — 게시글 목록 조회 시 개별 항목
export type ApiPostListItem = {
  post_id: number
  images: string[]
  profile_image_url: string | null
  nickname: string
  created_at: string
  title: string
  tags: string[]
  content_preview: string
  like_count: number
  comment_count: number
  is_liked: boolean
  is_scrapped: boolean
}

// GET /api/v1/posts — 게시글 목록 응답
export type ApiPostListResponse = {
  posts: ApiPostListItem[]
  page: number
  size: number
  total_count: number
}

export type ApiPostListWrappedResponse = {
  detail: ApiPostListResponse
}

// GET /api/v1/posts — 요청 쿼리 파라미터
export type ApiPostListParams = {
  scope?: string
  sortBy?: string
  page?: number
  size?: number
}

// GET /api/v1/posts/search — 요청 쿼리 파라미터
export type ApiPostSearchParams = {
  keyword: string
  type: 'title' | 'content'
  page?: number
  size?: number
}

// GET /api/v1/posts/search — 응답
export type ApiPostSearchResponse = {
  search_results: ApiPostListItem[]
  keyword: string
  total_count: number
  sort_by: string
  page: number
  size: number
}

export type ApiPostSearchWrappedResponse = {
  detail: ApiPostSearchResponse
}

// GET /api/v1/posts/trending — 요청 쿼리 파라미터
export type ApiTrendingParams = {
  period: 'day' | 'week'
  page?: number
  size?: number
}

// GET /api/v1/posts/trending — 응답
export type ApiTrendingResponse = {
  detail: {
    posts: ApiPostListItem[]
    total_count: number
    page: number
    size: number
  }
}
