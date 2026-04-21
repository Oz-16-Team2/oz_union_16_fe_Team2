import type { DateRange } from '@/components/common/ui/calendar/Calendar.type'

export type GoalStatus = 'COMPLETED' | 'IN_PROGRESS' | 'FAILED'

export const STATUS_BADGE_VARIANT: Record<
  GoalStatus,
  'success' | 'inProgress' | 'failed'
> = {
  COMPLETED: 'success',
  IN_PROGRESS: 'inProgress',
  FAILED: 'failed',
}

export const STATUS_LABEL: Record<GoalStatus, string> = {
  COMPLETED: '완료',
  IN_PROGRESS: '진행중',
  FAILED: '미달성',
}

export type GoalCardProps = {
  label?: string
  title: string
  status: GoalStatus
  progressRate: number
  period: DateRange
  onDelete: () => void
}

export type GoalCardEditProps = {
  label?: string
  mode: 'create' | 'edit'
  initialTitle: string
  initialDateRange: DateRange
  initialProgressRate: number
  initialStatus: GoalStatus
  onClose: () => void
  onSubmit: (data: { title: string; dateRange: DateRange }) => void
}
