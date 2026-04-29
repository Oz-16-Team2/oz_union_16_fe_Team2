import type { PostDetailData } from '@/features/post/post.types'

import { PostDetailActions } from './PostDetailActions'
import { PostDetailBody } from './PostDetailBody'
import { PostDetailCommentSection } from './PostDetailCommentSection'
import { PostDetailHeader } from './PostDetailHeader'
import { PostGoalSection } from './PostGoalSection'

type PostDetailLayoutProps = {
  post: PostDetailData
}

export function PostDetailLayout({ post }: PostDetailLayoutProps) {
  return (
    <article className="rounded-2xl border border-border-default bg-white px-16 py-6 shadow-card-main">
      <PostDetailHeader
        author={{
          nickname: post.nickname,
          profileImageUrl: post.profileImageUrl,
        }}
        createdAt={post.createdAt}
      />

      <div className="mt-6">
        <PostDetailBody
          title={post.title}
          content={post.content}
          tags={post.tags}
          images={post.images}
        />
      </div>

      {post.hasGoal && post.goalInfo && (
        <div className="mt-6">
          <PostGoalSection
            title={post.goalInfo.title}
            startDate={post.goalInfo.startDate ?? ''}
            endDate={post.goalInfo.endDate ?? ''}
            progressRate={post.goalInfo.progressRate ?? 0}
            status="in_progress"
          />
        </div>
      )}

      <div className="mt-8">
        <PostDetailActions
          postId={post.postId}
          likeCount={post.likeCount}
          commentCount={post.commentCount}
          isLiked={post.isLiked}
          isScrapped={post.isScrapped}
        />
      </div>

      {/* 댓글 버튼 클릭 시 이 영역으로 스크롤 이동 */}
      <div id="post-detail-comment-section">
        <PostDetailCommentSection postId={post.postId} />
      </div>
    </article>
  )
}
