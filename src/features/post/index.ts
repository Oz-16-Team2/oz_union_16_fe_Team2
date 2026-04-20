export { PostFormLayout } from './components/PostFormLayout'

// 프론트 전용 타입
export type {
  GoalOption,
  GoalStatus,
  PostFormData,
  PostFormMode,
  TagOption,
  VoteFormData,
  VoteOptionFormData,
} from './post.types'

// API 요청/응답 타입 (서버 스펙 그대로)
export type {
  ApiGoalResponse,
  ApiPostCreateRequest,
  ApiPostUpdateRequest,
  ApiTagResponse,
} from './post.api.types'

// API ↔ 프론트 변환 함수
export {
  toApiCreateRequest,
  toApiUpdateRequest,
  toGoalOption,
} from './post.mappers'
