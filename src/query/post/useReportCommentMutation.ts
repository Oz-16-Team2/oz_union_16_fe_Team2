// 댓글 신고 API

import { useMutation } from '@tanstack/react-query'

import { apiClient } from '@/apis/apiClient'
import { POST_ENDPOINTS } from '@/apis/post/endpoints'

export function useReportCommentMutation() {
  return useMutation({
    mutationFn: ({
      commentId,
      reasonType,
      reasonDetail,
    }: {
      commentId: number
      reasonType: string
      reasonDetail: string
    }) =>
      apiClient.post(POST_ENDPOINTS.commentReport(commentId), {
        reason_type: reasonType,
        reason_detail: reasonDetail,
      }),
  })
}
