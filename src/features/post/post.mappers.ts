import type {
  ApiGoalResponse,
  ApiPostCreateRequest,
  ApiPostUpdateRequest,
} from './post.api.types'
import type { GoalOption, PostFormData } from './post.types'

// API 응답 → 프론트 타입

export function toGoalOption(api: ApiGoalResponse): GoalOption {
  return {
    id: api.goal_id,
    title: api.title,
    startDate: api.startDate,
    endDate: api.endDate,
    progressRate: api.progressRate,
    status: api.status,
  }
}

// 투표 관련 매퍼 (TODO: 백엔드 엔드포인트 확정 후 구현)
// [1] PostFormData + votePeriod → ApiVoteCreateRequest
//   - usePostForm의 votePeriod(DateRange)를 ISO datetime 문자열로 변환
//   - vote options는 string[] 형태로 전달 (sortOrder 없이)
// [2] ApiVoteCreateResponse → PostFormData.vote 병합용 객체
//   - 응답의 options(vote_option_id, content)를 { content, sortOrder } 형태로 변환
//   - 게시글 생성 요청의 vote 필드에 주입

// 프론트 타입 → API 요청

export function toApiCreateRequest(data: PostFormData): ApiPostCreateRequest {
  return {
    title: data.title,
    content: data.content,
    images: data.images,
    hasGoal: data.hasGoal,
    ...(data.goalId !== undefined && { goalId: data.goalId }),
    hasVote: data.hasVote,
    ...(data.vote !== undefined && {
      vote: {
        question: data.vote.question,
        options: data.vote.options.map((o) => ({
          content: o.content,
          sortOrder: o.sortOrder,
        })),
      },
    }),
    tagIds: data.tagIds,
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
    hasGoal: data.hasGoal,
    ...(data.goalId !== undefined && { goalId: data.goalId }),
    hasVote: data.hasVote,
    tagIds: data.tagIds,
  }
}
