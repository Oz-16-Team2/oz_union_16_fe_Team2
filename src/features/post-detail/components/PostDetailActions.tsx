import { Bookmark, Heart, MessageCircle, Share2 } from 'lucide-react'

import { Button } from '@/components/common/ui'
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
    try {
      await navigator.clipboard.writeText(window.location.href)
    } catch {
      // TODO: 토스트 연결 시 공유 실패 메시지 노출
    }
  }

  const handleBookmark = () => {
    scrapMutation.mutate()
  }

  return (
    <div className="mb-6 flex items-center border-b border-border-subtle pb-4">
      <div className="flex items-center gap-3">
        {/* 좋아요 */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            type="button"
            aria-label="좋아요"
            aria-pressed={isLiked}
            className="group p-0 hover:bg-transparent"
            onClick={handleLike}
            disabled={likeMutation.isPending}
          >
            <Heart
              size={20}
              className={cn(
                isLiked ? 'fill-current text-error-500' : 'text-text-primary',
                'transition-transform duration-200 group-hover:scale-110'
              )}
            />
          </Button>
          <span className="tabular-nums text-sm text-text-primary">
            {likeCount}
          </span>
        </div>

        {/* 댓글 */}
        <button
          type="button"
          onClick={handleComment}
          className="flex items-center gap-1"
          aria-label="댓글로 이동"
        >
          <MessageCircle
            size={20}
            className="text-text-primary transition-transform duration-200 hover:scale-110"
          />
          <span className="tabular-nums text-sm text-text-primary">
            {commentCount}
          </span>
        </button>

        {/* 공유 */}
        <Button
          variant="ghost"
          size="sm"
          type="button"
          aria-label="공유하기"
          className="group p-0 hover:bg-transparent"
          onClick={handleShare}
        >
          <Share2
            size={20}
            className="text-text-primary transition-transform duration-200 group-hover:scale-110"
          />
        </Button>

        {/* 북마크 */}
        <Button
          variant="ghost"
          size="sm"
          type="button"
          aria-label={isScrapped ? '스크랩 취소' : '스크랩'}
          aria-pressed={isScrapped}
          className="group p-0 hover:bg-transparent"
          onClick={handleBookmark}
          disabled={scrapMutation.isPending}
        >
          <Bookmark
            size={20}
            className={cn(
              isScrapped
                ? 'fill-current text-primary-600'
                : 'text-text-primary',
              'transition-transform duration-200 group-hover:scale-110'
            )}
          />
        </Button>
      </div>
    </div>
  )
}
