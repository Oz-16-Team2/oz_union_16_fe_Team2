import { Badge, DonutChart } from '@/components/common/ui'
import type { GoalStatus } from '@/components/common/ui/card'

type PostGoalSectionProps = {
  title: string
  startDate: string
  endDate: string
  progressRate: number
  status: GoalStatus
}

const goalStatusMap = {
  IN_PROGRESS: {
    label: '진행중',
    badgeVariant: 'inProgress',
  },
  COMPLETED: {
    label: '완료',
    badgeVariant: 'success',
  },
  FAILED: {
    label: '실패',
    badgeVariant: 'failed',
  },
} as const

export function PostGoalSection({
  title,
  startDate,
  endDate,
  progressRate,
  status,
}: PostGoalSectionProps) {
  const statusInfo = goalStatusMap[status]

  return (
    <section className="mt-8">
      <div className="relative min-h-60">
        {/* 왼쪽 영역 */}
        <div className="flex w-64.75 flex-col gap-2">
          {/* 헤더 */}
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-text-primary">개별 목표</h3>
            <Badge variant={statusInfo.badgeVariant}>{statusInfo.label}</Badge>
          </div>

          <p className="text-sm font-semibold text-text-primary">{title}</p>

          <p className="text-xs font-normal text-text-primary">
            {startDate} ~ {endDate}
          </p>
        </div>

        {/* 그래프 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <DonutChart progressRate={progressRate} status={status} size={220} />
        </div>
      </div>
    </section>
  )
}
