export type PostCardProps = {
  image?: string
  profileImage: string
  nickname: string
  createdAt: string
  title: string
  tags: string[]
  contentPreview: string
  likeCount: number
  commentCount: number
  isScrapped?: boolean
  isLiked?: boolean
  onClick?: () => void
  onLike: () => void
  onShare: () => void
  onScrap: () => void
}
