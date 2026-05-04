import { Navigate, useNavigate, useParams } from 'react-router'

import { useQueryClient } from '@tanstack/react-query'

import { useToast } from '@/components/common/ui'
import {
  PostFormLayout,
  PostFormSkeleton,
  toPostFormData,
} from '@/features/post'
import { usePostQuery, useUpdatePostMutation } from '@/query/post'

export function PostEditPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const toast = useToast()
  const { id } = useParams<{ id: string }>()
  const postId = Number(id)

  const { data: post, isLoading, isError } = usePostQuery(postId)

  const { mutate: updatePost, isPending } = useUpdatePostMutation(postId, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postDetail', postId] })
      queryClient.invalidateQueries({ queryKey: ['post', postId] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })

      toast.success('게시글이 수정되었습니다.')
      navigate(`/post/${postId}`)
    },
    onError: (message) => toast.error(message),
  })

  if (!Number.isFinite(postId)) return <Navigate to="/not-found" replace />
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
