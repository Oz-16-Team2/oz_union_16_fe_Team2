import { VoteDisplay } from '@/components/common/ui'

import {
  mockGoal,
  mockPostDetail,
  mockVote,
} from '../constants/post-detail.constants'
import { PostDetailActions } from './PostDetailActions'
import { PostDetailBody } from './PostDetailBody'
import { PostDetailCommentSection } from './PostDetailCommentSection'
import { PostDetailHeader } from './PostDetailHeader'
import { PostGoalSection } from './PostGoalSection'

export function PostDetailLayout() {
  const post = mockPostDetail

  return (
    <article className="rounded-2xl border border-border-default bg-white px-16 py-6 shadow-card-main">
      <PostDetailHeader author={post.author} createdAt={post.createdAt} />

      <div className="mt-6">
        <PostDetailBody
          title={post.title}
          content={post.content}
          tags={post.tags}
          images={post.images}
        />
      </div>

      {/* 투표 영역 */}
      {mockVote && (
        <div className="mt-6">
          <VoteDisplay
            mode={mockVote.mode}
            options={mockVote.options}
            participantCount={mockVote.participantCount}
            period={mockVote.period}
          />
        </div>
      )}

      {/* 목표/그래프 영역 */}
      {mockGoal && (
        <div className="mt-6">
          <PostGoalSection
            title={mockGoal.title}
            startDate={mockGoal.startDate}
            endDate={mockGoal.endDate}
            progressRate={mockGoal.progressRate}
            status={mockGoal.status}
          />
        </div>
      )}

      <div className="mt-8">
        <PostDetailActions />
      </div>

      <PostDetailCommentSection />
    </article>
  )
}
