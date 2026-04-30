import { useMutation } from '@tanstack/react-query'

import { postApi } from '@/apis/post'

export function useReportPostMutation() {
  return useMutation({
    mutationFn: ({
      postId,
      reasonType,
      reasonDetail,
    }: {
      postId: number
      reasonType: string
      reasonDetail: string
    }) =>
      postApi.reportPost(postId, {
        reason_type: reasonType,
        reason_detail: reasonDetail,
      }),
  })
}
