export type Comment = {
  id: number
  user_id?: number
  nickname: string
  content: string
  created_at: string
  like_count: number
  is_liked: boolean
  profile_image_url: string | null
}
