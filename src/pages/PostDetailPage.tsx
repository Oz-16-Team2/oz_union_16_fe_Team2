import { Navigate, useParams } from 'react-router'

import type { AxiosError } from 'axios'

import { PostDetailLayout } from '@/features/post-detail/components/PostDetailLayout'
import { usePostDetailQuery } from '@/query/post/usePostDetailQuery'

export function PostDetailPage() {
  const { postId: postIdParam } = useParams<{ postId: string }>()
  const postId = Number(postIdParam)

  const { data: post, isLoading, error } = usePostDetailQuery(postId)

  if (!Number.isFinite(postId)) return <Navigate to="/not-found" replace />
  if (isLoading) return <div>로딩중</div>

  if (error) {
    const axiosError = error as AxiosError

    if (axiosError.response?.status === 404) {
      return <Navigate to="/not-found" replace />
    }

    return <div>에러가 발생했습니다.</div>
  }

  if (!post) return <div>게시글 없음</div>

  return (
    <div className="flex min-h-full justify-center">
      <PostDetailLayout post={post} />
    </div>
  )
}
