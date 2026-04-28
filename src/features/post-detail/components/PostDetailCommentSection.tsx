import { CommentInput, CommentList } from '@/components/common/ui/comment'
import { useCommentsQuery } from '@/query/post/useCommentsQuery'
import { useCreateCommentMutation } from '@/query/post/useCreateCommentMutation'
import { useAuthStore } from '@/store/authStore'

type PostDetailCommentSectionProps = {
  postId: number
}

export function PostDetailCommentSection({
  postId,
}: PostDetailCommentSectionProps) {
  const user = useAuthStore((state) => state.user)
  const { data: comments = [], isLoading, isError } = useCommentsQuery(postId)
  const { mutate: createComment, isPending } = useCreateCommentMutation()

  const handleSubmitComment = (content: string) => {
    createComment({ postId, content })
  }

  if (isError) {
    return (
      <section>
        <p className="py-6 text-center text-sm text-danger-500">
          댓글을 불러오지 못했습니다.
        </p>
      </section>
    )
  }

  return (
    <section>
      <CommentInput
        isLoading={isPending}
        onSubmit={handleSubmitComment}
        profileImageUrl={user?.profileImageUrl}
        nickname={user?.nickname}
      />

      <div className="mt-8">
        <CommentList
          comments={comments}
          currentUserId={0} // TODO: /accounts/me 연동 후 user?.id 로 교체
          isLoading={isLoading}
          onLike={() => {}}
        />
      </div>
    </section>
  )
}
