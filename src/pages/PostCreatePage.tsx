import { useNavigate } from 'react-router'

import type { PostFormData } from '@/features/post'
import { PostFormLayout, toApiCreateRequest } from '@/features/post'

export function PostCreatePage() {
  const navigate = useNavigate()

  async function handleSubmit(data: PostFormData) {
    // TODO: [투표 선생성 → 게시글 생성] 2단계 순차 API 호출 구현 필요
    //
    // [1단계] 투표가 있는 경우 먼저 투표를 생성
    //   - POST /api/v1/posts/votes
    //   - 요청 body: { question, options: string[], start_at, end_at }
    //   - 응답(200): ApiVoteCreateResponse (vote_id, question, options 등)
    //   ※ start_at / end_at 은 현재 usePostForm의 votePeriod 상태에서 가져와야 함
    //   ※ votePeriod가 PostFormData에 포함되지 않으므로, PostFormData.vote 또는
    //      별도 필드로 추가하는 타입 변경이 선행되어야 함 (post.types.ts, usePostForm.ts 수정 필요)
    //
    // [2단계] 1단계 응답값을 이용해 게시글 생성
    //   - POST /api/v1/posts
    //   - hasVote: true, vote: { question, options: [{ content, sortOrder }] } 포함
    //   - vote 데이터는 1단계 응답(ApiVoteCreateResponse)을 toApiCreateRequest mapper로 변환하여 사용
    //
    // [타입/매퍼 추가 필요]
    //   - post.api.types.ts: ApiVoteCreateRequest, ApiVoteCreateResponse 타입 추가
    //   - post.mappers.ts: toApiVoteCreateRequest, fromApiVoteCreateResponse 매퍼 추가

    const body = toApiCreateRequest(data)
    console.log('create post:', body)
  }

  return (
    <PostFormLayout
      mode="create"
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
    />
  )
}
