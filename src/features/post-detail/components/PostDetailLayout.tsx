import { useState } from 'react'
import { useNavigate } from 'react-router'

import type { AxiosError } from 'axios'

import type { ApiErrorResponse } from '@/apis/api.types'
import { formatError } from '@/apis/api.utils'
import { ConfirmModal } from '@/components/common/overlay/modal/confirm/ConfirmModal'
import { ReportFormModal } from '@/components/common/overlay/modal/form/ReportFormModal'
import { POST_REPORT_REASONS } from '@/components/common/ui/card/usePostCardReport'
import { useToast } from '@/components/common/ui/toast/useToast'
import { VoteDisplay } from '@/components/common/ui/vote/VoteDisplay'
import type { PostDetailData } from '@/features/post/post.types'
import {
  getVoteMode,
  toVoteDisplayOptions,
} from '@/features/post-detail/utils/voteDisplayMapper'
import { useDeletePostMutation } from '@/query/post/useDeletePostMutation'
import { useReportPostMutation } from '@/query/post/useReportPostMutation'
import { useVoteMutation } from '@/query/post/useVoteMutaion'
import { useVoteQuery } from '@/query/post/useVoteQuery'

import { PostDetailActions } from './PostDetailActions'
import { PostDetailBody } from './PostDetailBody'
import { PostDetailCommentSection } from './PostDetailCommentSection'
import { PostDetailHeader } from './PostDetailHeader'
import { PostGoalSection } from './PostGoalSection'

type PostDetailLayoutProps = {
  post: PostDetailData
}

export function PostDetailLayout({ post }: PostDetailLayoutProps) {
  const navigate = useNavigate()
  const toast = useToast()

  const deleteMutation = useDeletePostMutation({
    onSuccess: () => {
      setIsDeleteModalOpen(false)
      navigate('/')
    },
    onError: (message) => toast.error(message),
  })
  const reportMutation = useReportPostMutation()
  const voteMutation = useVoteMutation()
  const { data: voteData } = useVoteQuery(post.voteInfo?.voteId ?? 0)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)

  const voteDetail = voteData?.data.detail

  const isOwner = post.isOwner

  const handleDelete = () => {
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    deleteMutation.mutate(post.postId)
  }

  const handleReport = () => {
    setIsReportModalOpen(true)
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

  const handleVoteSubmit = () => {
    // 이미 투표한 사용자는 재투표 불가
    if (voteDetail?.is_voted) return
    if (!selectedOptionId || !post.voteInfo) return

    voteMutation.mutate(
      {
        postId: post.postId,
        voteId: post.voteInfo.voteId,
        voteOptionId: Number(selectedOptionId),
      },
      {
        onSuccess: () => {
          toast.success('투표가 완료되었습니다.')
        },
        onError: (error) => {
          const axiosError = error as AxiosError<ApiErrorResponse>
          const detail = axiosError.response?.data.error_detail

          if (axiosError.response?.status === 409) {
            toast.error('이미 참여한 투표입니다.')
            return
          }

          toast.error(detail ? formatError(detail) : '투표에 실패했습니다.')
        },
      }
    )
  }

  const handleVoteOptionSelect = (optionId: string) => {
    // 이미 투표한 사용자는 선택 변경 불가
    if (voteDetail?.is_voted) return

    setSelectedOptionId(optionId)
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

  const menuItems = isOwner ? ownerMenuItems : guestMenuItems

  return (
    <>
      <article className="w-full max-w-4xl rounded-2xl border border-border-default bg-white px-8 py-6 shadow-card-main">
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

        {post.hasVote && post.voteInfo && (
          <div className="mt-6">
            <VoteDisplay
              mode={getVoteMode(post.voteInfo, voteDetail?.is_voted)}
              options={toVoteDisplayOptions(voteDetail, selectedOptionId)}
              participantCount={voteDetail?.total_count ?? 0}
              period={{
                start: new Date(post.voteInfo.startAt),
                end: new Date(post.voteInfo.endAt),
              }}
              onSelectOption={handleVoteOptionSelect}
              onActionClick={handleVoteSubmit}
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
          onSubmit={handleReportSubmit}
          onClose={() => setIsReportModalOpen(false)}
        />
      )}
    </>
  )
}
