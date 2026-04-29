export type PostCardProps = {
  postId: number
  images: string[]
  profileImageUrl: string | null
  nickname: string
  createdAt: string
  title: string
  tags: string[]
  contentPreview: string
  likeCount: number
  commentCount: number
  isScrapped?: boolean
  isLiked?: boolean
  isOwner?: boolean
  onShare?: () => void
}
