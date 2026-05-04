import type { GoalStatus } from './post.types'

// GET /api/v1/goals/ 응답
export type ApiGoalResponse = {
  goal_id: number
  title: string
  start_date: string
  end_date: string
  status: GoalStatus
  created_at: string
  progress_rate: number
  is_checked_today: boolean
}

export type ApiGoalListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: ApiGoalResponse[]
}

// GET /api/v1/posts/tags 응답
export type ApiTagResponse = {
  id: number
  name: string
}

export type ApiTagListResponse = {
  results: ApiTagResponse[]
}

export type VoteContent = {
  options: string[]
  start_at?: string
  end_at?: string
}

// POST /api/v1/posts 요청
export type ApiPostCreateRequest = {
  title: string
  content: string
  images?: string[]
  has_goal: boolean
  goal_id?: number
  has_vote: boolean
  vote?: VoteContent
  tag_ids?: number[]
}

// POST /api/v1/posts 응답
export type ApiPostCreateResponse = {
  detail: string
  post_id: number
}

// GET /api/v1/posts/:postId 응답
export type ApiPostResponse = {
  post_id: number
  images: string[]
  profile_image_url: string
  nickname: string
  created_at: string
  title: string
  content: string
  tags: string[] | null
  like_count: number
  comment_count: number
  is_liked: boolean
  is_scrapped: boolean
  is_owner: boolean
  has_goal: boolean
  goal_info: {
    goal_id: number
    goal_title: string
    goal_start_date: string | null
    goal_end_date: string | null
    goal_progress: number | null
  } | null
  has_vote: boolean
  vote_info: {
    vote_id: number
    start_at: string
    end_at: string
    status: string
    options: Array<{
      option_id: number
      content: string
      sort_order: number
    }>
  } | null
}

// POST /api/v1/posts/presigned-url 요청/응답
export type ApiPresignedUrlRequest = {
  filename: string
  content_type: string
}

export type ApiPresignedUrlResponse = {
  detail: {
    presigned_url: string
    image_url: string
  }
}

// PATCH /api/v1/posts/:postId 요청
export type ApiPostUpdateRequest = {
  post_id: number
  title: string
  content: string
  images?: string[]
  has_goal: boolean
  goal_id?: number
  has_vote: boolean
  vote?: VoteContent
  tag_ids?: number[]
}

//댓글 api
export type CommentApiResponse = {
  id: number
  user_id: number
  nickname: string
  content: string
  created_at: string
  like_count: number
  is_liked: boolean
  profile_image_url?: string | null
}

export type GetCommentsApiResponse = {
  results: CommentApiResponse[]
}

export type CreateCommentApiRequest = {
  content: string
}

export type CreateCommentApiResponse = CommentApiResponse
