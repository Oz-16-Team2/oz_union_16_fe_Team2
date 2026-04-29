import { useLikeMutation } from '@/query/post/useLikeMutation'
import { useScrapMutation } from '@/query/post/useScrapMutation'

type UsePostCardActionsProps = {
  postId: number
  likeCount: number
  isLiked: boolean
  isScrapped: boolean
  onShare?: () => void
}

export function usePostCardActions({
  postId,
  likeCount,
  isLiked,
  isScrapped,
  onShare = () => {},
}: UsePostCardActionsProps) {
  const {
    liked,
    likeCount: localLikeCount,
    toggleLike: mutateLike,
  } = useLikeMutation({
    postId,
    initialLiked: isLiked,
    initialLikeCount: likeCount,
  })

  const { scrapped, toggleScrap: mutateScrap } = useScrapMutation({
    postId,
    initialScrapped: isScrapped,
  })

  const toggleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    mutateLike()
  }

  const toggleScrap = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    mutateScrap()
  }

  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onShare()
  }

  return {
    liked,
    scrapped,
    localLikeCount,
    toggleLike,
    toggleScrap,
    handleShare,
  }
}
