import { useState } from 'react'

import { Heart, MoreHorizontal } from 'lucide-react'

import { ActionMenu } from '@/components/common/overlay'
import { Button } from '@/components/common/ui'
import { cn } from '@/utils/cn'
import { formatRelativeTime } from '@/utils/formatRelativeTime'

import type { Comment } from './Comment.type'

type CommentItemProps = {
  comment: Comment
  isOwner?: boolean
  isSelected?: boolean
  onSelect?: () => void
  onLike?: (id: number) => void
  onEdit?: (id: number, content: string) => void
  onDelete?: (id: number) => void
  onReport?: (id: number) => void
}

export function CommentItem({
  comment,
  isOwner = false,
  isSelected = false,
  onSelect,
  onLike,
  onEdit,
  onDelete,
  onReport,
}: CommentItemProps) {
  const {
    id,
    nickname,
    content,
    createdAt,
    likeCount,
    isLiked,
    profileImageUrl,
  } = comment

  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(content)

  const handleSaveEdit = () => {
    const trimmedContent = editContent.trim()
    if (!trimmedContent) return

    onEdit?.(id, trimmedContent)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditContent(content)
    setIsEditing(false)
  }

  return (
    <div
      className={cn(
        'flex gap-3 rounded-xl px-3 py-3 sm:px-4',
        isSelected && 'bg-primary-100/30'
      )}
      onClick={() => onSelect?.()}
    >
      {/* 프로필 */}
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200 sm:h-12 sm:w-12">
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt={`${nickname}의 프로필 이미지`}
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>

      {/* 댓글 내용 */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {/* 작성자 / 작성 시간 / 더보기 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-text-primary">
              {nickname}
            </span>
            <span className="text-xs text-text-muted">
              {formatRelativeTime(createdAt)}
            </span>
          </div>

          {/* 액션 메뉴: 본인 댓글은 수정/삭제, 타인 댓글은 신고 */}
          <div onClick={(e) => e.stopPropagation()}>
            <ActionMenu
              trigger={
                <MoreHorizontal size={16} className="text-text-primary" />
              }
              items={
                isOwner
                  ? [
                      {
                        label: '수정',
                        onClick: () => setIsEditing(true),
                      },
                      {
                        label: '삭제',
                        onClick: () => onDelete?.(id),
                        variant: 'danger' as const,
                      },
                    ]
                  : [
                      {
                        label: '신고',
                        onClick: () => onReport?.(id),
                      },
                    ]
              }
              align="right"
              size="sm"
            />
          </div>
        </div>

        {/* 본문 / 수정 모드 */}
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="min-h-20 w-full resize-none rounded-md border border-border-subtle bg-white px-3 py-2 text-sm text-text-primary outline-none focus:border-focus-border dark:border-white/15 dark:bg-white/5 dark:text-text-primary"
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="modal"
                size="sm"
                rounded="md"
                onClick={(e) => {
                  e.stopPropagation()
                  handleCancelEdit()
                }}
              >
                취소
              </Button>

              <Button
                type="button"
                variant="primary"
                size="sm"
                rounded="md"
                onClick={(e) => {
                  e.stopPropagation()
                  handleSaveEdit()
                }}
              >
                저장
              </Button>
            </div>
          </div>
        ) : (
          <p className="max-w-full wrap-break-word whitespace-pre-wrap text-sm text-text-primary">
            {content}
          </p>
        )}
        {/* 좋아요 */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onLike?.(id)
          }}
          className="group flex items-center gap-1"
          aria-label="댓글 좋아요"
        >
          <Heart
            className={cn(
              'h-4 w-4 transition-transform duration-200 group-hover:scale-110',
              isLiked ? 'fill-current text-error-500' : 'text-text-primary'
            )}
          />
          <span className="text-xs text-text-primary tabular-nums">
            {likeCount}
          </span>
        </button>
      </div>
    </div>
  )
}
