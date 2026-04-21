import type {
  ApiGoalResponse,
  ApiPostCreateRequest,
  ApiPostResponse,
  ApiPostUpdateRequest,
} from './post.api.types'
import type { GoalOption, PostFormData } from './post.types'

// API 응답 → 프론트 타입

export function toGoalOption(api: ApiGoalResponse): GoalOption {
  return {
    goalId: api.goal_id,
    title: api.title,
    startDate: api.startDate,
    endDate: api.endDate,
    progressRate: api.progressRate,
    status: api.status,
  }
}

// GET /api/v1/posts/:postId 응답 → PostFormData (수정 모드 초기값)
// tagNames: 서버에서 받은 태그 이름 그대로 전달 — name→id 변환은 PostTagSection이 담당
export function toPostFormData(api: ApiPostResponse): PostFormData {
  return {
    postId: api.post_id,
    title: api.title,
    content: api.content,
    images: api.images,
    hasGoal: api.has_goal,
    goalId: api.goal_info?.goal_id,
    hasVote: api.has_vote,
    vote: api.vote_info
      ? {
          options: api.vote_info.options.map((o) => ({
            content: o.content,
            sortOrder: o.sort_order,
          })),
          startDate: api.vote_info.start_at,
          endDate: api.vote_info.end_at,
        }
      : undefined,
    tagNames: api.tags ?? [],
    tagIds: [],
  }
}

// 프론트 타입 → API 요청
function toApiVoteContent(vote?: PostFormData['vote']) {
  if (!vote) return undefined
  return {
    options: vote.options.map((o) => ({
      content: o.content,
      sort_order: o.sortOrder,
    })),
    ...(vote.startDate && { start_date: vote.startDate }),
    ...(vote.endDate && { end_date: vote.endDate }),
  }
}

export function toApiCreateRequest(data: PostFormData): ApiPostCreateRequest {
  return {
    title: data.title,
    content: data.content,
    images: data.images,
    has_goal: data.hasGoal,
    ...(data.goalId !== undefined && { goal_id: data.goalId }),
    has_vote: data.hasVote,
    vote: toApiVoteContent(data.vote),
    tag_ids: data.tagIds,
  }
}

export function toApiUpdateRequest(data: PostFormData): ApiPostUpdateRequest {
  if (data.postId === undefined) {
    throw new Error('postId는 필수')
  }

  return {
    post_id: data.postId,
    title: data.title,
    content: data.content,
    images: data.images,
    has_goal: data.hasGoal,
    ...(data.goalId !== undefined && { goal_id: data.goalId }),
    has_vote: data.hasVote,
    vote: toApiVoteContent(data.vote),
    tag_ids: data.tagIds,
  }
}
