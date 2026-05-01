import type { Dispatch, SetStateAction } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { useToast } from '@/components/common/ui'
import { useDeleteGoalMutation } from '@/query/goal'

type UseGoalDeleteFlowParams = {
  currentPage: number
  goalCountOnPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export function useGoalDeleteFlow({
  currentPage,
  goalCountOnPage,
  setCurrentPage,
}: UseGoalDeleteFlowParams) {
  const queryClient = useQueryClient()
  const toast = useToast()
  const deleteGoalMutation = useDeleteGoalMutation({
    onError: (message) => {
      toast.error(message)
    },
  })

  const handleDeleteGoal = async (goalId: number) => {
    const shouldMovePreviousPage = goalCountOnPage === 1 && currentPage > 1

    try {
      // 삭제 성공/실패 토스트와 후속 페이지 처리는 이 훅에서 한 곳으로 관리합니다.
      await deleteGoalMutation.mutateAsync(goalId)
      toast.success('목표를 삭제했습니다.')

      // 마지막 카드 삭제면 페이지를 먼저 옮기고 stale 처리만 해서 새 페이지 기준으로 다시 보이게 합니다.
      if (shouldMovePreviousPage) {
        setCurrentPage((prevPage) => Math.max(1, prevPage - 1))
        await queryClient.invalidateQueries({
          queryKey: ['goals'],
          refetchType: 'none',
        })
        await queryClient.invalidateQueries({
          queryKey: ['activitySummary'],
        })
        await queryClient.invalidateQueries({ queryKey: ['heatmap'] })
        return
      }

      await queryClient.invalidateQueries({ queryKey: ['goals'] })
      await queryClient.invalidateQueries({ queryKey: ['activitySummary'] })
      await queryClient.invalidateQueries({ queryKey: ['heatmap'] })
    } catch {
      // 삭제 실패 메시지는 mutation에서 해석하고, 토스트는 이 훅에서만 표시합니다.
      return
    }
  }

  return {
    handleDeleteGoal,
    isDeleting: deleteGoalMutation.isPending,
  }
}
