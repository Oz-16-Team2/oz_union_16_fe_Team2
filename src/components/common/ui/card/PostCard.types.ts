export type PostCardProps = {
  image?: string
  profileImage: string
  nickname: string
  createdAt: string
  title: string
  tags: string[]
  preview: string
  likeCount: number
  commentCount: number
  isBookmarked?: boolean
  isLiked?: boolean
  onClick?: () => void
  onLike: () => void
  onShare: () => void
  onBookmark: () => void
}
