export type Comment = {
  id: number
  userId: number
  nickname: string
  content: string
  createdAt: string
  likeCount: number
  isLiked: boolean
  profileImageUrl: string | null
}
