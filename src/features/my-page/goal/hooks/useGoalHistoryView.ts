import { useState } from 'react'

import { useGoalHistoryQuery } from '@/query/goal'
import { GOALS_PAGE_SIZE } from '@/query/goal/useGoalsQuery'

import { mapGoalHistoryItem } from '../mapper'

const HISTORY_EMPTY_STATE_MESSAGE = {
  title: '이 날짜에 인증한 목표가 없어요.',
  description: '다른 날짜를 선택해 다시 확인해보세요.',
}

export function useGoalHistoryView(selectedDate: string) {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, isError, isFetching } = useGoalHistoryQuery({
    date: selectedDate,
    page: currentPage,
    size: GOALS_PAGE_SIZE,
  })

  const goals = data?.results.map(mapGoalHistoryItem) ?? []
  const totalCount = data?.count ?? 0
  const totalPages = Math.max(1, Math.ceil(totalCount / GOALS_PAGE_SIZE))
  const safePage = Math.min(currentPage, totalPages)

  return {
    currentPage,
    goals,
    safePage,
    totalCount,
    totalPages,
    isEmpty: totalCount === 0,
    isLoading,
    isError,
    isFetching,
    emptyStateMessage: HISTORY_EMPTY_STATE_MESSAGE,
    shouldShowPagination: totalCount > 0,
    setCurrentPage,
  }
}
