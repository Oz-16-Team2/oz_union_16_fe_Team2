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
  // is_liked: boolean 존재 해야 하는데 like API 만들어지면 추가 예정
  is_scrapped: boolean
}

// GET /api/v1/posts — 게시글 목록 응답
export type ApiPostListResponse = {
  posts: ApiPostListItem[]
  page: number
  size: number
  total_count: number
}

// GET /api/v1/posts — 요청 쿼리 파라미터
export type ApiPostListParams = {
  scope?: string
  sortBy?: string
  page?: number
  size?: number
}
