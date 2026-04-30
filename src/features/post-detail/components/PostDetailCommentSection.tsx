import { useState } from 'react'
import { useNavigate } from 'react-router'

import { ReportFormModal } from '@/components/common/overlay/modal/form/ReportFormModal'
import { CommentInput, CommentList, useToast } from '@/components/common/ui'
import { useCommentsQuery } from '@/query/post/useCommentsQuery'
import { useCreateCommentMutation } from '@/query/post/useCreateCommentMutation'
import { useDeleteCommentMutation } from '@/query/post/useDeleteCommentMutation'
import { useReportCommentMutation } from '@/query/post/useReportCommentMutation'
import { useToggleCommentLikeMutation } from '@/query/post/useToggleCommentLikeMutation'
import { useUpdateCommentMutation } from '@/query/post/useUpdateCommentMutation'
import { useAuthStore } from '@/store/authStore'

const reportOptions = [
  { label: '욕설/비방', value: 'abuse' },
  { label: '스팸/광고', value: 'spam' },
  { label: '부적절한 내용', value: 'inappropriate' },
  { label: '기타', value: 'etc' },
]

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
  const { mutate: createComment, isPending } = useCreateCommentMutation()
  const { mutate: toggleCommentLike } = useToggleCommentLikeMutation(postId)
  const { mutate: deleteComment } = useDeleteCommentMutation(postId)
  const { mutate: reportComment } = useReportCommentMutation()
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
  const handleSubmitComment = (content: string) => {
    if (requireLogin()) return

    createComment({ postId, content })
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

    deleteComment(commentId)
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
        onError: (error: any) => {
          const status = error?.response?.status

          if (status === 409) {
            toast.error('이미 신고된 댓글입니다.')
            return
          }

          toast.error('신고에 실패했습니다.')
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
          onSubmit={handleSubmitComment}
          profileImageUrl={user?.profileImageUrl}
          nickname={user?.nickname}
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
          options={reportOptions}
          onClose={() => setReportCommentId(null)}
          onSubmit={handleSubmitReport}
        />
      ) : null}
    </>
  )
}
