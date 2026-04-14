import type { DateRange } from '@/components/common/ui/calendar/Calendar.type'

export type GoalStatus = '완료' | '진행중' | '미달성'

export type GoalCardProps = {
  label?: string
  title: string
  status: GoalStatus
  startDate: string
  endDate: string
  onDelete: () => void
}

export type GoalCardEditProps = {
  label?: string
  mode: 'create' | 'edit'
  initialTitle?: string
  initialDateRange?: DateRange
  onClose: () => void
  onSubmit: (data: { title: string; dateRange: DateRange | null }) => void
}

export const STATUS_BADGE_VARIANT: Record<
  GoalStatus,
  'success' | 'warning' | 'error'
> = {
  완료: 'success',
  진행중: 'warning',
  미달성: 'error',
}
