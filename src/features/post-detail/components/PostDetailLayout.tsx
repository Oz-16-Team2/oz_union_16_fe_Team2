import { useState } from 'react'
import { useNavigate } from 'react-router'

import type { AxiosError } from 'axios'
import { ChevronLeft } from 'lucide-react'

import type { ApiErrorResponse } from '@/apis/api.types'
import { formatError } from '@/apis/api.utils'
import { ConfirmModal } from '@/components/common/overlay/modal/confirm/ConfirmModal'
import { ReportFormModal } from '@/components/common/overlay/modal/form/ReportFormModal'
import { Button } from '@/components/common/ui'
import { POST_REPORT_REASONS } from '@/components/common/ui/card/usePostCardReport'
import { useToast } from '@/components/common/ui/toast/useToast'
import type { PostDetailData } from '@/features/post/post.types'
import { useDeletePostMutation } from '@/query/post/useDeletePostMutation'
import { useReportPostMutation } from '@/query/post/useReportPostMutation'
import { useAuthStore } from '@/store/authStore'

import { PostDetailActions } from './PostDetailActions'
import { PostDetailBody } from './PostDetailBody'
import { PostDetailCommentSection } from './PostDetailCommentSection'
import { PostDetailHeader } from './PostDetailHeader'
import { PostDetailVoteSection } from './PostDetailVoteSection'
import { PostGoalSection } from './PostGoalSection'

type PostDetailLayoutProps = {
  post: PostDetailData
}

export function PostDetailLayout({ post }: PostDetailLayoutProps) {
  const navigate = useNavigate()
  const toast = useToast()
  const user = useAuthStore((state) => state.user)
  const isGuest = !user

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)

  const deleteMutation = useDeletePostMutation({
    onSuccess: () => {
      setIsDeleteModalOpen(false)
      navigate('/')
    },
    onError: (message) => toast.error(message),
  })

  const reportMutation = useReportPostMutation()

  const handleDelete = () => {
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    deleteMutation.mutate(post.postId)
  }

  const handleReport = () => {
    setIsReportModalOpen(true)
  }

  const handleBack = () => {
    navigate(-1)
  }

  const handleReportSubmit = (data: { reason: string; content: string }) => {
    reportMutation.mutate(
      {
        postId: post.postId,
        reasonType: data.reason,
        reasonDetail: data.content,
      },
      {
        onSuccess: () => {
          toast.success('신고가 접수되었습니다.')
          setIsReportModalOpen(false)
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

  const ownerMenuItems = [
    { label: '수정', onClick: () => navigate(`/post/${post.postId}/edit`) },
    {
      label: '삭제',
      onClick: handleDelete,
      variant: 'danger' as const,
    },
  ]

  const guestMenuItems = [{ label: '신고', onClick: handleReport }]

  const menuItems = post.isOwner ? ownerMenuItems : guestMenuItems

  return (
    <>
      <div className="flex w-full max-w-300 flex-col gap-3">
        <article className="w-full rounded-2xl border border-border-default bg-white px-5 py-5 shadow-card-main dark:bg-gray-950 sm:px-8 sm:py-6">
          {/* 뒤로가기 버튼 */}
          <Button
            variant={'ghost'}
            onClick={handleBack}
            aria-label="뒤로 이동"
            className="mb-3 px-0 hover:bg-transparent hover:text-text-primary sm:pr-2"
          >
            <ChevronLeft size={22} aria-hidden="true" />
            <span className="text-sm font-medium sm:inline">뒤로 이동</span>
          </Button>
          <PostDetailHeader
            author={{
              nickname: post.nickname,
              profileImageUrl: post.profileImageUrl,
            }}
            createdAt={post.createdAt}
            menuItems={menuItems}
          />

          <div className="mt-6">
            <PostDetailBody
              title={post.title}
              content={post.content}
              tags={post.tags}
              images={post.images}
            />
          </div>

          <PostDetailVoteSection post={post} />

          {post.hasGoal && post.goalInfo && (
            <div className="mt-6">
              <PostGoalSection
                title={post.goalInfo.title}
                startDate={post.goalInfo.startDate ?? ''}
                endDate={post.goalInfo.endDate ?? ''}
                progressRate={post.goalInfo.progressRate ?? 0}
                status="in_progress"
              />
            </div>
          )}

          <div className="mt-8">
            <PostDetailActions
              postId={post.postId}
              likeCount={post.likeCount}
              commentCount={post.commentCount}
              isLiked={post.isLiked}
              isScrapped={post.isScrapped}
            />
          </div>

          <div id="post-detail-comment-section">
            <PostDetailCommentSection postId={post.postId} />
          </div>
        </article>
      </div>

      {isDeleteModalOpen && (
        <ConfirmModal
          description="게시글을 삭제하시겠습니까? 삭제된 게시글은 복구할 수 없습니다."
          confirmLabel="삭제"
          cancelLabel="취소"
          onConfirm={handleConfirmDelete}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}

      {isReportModalOpen && (
        <ReportFormModal
          title="게시글 신고"
          options={POST_REPORT_REASONS}
          isSubmitting={reportMutation.isPending}
          disabled={isGuest}
          onSubmit={handleReportSubmit}
          onClose={() => setIsReportModalOpen(false)}
        />
      )}
    </>
  )
}
