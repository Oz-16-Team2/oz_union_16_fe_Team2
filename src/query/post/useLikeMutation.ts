import { useState } from 'react'

import { useMutation } from '@tanstack/react-query'

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
  })

  return { liked, likeCount, toggleLike: mutate, isLikePending: isPending }
}
