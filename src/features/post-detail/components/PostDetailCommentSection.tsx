import { CommentInput, CommentList } from '@/components/common/ui/comment'
import { useCommentsQuery } from '@/query/post/useCommentsQuery'
import { useCreateCommentMutation } from '@/query/post/useCreateCommentMutation'

type PostDetailCommentSectionProps = {
  postId: number
}

const CURRENT_USER_ID = 1

export function PostDetailCommentSection({
  postId,
}: PostDetailCommentSectionProps) {
  const { data: comments = [], isLoading, isError } = useCommentsQuery(postId)

  const { mutate: createComment, isPending } = useCreateCommentMutation()

  const handleSubmitComment = (content: string) => {
    createComment({
      postId,
      content,
    })
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
      <CommentInput isLoading={isPending} onSubmit={handleSubmitComment} />

      <div className="mt-8">
        <CommentList
          comments={comments}
          currentUserId={CURRENT_USER_ID}
          isLoading={isLoading}
          onLike={() => {}}
        />
      </div>
    </section>
  )
}
