import { useState } from 'react'
import { useNavigate } from 'react-router'

import type { AxiosError } from 'axios'

import type { ApiErrorResponse } from '@/apis/api.types'
import { formatError } from '@/apis/api.utils'
import { ReportFormModal } from '@/components/common/overlay/modal/form/ReportFormModal'
import {
  CommentInput,
  CommentList,
  Pagination,
  useToast,
} from '@/components/common/ui'
import { POST_REPORT_REASONS } from '@/components/common/ui/card/usePostCardReport'
import { useCommentsQuery } from '@/query/post/useCommentsQuery'
import { useCreateCommentMutation } from '@/query/post/useCreateCommentMutation'
import { useDeleteCommentMutation } from '@/query/post/useDeleteCommentMutation'
import { usePostDetailQuery } from '@/query/post/usePostDetailQuery'
import { useReportCommentMutation } from '@/query/post/useReportCommentMutation'
import { useToggleCommentLikeMutation } from '@/query/post/useToggleCommentLikeMutation'
import { useUpdateCommentMutation } from '@/query/post/useUpdateCommentMutation'
import { useAuthStore } from '@/store/authStore'

type PostDetailCommentSectionProps = {
  postId: number
}

export function PostDetailCommentSection({
  postId,
}: PostDetailCommentSectionProps) {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const toast = useToast()
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading, isError } = useCommentsQuery(postId, currentPage)
  const comments = data?.comments ?? []
  const totalPages = data?.totalPages ?? 1

  const { refetch: refetchPostDetail } = usePostDetailQuery(postId)

  const { mutateAsync: createComment, isPending } = useCreateCommentMutation()
  const { mutate: toggleCommentLike } = useToggleCommentLikeMutation(postId)
  const { mutate: deleteComment } = useDeleteCommentMutation(postId)
  const { mutate: reportComment, isPending: isReportPending } =
    useReportCommentMutation()
  const { mutate: updateComment } = useUpdateCommentMutation(postId)

  const [reportCommentId, setReportCommentId] = useState<number | null>(null)

  const requireLogin = () => {
    if (!user) {
      navigate('/login')
      return true
    }
    return false
  }

  const handleSubmitComment = async (content: string) => {
    if (requireLogin()) return

    try {
      await createComment({ postId, content })

      setCurrentPage(1)

      toast.success('댓글이 작성되었습니다.')
    } catch {
      toast.error('댓글 작성에 실패했습니다.')
    }
  }

  const handleLikeComment = (commentId: number) => {
    if (requireLogin()) return
    const targetComment = comments.find((comment) => comment.id === commentId)
    if (!targetComment) return
    toggleCommentLike({ commentId, isLiked: targetComment.isLiked })
  }

  const handleDeleteComment = (commentId: number) => {
    if (requireLogin()) return
    deleteComment(commentId, {
      onSuccess: () => {
        refetchPostDetail()
      },
    })
  }

  const handleEditComment = (commentId: number, content: string) => {
    if (requireLogin()) return
    updateComment({ commentId, content })
  }

  const handleOpenReportModal = (commentId: number) => {
    if (requireLogin()) return
    setReportCommentId(commentId)
  }

  const handleSubmitReport = (data: { reason: string; content: string }) => {
    if (requireLogin()) return
    if (!reportCommentId) return
    if (!data.reason) {
      toast.error('신고 사유를 선택해주세요.')
      return
    }
    reportComment(
      {
        commentId: reportCommentId,
        reasonType: data.reason,
        reasonDetail: data.content,
      },
      {
        onSuccess: () => {
          toast.success('신고가 접수되었습니다.')
          setReportCommentId(null)
        },
        onError: (error) => {
          const axiosError = error as AxiosError<ApiErrorResponse>
          const detail = axiosError.response?.data.error_detail
          toast.error(
            detail ? formatError(detail) : '신고 접수에 실패했습니다.'
          )
        },
      }
    )
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
    <>
      <section>
        <CommentInput
          isLoading={isPending}
          disabled={!user}
          onSubmit={handleSubmitComment}
          profileImageUrl={user?.profileImageUrl}
          nickname={user?.nickname}
          placeholder={
            user ? '댓글을 입력해주세요' : '로그인 후 이용 가능합니다.'
          }
        />

        <div className="mt-8">
          <CommentList
            comments={comments}
            currentUserId={user?.id}
            isLoading={isLoading}
            onLike={handleLikeComment}
            onDelete={handleDeleteComment}
            onReport={handleOpenReportModal}
            onEdit={handleEditComment}
          />
        </div>

        <div className="mt-4 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>

      {reportCommentId ? (
        <ReportFormModal
          title="신고 선택 및 작성"
          options={POST_REPORT_REASONS}
          isSubmitting={isReportPending}
          onClose={() => setReportCommentId(null)}
          onSubmit={handleSubmitReport}
        />
      ) : null}
    </>
  )
}
