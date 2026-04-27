import { useState } from 'react'

import type { GoalStatus } from '@/components/common/ui'
import type { DateRange } from '@/components/common/ui/calendar/Calendar.type'
import { EMPTY_STATE_MESSAGES } from '@/components/common/ui/empty-state/empty-state.messages'
import { matchesPeriod } from '@/utils/date'

import type { Goal } from '../components/goal/goal.types'

export const GOAL_FILTERS = ['전체 보기', '진행중', '미달성', '완료'] as const
const GOALS_PAGE_SIZE = 8

const FILTER_STATUS_MAP: Record<
  (typeof GOAL_FILTERS)[number],
  GoalStatus | undefined
> = {
  '전체 보기': undefined,
  진행중: 'IN_PROGRESS',
  미달성: 'FAILED',
  완료: 'COMPLETED',
}

export function useGoalListView(goals: Goal[]) {
  const [activeFilter, setActiveFilter] =
    useState<(typeof GOAL_FILTERS)[number]>('전체 보기')
  const [selectedPeriod, setSelectedPeriod] = useState<DateRange>({
    start: null,
    end: null,
  })
  const [currentPage, setCurrentPage] = useState(1)

  const filteredGoals = goals.filter((goal) => {
    const status = FILTER_STATUS_MAP[activeFilter]
    const matchesStatus = status ? goal.status === status : true
    return matchesStatus && matchesPeriod(goal, selectedPeriod)
  })

  const totalPages = Math.max(
    1,
    Math.ceil(filteredGoals.length / GOALS_PAGE_SIZE)
  )

  const safePage = Math.min(currentPage, totalPages)
  const pageGoals = filteredGoals.slice(
    (safePage - 1) * GOALS_PAGE_SIZE,
    safePage * GOALS_PAGE_SIZE
  )

  const isEmpty = filteredGoals.length === 0
  const emptyStateMessage =
    goals.length === 0
      ? EMPTY_STATE_MESSAGES.goal.empty
      : EMPTY_STATE_MESSAGES.goal.filtered

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
    pageGoals,
    totalPages,
    isEmpty,
    emptyStateMessage,
    shouldShowPagination: !isEmpty,
    setFilter,
    setPeriod,
    resetFilters,
    setCurrentPage,
  }
}
