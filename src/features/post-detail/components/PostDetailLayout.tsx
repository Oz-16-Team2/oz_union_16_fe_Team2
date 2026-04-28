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
            status="IN_PROGRESS"
          />
        </div>
      )}

      <div className="mt-8">
        <PostDetailActions />
      </div>

      <PostDetailCommentSection postId={post.postId} />
    </article>
  )
}
