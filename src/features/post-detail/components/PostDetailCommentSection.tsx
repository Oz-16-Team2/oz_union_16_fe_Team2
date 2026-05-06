import { useState } from 'react'
import { useNavigate } from 'react-router'

import type { AxiosError } from 'axios'

import type { ApiErrorResponse } from '@/apis/api.types'
import { formatError } from '@/apis/api.utils'
import { ReportFormModal } from '@/components/common/overlay/modal/form/ReportFormModal'
import { CommentInput, CommentList, useToast } from '@/components/common/ui'
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

  const { data: comments = [], isLoading, isError } = useCommentsQuery(postId)
  const { refetch: refetchPostDetail } = usePostDetailQuery(postId)

  const { mutateAsync: createComment, isPending } = useCreateCommentMutation()
  const { mutate: toggleCommentLike } = useToggleCommentLikeMutation(postId)
  const { mutate: deleteComment } = useDeleteCommentMutation(postId)
  const { mutate: reportComment, isPending: isReportPending } =
    useReportCommentMutation()
  const { mutate: updateComment } = useUpdateCommentMutation(postId)

  const [reportCommentId, setReportCommentId] = useState<number | null>(null)

  // 비회원 액션 방어: 로그인하지 않은 사용자는 액션 대신 로그인 페이지로 이동
  const requireLogin = () => {
    if (!user) {
      navigate('/login')
      return true
    }

    return false
  }

  // 댓글 작성
  const handleSubmitComment = async (content: string) => {
    if (requireLogin()) return

    try {
      await createComment({ postId, content })
      refetchPostDetail()
    } catch {
      toast.error('댓글 작성에 실패했습니다.')
    }
  }

  // 댓글 좋아요
  const handleLikeComment = (commentId: number) => {
    if (requireLogin()) return

    const targetComment = comments.find((comment) => comment.id === commentId)
    if (!targetComment) return

    toggleCommentLike({
      commentId,
      isLiked: targetComment.isLiked,
    })
  }

  // 댓글 삭제
  const handleDeleteComment = (commentId: number) => {
    if (requireLogin()) return

    deleteComment(commentId, {
      onSuccess: () => {
        refetchPostDetail()
      },
    })
  }

  // 댓글 수정
  const handleEditComment = (commentId: number, content: string) => {
    if (requireLogin()) return

    updateComment({ commentId, content })
  }

  // 신고 메뉴 클릭: 비회원이면 로그인 이동, 회원이면 신고 모달 열기
  const handleOpenReportModal = (commentId: number) => {
    if (requireLogin()) return

    setReportCommentId(commentId)
  }

  // 신고 제출
  const handleSubmitReport = (data: { reason: string; content: string }) => {
    if (requireLogin()) return
    if (!reportCommentId) return

    // 신고 사유 선택 안 했을 때
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
            user
              ? '댓글을 입력해주세요'
              : '로그인 후 댓글을 작성할 수 있습니다.'
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
