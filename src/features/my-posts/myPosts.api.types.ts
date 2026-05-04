// GET /api/v1/posts/me — 요청 쿼리 파라미터
export type ApiMyPostListParams = {
  page?: number
  size?: number
  sort_by?: string
}

export type ApiMyPostListItem = {
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
  is_scrapped: boolean
}

export type ApiMyPostListResponse = {
  posts: ApiMyPostListItem[]
  page: number
  size: number
  total_count: number
}

export type ApiMyPostListWrappedResponse = {
  detail: ApiMyPostListResponse
}
