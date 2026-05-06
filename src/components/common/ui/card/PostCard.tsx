import { useState } from 'react'
import { useNavigate } from 'react-router'

import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreVertical,
  Share2,
} from 'lucide-react'

import { ActionMenu } from '@/components/common/overlay/dropdown/action-menu/ActionMenu'
import { ConfirmModal } from '@/components/common/overlay/modal/confirm/ConfirmModal'
import { ReportFormModal } from '@/components/common/overlay/modal/form/ReportFormModal'
import { useToast } from '@/components/common/ui/toast/useToast'
import { useDeletePostMutation } from '@/query/post'
import { cn } from '@/utils/cn'
import { formatRelativeTime } from '@/utils/formatRelativeTime'

import { Button } from '../button/Button'
import { Card } from './Card'
import type { PostCardProps } from './PostCard.types'
import { usePostCardActions } from './usePostCardActions'
import { usePostCardReport } from './usePostCardReport'

export function PostCard({
  postId,
  images,
  profileImageUrl,
  nickname,
  createdAt,
  title,
  tags,
  contentPreview,
  likeCount,
  commentCount,
  isScrapped = false,
  isLiked = false,
  isOwner = false,
  onShare,
}: PostCardProps) {
  const navigate = useNavigate()
  const toast = useToast()

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleCopyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/post/${postId}`
      )
      toast.success('게시글 링크가 복사되었습니다.')
    } catch {
      toast.error('게시글 링크 복사에 실패했습니다.')
    }
  }

  const {
    liked,
    scrapped,
    localLikeCount,
    toggleLike,
    toggleScrap,
    handleShare,
  } = usePostCardActions({
    postId,
    likeCount,
    isLiked,
    isScrapped,
    onShare: onShare ?? handleCopyShareUrl,
  })

  const {
    showReportForm,
    isPending,
    openReportForm,
    closeReportForm,
    handleReportSubmit,
    reportReasons,
  } = usePostCardReport(postId)

  const { mutate: deletePost } = useDeletePostMutation({
    onSuccess: () => {
      toast.success('게시글이 삭제되었습니다.')
      setShowDeleteConfirm(false)
    },
    onError: (message) => {
      toast.error(message)
      setShowDeleteConfirm(false)
    },
  })

  const handleDelete = () => deletePost(postId)

  const ownerMenuItems = [
    { label: '수정', onClick: () => navigate(`/post/${postId}/edit`) },
    {
      label: '삭제',
      onClick: () => setShowDeleteConfirm(true),
      variant: 'danger' as const,
    },
  ]

  const guestMenuItems = [{ label: '신고', onClick: openReportForm }]

  const actionMenu = (
    <div onClick={(e) => e.stopPropagation()}>
      <ActionMenu
        trigger={
          <MoreVertical
            size={16}
            className="text-text-muted hover:text-text-primary transition-colors"
          />
        }
        items={isOwner ? ownerMenuItems : guestMenuItems}
        align="right"
        size="sm"
      />
    </div>
  )

  return (
    <>
      <Card
        className="p-0 h-84 flex flex-col cursor-pointer"
        onClick={() => navigate(`/post/${postId}`)}
      >
        <PostCardImage src={images} title={title} />

        <div className="flex flex-col flex-1 min-h-0 px-4 py-5">
          <PostCardProfile
            image={profileImageUrl}
            nickname={nickname}
            createdAt={createdAt}
            actionMenu={actionMenu}
          />

          <h3 className="text-text-primary line-clamp-1 mb-0 font-semibold">
            {title}
          </h3>

          <PostCardTags tags={tags} />

          <p className="text-sm text-text-muted line-clamp-2">
            {contentPreview}
          </p>
        </div>

        <PostCardFooter
          liked={liked}
          likeCount={localLikeCount}
          commentCount={commentCount}
          scrapped={scrapped}
          onLike={toggleLike}
          onShare={handleShare}
          onScrap={toggleScrap}
        />
      </Card>

      {showDeleteConfirm && (
        <ConfirmModal
          description="게시글을 삭제하시겠습니까? 삭제된 게시글은 복구할 수 없습니다."
          confirmLabel="삭제"
          onConfirm={handleDelete}
          onClose={() => setShowDeleteConfirm(false)}
        />
      )}

      {showReportForm && (
        <ReportFormModal
          title="게시글 신고"
          options={reportReasons}
          isSubmitting={isPending}
          onSubmit={handleReportSubmit}
          onClose={closeReportForm}
        />
      )}
    </>
  )
}

// --- 내부 서브 컴포넌트 ---

const PostCardImage = ({ src, title }: { src?: string[]; title: string }) => {
  if (!src || src.length === 0) return null
  return (
    <div className="w-full h-32 shrink-0 bg-border-default overflow-hidden rounded-t-2xl">
      <img
        src={src[0]}
        alt={`${title} 이미지`}
        loading="lazy"
        decoding="async"
        className="size-full object-cover"
      />
    </div>
  )
}

const PostCardProfile = ({
  image,
  nickname,
  createdAt,
  actionMenu,
}: {
  image: string | null
  nickname: string
  createdAt: string
  actionMenu: React.ReactNode
}) => (
  <div className="flex items-center justify-between gap-2 mb-2">
    <div className="flex items-center gap-2 min-w-0">
      {image ? (
        <img
          src={image}
          alt={nickname}
          className="size-7 rounded-full object-cover shrink-0"
        />
      ) : (
        <div className="size-7 rounded-full bg-border-default shrink-0 flex items-center justify-center text-[10px] font-bold text-text-muted">
          {nickname[0]}
        </div>
      )}
      <div className="min-w-0 text-2xs">
        <p className="font-semibold text-text-primary truncate">{nickname}</p>
        <p className="text-text-muted">{formatRelativeTime(createdAt)}</p>
      </div>
    </div>
    {actionMenu}
  </div>
)

const PostCardTags = ({ tags }: { tags: string[] }) => {
  if (tags.length === 0) return null
  return (
    <div className="flex flex-wrap text-xs text-text-muted gap-1 mb-3">
      {tags.map((tag) => (
        <span key={tag}>#{tag}</span>
      ))}
    </div>
  )
}

type PostCardFooterProps = {
  liked: boolean
  likeCount: number
  commentCount: number
  scrapped: boolean
  onLike: (e: React.MouseEvent<HTMLButtonElement>) => void
  onShare: (e: React.MouseEvent<HTMLButtonElement>) => void
  onScrap: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const PostCardFooter = ({
  liked,
  likeCount,
  commentCount,
  scrapped,
  onLike,
  onShare,
  onScrap,
}: PostCardFooterProps) => (
  <div className="flex items-center border-t border-border-default px-3 py-1.5 mt-auto">
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          aria-label="좋아요"
          aria-pressed={liked}
          className="group p-0 hover:bg-transparent"
          onClick={onLike}
        >
          <Heart
            size={20}
            className={cn(
              liked ? 'fill-current text-error-500' : 'text-text-primary',
              'transition-transform duration-200 group-hover:scale-110'
            )}
          />
        </Button>
        <span className="tabular-nums text-sm text-text-primary">
          {likeCount}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <MessageCircle
          size={20}
          className="text-text-primary hover:scale-110 transition-transform duration-200"
        />
        <span className="tabular-nums text-sm text-text-primary">
          {commentCount}
        </span>
      </div>

      <Button
        variant="ghost"
        size="sm"
        aria-label="공유하기"
        className="group p-0 hover:bg-transparent"
        onClick={onShare}
      >
        <Share2
          size={20}
          className="text-text-primary transition-transform duration-200 group-hover:scale-110"
        />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        aria-label={scrapped ? '스크랩 취소' : '스크랩'}
        aria-pressed={scrapped}
        className="group p-0 hover:bg-transparent"
        onClick={onScrap}
      >
        <Bookmark
          size={20}
          className={cn(
            scrapped ? 'fill-current text-primary-600' : 'text-text-primary',
            'transition-transform duration-200 group-hover:scale-110'
          )}
        />
      </Button>
    </div>
  </div>
)
