// 게시글 상세 투표 섹션 로직 훅
// - 투표 참여 / 수정 / 삭제 처리
// - VoteDisplay ↔ VoteEditor 상태 관리
import { useState } from 'react'
import { useNavigate } from 'react-router'

import type { AxiosError } from 'axios'

import type { ApiErrorResponse } from '@/apis/api.types'
import { formatError } from '@/apis/api.utils'
import type { DateRange } from '@/components/common/ui/calendar/Calendar.type'
import { useToast } from '@/components/common/ui/toast/useToast'
import type { PostDetailData } from '@/features/post/post.types'
import { useDeleteVoteMutation } from '@/query/post/useDeleteVoteMutation'
import { useUpdateVoteMutation } from '@/query/post/useUpdateVoteMutation'
import { useVoteMutation } from '@/query/post/useVoteMutaion'
import { useVoteQuery } from '@/query/post/useVoteQuery'
import { useAuthStore } from '@/store/authStore'

function toDateString(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getServerErrorMessage(error: unknown, fallbackMessage: string) {
  const axiosError = error as AxiosError<ApiErrorResponse>
  const errorDetail = axiosError.response?.data.error_detail

  if (typeof errorDetail === 'string') return errorDetail
  if (errorDetail) return formatError(errorDetail)

  return fallbackMessage
}

export function usePostDetailVoteSection(post: PostDetailData) {
  const toast = useToast()
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)

  const voteMutation = useVoteMutation()
  const updateVoteMutation = useUpdateVoteMutation()
  const deleteVoteMutation = useDeleteVoteMutation()
  const { data: voteData } = useVoteQuery(post.voteInfo?.voteId ?? 0)

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editOptions, setEditOptions] = useState<string[]>([])
  const [editPeriod, setEditPeriod] = useState<DateRange | undefined>()

  const voteDetail = voteData?.data.detail
  const participantCount = voteDetail?.total_count ?? 0

  const handleVoteSubmit = () => {
    if (!user) {
      navigate('/login')
      return
    }

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

          if (axiosError.response?.status === 409) {
            toast.error('이미 참여한 투표입니다.')
            return
          }

          toast.error(getServerErrorMessage(error, '투표에 실패했습니다.'))
        },
      }
    )
  }

  const handleVoteOptionSelect = (optionId: string) => {
    if (voteDetail?.is_voted) return
    setSelectedOptionId(optionId)
  }

  const handleEdit = () => {
    if (!post.voteInfo) return

    if (participantCount > 0) {
      toast.error('이미 참여자가 있는 투표는 수정할 수 없습니다.')
      return
    }

    setEditOptions(
      [...post.voteInfo.options]
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((option) => option.content)
    )

    setEditPeriod({
      start: new Date(post.voteInfo.startAt),
      end: new Date(post.voteInfo.endAt),
    })

    setIsEditMode(true)
  }

  const handleChangeEditOption = (index: number, value: string) => {
    setEditOptions((prev) =>
      prev.map((option, optionIndex) =>
        optionIndex === index ? value : option
      )
    )
  }

  const handleChangeEditPeriod = (date: DateRange | null) => {
    setEditPeriod(date ?? undefined)
  }

  const handleUpdateVote = () => {
    if (!post.voteInfo) return

    updateVoteMutation.mutate(
      {
        voteId: post.voteInfo.voteId,
        body: {
          options: editOptions, // ← 다시 이걸로
          start_at: editPeriod?.start
            ? toDateString(editPeriod.start)
            : undefined,
          end_at: editPeriod?.end ? toDateString(editPeriod.end) : undefined,
        },
      },
      {
        onSuccess: () => {
          toast.success('투표가 수정되었습니다.')
          setIsEditMode(false)
        },
        onError: (error) => {
          toast.error(getServerErrorMessage(error, '투표 수정에 실패했습니다.'))
        },
      }
    )
  }

  const handleDelete = () => {
    if (!post.voteInfo) return

    if (participantCount > 0) {
      toast.error('참여자가 있는 투표는 삭제할 수 없습니다.')
      return
    }

    deleteVoteMutation.mutate(post.voteInfo.voteId, {
      onSuccess: () => {
        toast.success('투표가 삭제되었습니다.')
      },
      onError: (error) => {
        toast.error(getServerErrorMessage(error, '투표 삭제에 실패했습니다.'))
      },
    })
  }

  const handleCancelEdit = () => {
    setIsEditMode(false)
  }

  return {
    voteDetail,
    participantCount,
    selectedOptionId,
    isEditMode,
    editOptions,
    editPeriod,
    handleVoteSubmit,
    handleVoteOptionSelect,
    handleEdit,
    handleDelete,
    handleChangeEditOption,
    handleChangeEditPeriod,
    handleUpdateVote,
    handleCancelEdit,
  }
}
