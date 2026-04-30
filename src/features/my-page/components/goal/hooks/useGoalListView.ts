import { useMemo, useState } from 'react'

import type { DateRange } from '@/components/common/ui/calendar/Calendar.type'
import { EMPTY_STATE_MESSAGES } from '@/components/common/ui/empty-state/empty-state.messages'
import { useGoalsQuery } from '@/query/goal'
import { GOALS_PAGE_SIZE } from '@/query/goal/useGoalsQuery'
import { toLocalDateString } from '@/utils/date'

import type { ApiGoalListParams, ApiGoalListStatus } from '../goal.api.types'

export const GOAL_FILTERS = ['전체 보기', '진행중', '미달성', '완료'] as const

const FILTER_STATUS_MAP: Record<
  (typeof GOAL_FILTERS)[number],
  ApiGoalListStatus | undefined
> = {
  '전체 보기': undefined,
  진행중: 'in_progress',
  미달성: 'failed',
  완료: 'completed',
}

const hasSelectedDate = (value: Date | null) => value !== null

export function useGoalListView() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof GOAL_FILTERS)[number]>('전체 보기')
  const [selectedPeriod, setSelectedPeriod] = useState<DateRange>({
    start: null,
    end: null,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const hasActiveFilters =
    activeFilter !== '전체 보기' ||
    hasSelectedDate(selectedPeriod.start) ||
    hasSelectedDate(selectedPeriod.end)

  const queryParams = useMemo<ApiGoalListParams>(() => {
    const params: ApiGoalListParams = {
      // 현재 페이지 상태를 그대로 서버 쿼리로 넘겨서 results/count를 함께 받습니다.
      page: currentPage,
      size: GOALS_PAGE_SIZE,
    }

    const status = FILTER_STATUS_MAP[activeFilter]
    if (status) {
      params.status = status
    }

    // 하루만 선택한 경우에도 해당 날짜 기준 필터가 되도록 start/end를 같은 날짜로 맞춥니다.
    const startDate = selectedPeriod.start
      ? toLocalDateString(selectedPeriod.start)
      : undefined
    const endDate = selectedPeriod.end
      ? toLocalDateString(selectedPeriod.end)
      : startDate

    // 기간 필터는 서버 조회 파라미터로 넘겨서 페이지네이션 결과와 count를 일치시킵니다.
    if (startDate) {
      params.start = startDate
    }
    if (endDate) {
      params.end = endDate
    }

    return params
  }, [activeFilter, currentPage, selectedPeriod.end, selectedPeriod.start])

  // 목표 조회는 쿼리 상태(page/filter/period)를 기준으로 서버 페이지네이션 API를 직접 호출합니다.
  const { data, isLoading, isError, isFetching } = useGoalsQuery(queryParams)
  const goals = data?.goals ?? []
  const totalCount = data?.count ?? 0
  const totalPages = Math.max(1, Math.ceil(totalCount / GOALS_PAGE_SIZE))
  const safePage = Math.min(currentPage, totalPages)

  const isEmpty = totalCount === 0
  const emptyStateMessage = hasActiveFilters
    ? EMPTY_STATE_MESSAGES.goal.filtered
    : EMPTY_STATE_MESSAGES.goal.empty

  const setFilter = (filter: (typeof GOAL_FILTERS)[number]) => {
    setActiveFilter(filter)
    setCurrentPage(1)
  }

  const setPeriod = (period: DateRange) => {
    setSelectedPeriod(period)
    setCurrentPage(1)
  }

  const resetFilters = () => {
    setActiveFilter('전체 보기')
    setSelectedPeriod({ start: null, end: null })
    setCurrentPage(1)
  }

  return {
    activeFilter,
    selectedPeriod,
    currentPage,
    safePage,
    queryParams,
    goals,
    totalCount,
    totalPages,
    isEmpty,
    isLoading,
    isError,
    isFetching,
    emptyStateMessage,
    shouldShowPagination: totalCount > 0,
    setFilter,
    setPeriod,
    resetFilters,
    setCurrentPage,
  }
}
