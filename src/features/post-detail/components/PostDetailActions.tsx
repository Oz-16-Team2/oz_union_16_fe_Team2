import { Bookmark, Heart, MessageCircle, Share2 } from 'lucide-react'

export function PostDetailActions() {
  const handleLike = () => console.log('like')
  const handleComment = () => console.log('comment')
  const handleShare = () => console.log('share')
  const handleBookmark = () => console.log('bookmark')

  return (
    <div className="mb-6 flex items-center gap-4 border-b border-border-subtle pb-4">
      {/* 좋아요 */}
      <button
        type="button"
        onClick={handleLike}
        className="flex items-center gap-1 text-text-muted"
      >
        <Heart size={20} strokeWidth={1} />
        <span className="text-sm">0</span>
      </button>

      {/* 댓글 */}
      <button
        type="button"
        onClick={handleComment}
        className="flex items-center gap-1 text-text-muted"
      >
        <MessageCircle size={20} strokeWidth={1} />
        <span className="text-sm">0</span>
      </button>

      {/* 공유 */}
      <button
        type="button"
        onClick={handleShare}
        className="text-text-muted"
        aria-label="공유"
      >
        <Share2 size={20} strokeWidth={1} />
      </button>

      {/* 북마크 */}
      <button
        type="button"
        onClick={handleBookmark}
        className="text-text-muted"
        aria-label="북마크"
      >
        <Bookmark size={20} strokeWidth={1} />
      </button>
    </div>
  )
}
