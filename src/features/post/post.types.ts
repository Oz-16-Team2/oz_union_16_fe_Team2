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
  options: VoteOptionFormData[]
  startDate?: string
  endDate?: string
}

// 폼 상태 및 컴포넌트 간 전달에 사용
// tagNames: edit 모드에서 서버로부터 받은 태그 이름 목록 — PostTagSection이 name→id 변환 후 초기 선택 처리
// tagIds: 현재 선택된 태그 ID 목록 — PostTagSection이 관리
export type PostFormData = {
  postId?: number
  title: string
  content: string
  images: string[]
  hasGoal: boolean
  goalId?: number
  hasVote: boolean
  vote?: VoteFormData
  tagNames?: string[]
  tagIds: number[]
}

// 이미지 업로드 아이템
// file 있음 → 새로 선택한 파일 (S3 업로드 대기)
// file 없음 → 이미 업로드된 서버 이미지
export type PostImageItem = {
  file?: File
  previewUrl: string
}

// 목표 드롭다운에서 사용하는 프론트 전용 타입
export type GoalOption = {
  goalId: number
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
