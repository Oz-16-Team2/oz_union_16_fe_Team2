import { useNavigate } from 'react-router'

import { useToast } from '@/components/common/ui'
import { PostFormLayout } from '@/features/post'
import { useCreatePostMutation } from '@/query/post'

export function PostCreatePage() {
  const navigate = useNavigate()
  const toast = useToast()

  const { mutate: createPost, isPending } = useCreatePostMutation({
    onSuccess: () => {
      navigate(-1)
    }, // TODO: 추후 게시글 목록 페이지로 이동하도록 변경 필요
    onError: () => toast.error('게시글 생성에 실패했습니다.'),
  })

  return (
    <PostFormLayout
      mode="create"
      onSubmit={createPost}
      onCancel={() => navigate(-1)}
      isPending={isPending}
    />
  )
}
