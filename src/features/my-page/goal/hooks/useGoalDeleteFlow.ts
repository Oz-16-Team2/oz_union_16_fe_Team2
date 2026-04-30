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
  const deleteGoalMutation = useDeleteGoalMutation()

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
        return
      }

      await queryClient.invalidateQueries({ queryKey: ['goals'] })
      await queryClient.invalidateQueries({ queryKey: ['activitySummary'] })
    } catch {
      // 삭제 실패 토스트도 동일한 흐름 안에서 처리해 책임을 분산시키지 않습니다.
      toast.error('목표 삭제에 실패했습니다.')
    }
  }

  return {
    handleDeleteGoal,
    isDeleting: deleteGoalMutation.isPending,
  }
}
