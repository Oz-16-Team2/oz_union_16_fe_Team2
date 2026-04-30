import { useNavigate } from 'react-router'

import type { PostDetailData } from '@/features/post/post.types'
import { useDeletePostMutation } from '@/query/post/useDeletePostMutation'

import { PostDetailActions } from './PostDetailActions'
import { PostDetailBody } from './PostDetailBody'
import { PostDetailCommentSection } from './PostDetailCommentSection'
import { PostDetailHeader } from './PostDetailHeader'
import { PostGoalSection } from './PostGoalSection'

type PostDetailLayoutProps = {
  post: PostDetailData
}

export function PostDetailLayout({ post }: PostDetailLayoutProps) {
  const navigate = useNavigate()
  const deleteMutation = useDeletePostMutation()

  const handleDelete = () => {
    const ok = window.confirm('게시글을 삭제하시겠습니까?')
    if (!ok) return

    deleteMutation.mutate(post.postId, {
      onSuccess: () => {
        navigate('/')
      },
    })
  }

  const handleReport = () => {
    // 팀원 useReportPostMutation 머지 후 여기 연결
  }

  return (
    <article className="rounded-2xl border border-border-default bg-white px-16 py-6 shadow-card-main">
      <PostDetailHeader
        author={{
          nickname: post.nickname,
          profileImageUrl: post.profileImageUrl,
        }}
        createdAt={post.createdAt}
        isOwner={false}
        onDelete={handleDelete}
        onReport={handleReport}
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

      <div id="post-detail-comment-section">
        <PostDetailCommentSection postId={post.postId} />
      </div>
    </article>
  )
}
