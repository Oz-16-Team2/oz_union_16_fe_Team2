import type { GoalStatus } from './post.types'

// 현재 API 명세서 기준 snake_case와 camelCase가 혼용되어 있어 타입이 다소 복잡합니다.
// 추후 API 명세가 바뀌면 바뀌는 타입에 맞춰 수정해야합니다.

// GET /api/v1/goals 응답
export type ApiGoalResponse = {
  goal_id: number
  title: string
  startDate: string
  endDate: string
  status: GoalStatus
  created_at: string
  progressRate: number
  isCheckedToday: boolean
}

// GET /api/v1/tags 응답
export type ApiTagResponse = {
  id: number
  name: string
}

export type VoteContent = {
  options: Array<{ content: string; sort_order: number }>
  start_date?: string
  end_date?: string
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
  profile_image_url: string | null
  nickname: string
  created_at: string
  title: string
  content: string
  tags: string[] | null
  like_count: number
  comment_count: number
  is_scrapped: boolean
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
