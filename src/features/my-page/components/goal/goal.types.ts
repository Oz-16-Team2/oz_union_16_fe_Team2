import type { GoalStatus } from '@/components/common/ui'

export type CreateGoalRequest = {
  title: string
  startDate: string
  endDate: string
}

export type UpdateGoalRequest = {
  title?: string
}

export type Goal = {
  goalId: number
  title: string
  startDate: string
  endDate: string
  status: GoalStatus
  createdAt: string
  progressRate: number
  isCheckedToday: boolean
}

export type GoalFilter = '전체 보기' | '진행중' | '미달성' | '완료'
