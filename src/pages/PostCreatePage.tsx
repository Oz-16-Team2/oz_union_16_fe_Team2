import { useNavigate } from 'react-router'

import { useToast } from '@/components/common/ui'
import { PostFormLayout } from '@/features/post'
import { useCreatePostMutation } from '@/query/post'

export function PostCreatePage() {
  const navigate = useNavigate()
  const toast = useToast()

  const { mutate: createPost, isPending } = useCreatePostMutation({
    onSuccess: () => {
      toast.success('게시글이 등록되었습니다.')
      navigate('/')
    },
    onError: () => toast.error('게시글 생성에 실패했습니다.'),
  })

  return (
    <PostFormLayout
      mode="create"
      onSubmit={createPost}
      onCancel={() => navigate('/')}
      isPending={isPending}
    />
  )
}
