import { useState } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { postApi } from '@/apis/post'

type UseLikeMutationProps = {
  postId: number
  initialLiked: boolean
  initialLikeCount: number
}

export function useLikeMutation({
  postId,
  initialLiked,
  initialLikeCount,
}: UseLikeMutationProps) {
  const queryClient = useQueryClient()
  const [liked, setLiked] = useState(initialLiked)
  const [likeCount, setLikeCount] = useState(initialLikeCount)

  const { mutate, isPending } = useMutation({
    mutationFn: () => postApi.toggleLike(postId),
    onMutate: () => {
      const prevLiked = liked
      const prevCount = likeCount
      setLiked(!prevLiked)
      setLikeCount((prev) => (prevLiked ? prev - 1 : prev + 1))
      return { prevLiked, prevCount }
    },
    onError: (_err, _vars, context) => {
      if (!context) return
      setLiked(context.prevLiked)
      setLikeCount(context.prevCount)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['postDetail', postId] })
    },
  })

  return { liked, likeCount, toggleLike: mutate, isLikePending: isPending }
}
