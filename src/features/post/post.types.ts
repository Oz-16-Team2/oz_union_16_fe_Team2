// 프론트에서 사용하는 모든 타입은 camelCase로 통일
// API 요청/응답 타입은 post.api.types.ts 참고
// API ↔ 프론트 변환은 post.mappers.ts 참고

export type PostFormMode = 'create' | 'edit'

export type GoalStatus = 'in_progress' | 'failed' | 'completed'

export type VoteFormData = {
  options: string[]
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
// imageUrl === null → S3 업로드 진행 중
// imageUrl === string → S3 업로드 완료된 URL
export type PostImageItem = {
  previewUrl: string // blob URL (미리보기용)
  imageUrl: string | null
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

//게시글 상세 페이지 화면용
export type PostDetailData = {
  postId: number
  images: string[]
  profileImageUrl: string | null
  nickname: string
  createdAt: string
  title: string
  content: string
  tags: string[]
  likeCount: number
  isLiked: boolean
  commentCount: number
  isScrapped: boolean
  isOwner: boolean
  hasGoal: boolean
  goalInfo: {
    goalId: number
    title: string
    startDate: string | null
    endDate: string | null
    progressRate: number | null
  } | null
  hasVote: boolean
  voteInfo: {
    voteId: number
    startAt: string
    endAt: string
    status: string
    options: {
      optionId: number
      content: string
      sortOrder: number
    }[]
  } | null
}
