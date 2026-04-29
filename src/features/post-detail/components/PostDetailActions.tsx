import { Bookmark, Heart, MessageCircle, Share2 } from 'lucide-react'

import {
  useTogglePostLikeMutation,
  useTogglePostScrapMutation,
} from '@/query/post/usePostDetailActionsMutation'
import { cn } from '@/utils/cn'

type PostDetailActionsProps = {
  postId: number
  likeCount: number
  commentCount: number
  isLiked: boolean
  isScrapped: boolean
}

export function PostDetailActions({
  postId,
  likeCount,
  commentCount,
  isLiked,
  isScrapped,
}: PostDetailActionsProps) {
  const likeMutation = useTogglePostLikeMutation(postId)
  const scrapMutation = useTogglePostScrapMutation({ postId, isScrapped })

  const handleLike = () => {
    likeMutation.mutate()
  }

  const handleComment = () => {
    document
      .getElementById('post-detail-comment-section')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href)
  }

  const handleBookmark = () => {
    scrapMutation.mutate()
  }

  return (
    <div className="mb-6 flex items-center gap-4 border-b border-border-subtle pb-4">
      {/* 좋아요 */}
      <button
        type="button"
        onClick={handleLike}
        disabled={likeMutation.isPending}
        className="flex items-center gap-1 text-text-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Heart
          size={20}
          className={cn(
            isLiked ? 'fill-current text-error-500' : 'text-text-primary',
            'transition-transform duration-200'
          )}
        />
        <span className="text-sm">{likeCount}</span>
      </button>

      {/* 댓글 */}
      <button
        type="button"
        onClick={handleComment}
        className="flex items-center gap-1 text-text-primary"
      >
        <MessageCircle size={20} strokeWidth={1} />
        <span className="text-sm">{commentCount}</span>
      </button>

      {/* 공유 */}
      <button
        type="button"
        onClick={handleShare}
        className="text-text-primary"
        aria-label="공유"
      >
        <Share2 size={20} strokeWidth={1} />
      </button>

      {/* 북마크 */}
      <button
        type="button"
        onClick={handleBookmark}
        disabled={scrapMutation.isPending}
        className="text-text-primary disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={isScrapped ? '스크랩 취소' : '스크랩'}
      >
        <Bookmark
          size={20}
          className={cn(
            isScrapped ? 'fill-current text-primary-600' : 'text-text-primary',
            'transition-transform duration-200'
          )}
        />
      </button>
    </div>
  )
}
