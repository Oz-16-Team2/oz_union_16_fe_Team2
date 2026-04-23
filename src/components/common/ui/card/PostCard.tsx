import { Bookmark, Heart, MessageCircle, Share2 } from 'lucide-react'

import { Button } from '@/components/common/ui'
import { cn } from '@/utils/cn'

import { Card } from './Card'
import type { PostCardProps } from './PostCard.types'
import { usePostCardActions } from './usePostCardActions'

export function PostCard({
  image,
  profileImage,
  nickname,
  createdAt,
  title,
  tags,
  contentPreview,
  likeCount,
  commentCount,
  isScrapped = false,
  isLiked = false,
  onClick,
  onLike,
  onShare,
  onScrap,
}: PostCardProps) {
  const {
    liked,
    scrapped,
    localLikeCount,
    toggleLike,
    toggleScrap,
    handleShare,
  } = usePostCardActions({
    likeCount,
    isLiked,
    isScrapped,
    onLike,
    onScrap,
    onShare,
  })

  return (
    <Card
      className="p-0 h-84 overflow-hidden flex flex-col cursor-pointer"
      onClick={onClick}
    >
      <PostCardImage src={image} title={title} />

      <div className="flex flex-col flex-1 min-h-0 px-4 py-5">
        <PostCardProfile
          image={profileImage}
          nickname={nickname}
          createdAt={createdAt}
        />

        <h3 className="text-text-primary line-clamp-1 mb-0 font-semibold">
          {title}
        </h3>

        <PostCardTags tags={tags} />

        <p className="text-sm text-text-muted line-clamp-2">{contentPreview}</p>
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
  )
}

// --- 내부 서브 컴포넌트 ---

const PostCardImage = ({ src, title }: { src?: string; title: string }) => {
  if (!src) return null
  return (
    <div className="w-full h-32 shrink-0 bg-border-default overflow-hidden">
      <img
        src={src}
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
}: {
  image: string
  nickname: string
  createdAt: string
}) => (
  <div className="flex items-center gap-2 mb-2">
    <img
      src={image}
      alt={nickname}
      loading="lazy"
      decoding="async"
      className="size-7 rounded-full object-cover shrink-0"
    />
    <div className="min-w-0 text-2xs">
      <p className="font-semibold text-text-primary truncate">{nickname}</p>
      <p className="text-text-muted">{createdAt}</p>
    </div>
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
