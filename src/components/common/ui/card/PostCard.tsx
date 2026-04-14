import { useState } from 'react'

import { Bookmark, Heart, MessageCircle, Share2 } from 'lucide-react'

import { Button } from '@/components/common/ui'

import { Card } from './Card'
import type { PostCardProps } from './PostCard.types'

export type { PostCardProps } from './PostCard.types'

// 추후 hook으로 정리 필요
export function PostCard({
  image,
  profileImage,
  nickname,
  createdAt,
  title,
  tags,
  preview,
  likeCount,
  commentCount,
  isBookmarked = false,
  isLiked = false,
  onClick,
  onLike,
  onShare,
  onBookmark,
}: PostCardProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked)
  const [liked, setLiked] = useState(isLiked)
  const [localLikeCount, setLocalLikeCount] = useState(likeCount)

  // API 연결 시 낙관적 업데이트나 useEffect 등으로 동기화 처리가 필요
  const toggleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setLocalLikeCount((prev) => (liked ? prev - 1 : prev + 1))
    setLiked((prev) => !prev)
    onLike()
  }

  const toggleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setBookmarked((prev) => !prev)
    onBookmark()
  }

  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onShare()
  }

  return (
    <Card
      className="p-0 h-84.5 overflow-hidden flex flex-col cursor-pointer"
      onClick={onClick}
    >
      {/* 이미지 (선택) */}
      {image && (
        <img
          src={image}
          alt={`${title} 이미지`}
          className="w-full h-32 object-cover shrink-0"
        />
      )}

      {/* 게시글 내용 */}
      <div className="flex flex-col flex-1 min-h-0 px-4 py-5">
        {/* 프로필 */}
        <div className="flex items-center gap-2 mb-2">
          <img
            src={profileImage}
            alt={nickname}
            className="size-7 rounded-full object-cover shrink-0"
          />
          <div className="min-w-0 text-2xs">
            <p className="font-semibold text-text-primary truncate">
              {nickname}
            </p>
            {/* TODO: 시간 포맷 변경 필요 -> 2026.04.14 12:00 로 할건지 몇시간 전, 몇일 전으로 할건지 정해지면 */}
            <p className="text-text-muted">{createdAt}</p>
          </div>
        </div>

        {/* 제목 */}
        <h3 className="text-text-primary line-clamp-1 mb-0 font-semibold">
          {title}
        </h3>

        {/* 태그 */}
        {tags.length > 0 && (
          <div className="flex flex-wrap text-xs text-text-muted gap-1 mb-3">
            {tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        )}

        {/* 내용 미리보기 */}
        <p className="text-sm text-text-muted line-clamp-2">{preview}</p>
      </div>

      {/* 하단 액션 */}
      <div className="flex items-center border-t border-border-default px-5 py-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-text-muted">
            <Button
              variant="ghost"
              size="sm"
              aria-label="좋아요"
              aria-pressed={liked}
              className="p-0 hover:bg-transparent"
              onClick={toggleLike}
            >
              <Heart
                size={16}
                className={
                  liked ? 'fill-current text-error-500' : 'text-text-muted'
                }
              />
            </Button>
            <span className="tabular-nums min-w-[1ch]">{localLikeCount}</span>
          </div>
          <span className="flex items-center gap-1 text-xs text-text-muted">
            <MessageCircle size={16} />
            <span className="tabular-nums min-w-[1ch]">{commentCount}</span>
          </span>
          <Button
            variant="ghost"
            size="sm"
            aria-label="공유하기"
            className="p-0 hover:bg-transparent"
            onClick={handleShare}
          >
            <Share2 size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            aria-label={bookmarked ? '스크랩 취소' : '스크랩'}
            aria-pressed={bookmarked}
            className="p-0 hover:bg-transparent"
            onClick={toggleBookmark}
          >
            <Bookmark
              size={16}
              className={
                bookmarked ? 'fill-current text-primary-600' : 'text-text-muted'
              }
            />
          </Button>
        </div>
      </div>
    </Card>
  )
}
