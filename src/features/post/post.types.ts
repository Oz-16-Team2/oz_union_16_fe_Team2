// 프론트에서 사용하는 모든 타입은 camelCase로 통일
// API 요청/응답 타입은 post.api.types.ts 참고
// API ↔ 프론트 변환은 post.mappers.ts 참고

export type PostFormMode = 'create' | 'edit'

export type GoalStatus = 'IN_PROGRESS' | 'FAILED' | 'COMPLETED'

export type VoteOptionFormData = {
  content: string
  sortOrder: number
}

export type VoteFormData = {
  question: string
  options: VoteOptionFormData[]
}

// 폼 상태 및 컴포넌트 간 전달에 사용
export type PostFormData = {
  postId?: number
  title: string
  content: string
  images: string[]
  hasGoal: boolean
  goalId?: number
  hasVote: boolean
  vote?: VoteFormData
  tagIds: number[]
}

// 목표 드롭다운에서 사용하는 프론트 전용 타입
export type GoalOption = {
  id: number
  title: string
  startDate: string
  endDate: string
  progressRate: number
  status: GoalStatus
}

// 태그 선택에서 사용하는 프론트 전용 타입
export type TagOption = {
  id: number
  name: string
}
