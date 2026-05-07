import { useEffect, useState } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { postApi } from '@/apis/post'

// 초기 isScrapped 값을 받아와서 optimistic update를 수행

type UseScrapMutationProps = {
  postId: number
  initialScrapped: boolean
}

export function useScrapMutation({
  postId,
  initialScrapped,
}: UseScrapMutationProps) {
  const queryClient = useQueryClient()
  const [scrapped, setScrapped] = useState(initialScrapped)

  useEffect(() => {
    setScrapped(initialScrapped)
  }, [initialScrapped])

  const { mutate, isPending } = useMutation({
    mutationFn: (currentScrapped: boolean) =>
      currentScrapped ? postApi.unscrapPost(postId) : postApi.scrapPost(postId),
    onMutate: (currentScrapped) => {
      setScrapped(!currentScrapped)
      return { prevScrapped: currentScrapped }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarkedPosts'] })
      queryClient.invalidateQueries({ queryKey: ['posts', 'me'] })
    },
    onError: (_err, _vars, context) => {
      if (!context) return
      setScrapped(context.prevScrapped)
    },
  })

  const toggleScrap = () => mutate(scrapped)

  return { scrapped, toggleScrap, isScrapPending: isPending }
}
