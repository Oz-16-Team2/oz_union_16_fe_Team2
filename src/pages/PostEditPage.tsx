import { Navigate, useNavigate, useParams } from 'react-router'

import { useToast } from '@/components/common/ui'
import {
  PostFormLayout,
  PostFormSkeleton,
  toPostFormData,
} from '@/features/post'
import { usePostQuery, useUpdatePostMutation } from '@/query/post'

export function PostEditPage() {
  const navigate = useNavigate()
  const toast = useToast()
  const { id } = useParams<{ id: string }>()
  const postId = Number(id)

  const { data: post, isLoading, isError } = usePostQuery(postId)

  const { mutate: updatePost, isPending } = useUpdatePostMutation(postId, {
    onSuccess: () => {
      toast.success('게시글이 수정되었습니다.')
      navigate('/')
    },
    onError: () => toast.error('게시글 수정에 실패했습니다.'),
  })

  if (isNaN(postId)) return <Navigate to="/not-found" replace />
  if (isLoading) return <PostFormSkeleton />
  if (isError || !post) return <Navigate to="/not-found" replace />

  const defaultValues = toPostFormData(post)

  return (
    <PostFormLayout
      mode="edit"
      defaultValues={defaultValues}
      onSubmit={updatePost}
      onCancel={() => navigate(-1)}
      isPending={isPending}
    />
  )
}
