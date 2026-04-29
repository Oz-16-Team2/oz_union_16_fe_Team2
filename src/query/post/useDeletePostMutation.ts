import { useMutation, useQueryClient } from '@tanstack/react-query'

import { postApi } from '@/apis/post'

export function useDeletePostMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: number) => postApi.deletePost(postId),
    onSuccess: () => {
      // invalidateQueries는 캐시에 있는 모든 posts 쿼리를 stale 처리한다.
      // 하지만 목록 조회는 캐싱을 하지 않으므로 (staleTime=0),
      // 현재 마운트된 (화면에 보이는) 쿼리만 즉시 다시 불러오는 refetchQueries를 사용한다.
      queryClient.refetchQueries({ queryKey: ['posts'] })
    },
  })
}
