import { Navigate, useParams } from 'react-router'

import { PostDetailLayout } from '@/features/post-detail/components/PostDetailLayout'
import { usePostDetailQuery } from '@/query/post/usePostDetailQuery'

export function PostDetailPage() {
  const { postId: postIdParam } = useParams<{ postId: string }>()
  const postId = Number(postIdParam)

  const { data: post, isLoading, error } = usePostDetailQuery(postId)

  if (!Number.isFinite(postId)) return <Navigate to="/not-found" replace />
  if (isLoading) return <div>로딩중</div>
  if (error) return <div>에러</div>
  if (!post) return <div>게시글 없음</div>

  console.log(post)

  return (
    <div className="flex min-h-full justify-start">
      <PostDetailLayout post={post} />
    </div>
  )
}
