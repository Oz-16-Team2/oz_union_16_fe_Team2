import { useState } from 'react'

import type { Comment } from './Comment.type'
import { CommentItem } from './CommentItem'

type CommentListProps = {
  comments: Comment[]
  currentUserId?: number
  isLoading?: boolean
  emptyMessage?: string
  onLike?: (id: number) => void
  onDelete?: (id: number) => void
  onReport?: (id: number) => void
  onEdit?: (id: number, content: string) => void
}

export function CommentList({
  comments,
  currentUserId,
  isLoading = false,
  emptyMessage = '아직 댓글이 없어요. 첫 댓글을 남겨보세요.',
  onLike,
  onDelete,
  onReport,
  onEdit,
}: CommentListProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  if (isLoading) {
    return (
      <div className="py-6 text-center text-sm text-text-muted">
        댓글을 불러오는 중입니다.
      </div>
    )
  }

  if (comments.length === 0) {
    return (
      <div className="py-6 text-center text-sm text-text-muted">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isOwner={!!currentUserId && currentUserId === comment.userId}
          isSelected={selectedId === comment.id}
          onSelect={() => setSelectedId(comment.id)}
          onLike={onLike}
          onDelete={onDelete}
          onReport={onReport}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}
