import { useState } from 'react'

import type { AxiosError } from 'axios'

import type { ApiErrorResponse } from '@/apis/api.types'
import { formatError } from '@/apis/api.utils'
import { useToast } from '@/components/common/ui/toast/useToast'
import { useReportPostMutation } from '@/query/post'

export const POST_REPORT_REASONS = [
  { label: '스팸/광고', value: 'spam' },
  { label: '욕설/비방/혐오', value: 'abuse' },
  { label: '음란/선정적 컨텐츠', value: 'sexual' },
  { label: '허위정보', value: 'false_info' },
  { label: '기타', value: 'other' },
]

export function usePostCardReport(postId: number) {
  const toast = useToast()
  const { mutate: reportPost, isPending } = useReportPostMutation()
  const [showReportForm, setShowReportForm] = useState(false)

  const handleReportSubmit = ({
    reason,
    content,
  }: {
    reason: string
    content: string
  }) => {
    reportPost(
      { postId, reasonType: reason, reasonDetail: content },
      {
        onSuccess: () => {
          toast.success('신고가 접수되었습니다.')
          setShowReportForm(false)
        },
        onError: (error: AxiosError<ApiErrorResponse>) => {
          const detail = error.response?.data.error_detail
          toast.error(
            detail ? formatError(detail) : '신고 접수에 실패했습니다.'
          )
        },
      }
    )
  }

  return {
    showReportForm,
    isPending,
    openReportForm: () => setShowReportForm(true),
    closeReportForm: () => setShowReportForm(false),
    handleReportSubmit,
    reportReasons: POST_REPORT_REASONS,
  }
}
