import { useState } from 'react'

type UsePostCardActionsProps = {
  likeCount: number
  isLiked: boolean
  isScrapped: boolean
  onLike: () => void
  onScrap: () => void
  onShare: () => void
}

export function usePostCardActions({
  likeCount,
  isLiked,
  isScrapped,
  onLike,
  onScrap,
  onShare,
}: UsePostCardActionsProps) {
  const [liked, setLiked] = useState(isLiked)
  const [scrapped, setScrapped] = useState(isScrapped)
  // 사용자 기준 count 값 --> like API 연동 후 필요없어질 상태
  const [localLikeCount, setLocalLikeCount] = useState(likeCount)

  const toggleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const newLiked = !liked
    setLiked(newLiked)
    setLocalLikeCount((prev) => (newLiked ? prev + 1 : prev - 1))
    onLike()
  }

  const toggleScrap = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setScrapped((prev) => !prev)
    onScrap()
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
