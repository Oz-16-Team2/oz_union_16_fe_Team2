import { useNavigate, useParams } from 'react-router'

import type { PostFormData } from '@/features/post'
import { PostFormLayout, toApiUpdateRequest } from '@/features/post'

export function PostEditPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  function handleSubmit(data: PostFormData) {
    if (data.postId === undefined) return
    const body = toApiUpdateRequest(data)
    // TODO: PATCH /api/v1/posts/:id 연동
    // defaultValues는 GET /api/v1/posts/:id 응답 후 PostFormLayout에 전달 (로딩 중 렌더링 보류)
    console.log(`edit post ${id}:`, body)
  }

  return (
    <PostFormLayout
      mode="edit"
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
    />
  )
}
