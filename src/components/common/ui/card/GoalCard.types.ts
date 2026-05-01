import type { DateRange } from '@/components/common/ui/calendar/Calendar.type'

export type GoalStatus = 'completed' | 'in_progress' | 'failed'

export const STATUS_BADGE_VARIANT: Record<
  GoalStatus,
  'success' | 'inProgress' | 'failed'
> = {
  completed: 'success',
  in_progress: 'inProgress',
  failed: 'failed',
}

export const STATUS_LABEL: Record<GoalStatus, string> = {
  completed: '완료',
  in_progress: '진행중',
  failed: '미달성',
}

export type GoalCardProps = {
  label?: string
  title: string
  status: GoalStatus
  progressRate: number
  period: DateRange
  isCheckedToday?: boolean
  onCheck?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export type GoalCardEditProps = {
  label?: string
  mode: 'create' | 'edit'
  initialTitle: string
  initialDateRange: DateRange
  initialProgressRate: number
  initialStatus: GoalStatus
  onClose: () => void
} & (
  | {
      mode: 'create'
      onSubmit: (data: { title: string; dateRange: DateRange }) => void
    }
  | {
      mode: 'edit'
      onSubmit: (data: { title: string }) => void
    }
)
