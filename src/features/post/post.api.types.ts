import type { GoalStatus } from './post.types'

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

// POST /api/v1/posts 요청
export type ApiPostCreateRequest = {
  title: string
  content: string
  images: string[]
  hasGoal: boolean
  goalId?: number
  hasVote: boolean
  vote?: {
    question: string
    options: Array<{ content: string; sortOrder: number }>
  }
  tagIds: number[]
}

// POST /api/v1/posts/votes 요청
// TODO: 백엔드 엔드포인트 확정 후 타입 추가
// 투표는 게시글 생성 전에 먼저 독립적으로 생성됨 (post_id 없이 요청)
// 요청 body 예시: { question, options: string[], start_at: datetime, end_at: datetime }
// export type ApiVoteCreateRequest = {
//   question: string
//   options: string[]
//   start_at: string  // ISO datetime
//   end_at: string    // ISO datetime
// }

// POST /api/v1/posts/votes 응답
// TODO: 백엔드 응답 확정 후 타입 추가
// 생성된 vote_id와 options를 게시글 생성 요청(vote 필드)에 활용
// export type ApiVoteCreateResponse = {
//   vote_id: number
//   post_id: number
//   question: string
//   start_at: string
//   end_at: string
//   status: string
//   options: Array<{ vote_option_id: number; content: string }>
// }

// PATCH /api/v1/posts/:postId 요청
export type ApiPostUpdateRequest = {
  post_id: number
  title: string
  content: string
  images: string[]
  hasGoal: boolean
  goalId?: number
  hasVote: boolean
  tagIds: number[]
}
