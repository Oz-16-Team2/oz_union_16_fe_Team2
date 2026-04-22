import { Heart, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/common/ui/button/Button'
import { cn } from '@/utils/cn'

import type { Comment } from './Comment.type'

const formatTime = (dateString: string) => {
  const now = new Date()
  const date = new Date(dateString)

  const diff = Math.floor((now.getTime() - date.getTime()) / 1000)

  {
    /* 분리예정 */
  }
  if (diff < 60) return '방금 전'
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`
  return `${Math.floor(diff / 86400)}일 전`
}

type CommentItemProps = {
  comment: Comment
  isOwner?: boolean
  isSelected?: boolean
  onSelect?: () => void
  onLike?: (id: number) => void
  onDelete?: (id: number) => void
}

export function CommentItem({
  comment,
  isOwner = false,
  isSelected = false,
  onSelect,
  onLike,
  onDelete,
}: CommentItemProps) {
  const {
    id,
    nickname,
    content,
    created_at,
    like_count,
    is_liked,
    profile_image_url,
  } = comment

  return (
    <div
      className={cn(
        'flex gap-3 rounded-xl  px-4 py-3',
        isSelected && 'bg-primary-100/50'
      )}
      onClick={() => onSelect?.()}
    >
      {/* 프로필 */}
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200">
        {profile_image_url ? (
          <img
            src={profile_image_url}
            alt={`${nickname}의 프로필 이미지`}
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>

      {/* 내용 */}
      <div className="flex flex-1 flex-col gap-1">
        {/* 상단 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-text-primary">
              {nickname}
            </span>
            <span className="text-xs text-text-muted">
              {formatTime(created_at)}
            </span>
          </div>

          {/* 더보기 */}
          {isOwner ? (
            <Button variant="ghost" size="sm" onClick={() => onDelete?.(id)}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          ) : null}
        </div>

        {/* 본문 */}
        <p className="text-sm text-text-primary">{content}</p>

        {/* 하단 액션 */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onLike?.(id)}
            className="flex items-center gap-1"
            aria-label="댓글 좋아요"
          >
            <Heart
              className={cn(
                'h-4 w-4',
                is_liked
                  ? 'fill-primary-500 text-primary-500'
                  : 'text-text-muted'
              )}
            />
            <span className="text-xs text-text-muted">{like_count}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
