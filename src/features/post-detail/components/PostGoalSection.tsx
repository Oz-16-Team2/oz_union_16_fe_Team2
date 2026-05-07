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
  in_progress: {
    label: '진행중',
    badgeVariant: 'inProgress',
    badgeClassName:
      'min-w-0 border border-transparent px-3 py-1 text-xs bg-[#F1F0FF] text-[#845FFF] dark:bg-transparent dark:border-violet-200/50 dark:text-violet-200',
  },
  completed: {
    label: '완료',
    badgeVariant: 'success',
    badgeClassName:
      'min-w-0 border border-transparent px-3 py-1 text-xs bg-[#EAFBF3] text-[#75B965] dark:bg-transparent dark:border-emerald-200/50 dark:text-emerald-200',
  },
  failed: {
    label: '실패',
    badgeVariant: 'failed',
    badgeClassName:
      'min-w-0 border border-transparent px-3 py-1 text-xs bg-[#FFEEE2] text-[#FF5550] dark:bg-transparent dark:border-red-200/50 dark:text-red-200',
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
      <div className="flex flex-col gap-6 sm:relative sm:min-h-60">
        {/* 왼쪽 영역 */}
        <div className="flex w-full flex-col gap-2 sm:w-64.75">
          {/* 헤더 */}
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-text-primary">개별 목표</h3>
            <Badge
              variant={statusInfo.badgeVariant}
              className={statusInfo.badgeClassName}
            >
              {statusInfo.label}
            </Badge>
          </div>

          <p className="text-sm font-semibold text-text-primary">{title}</p>

          <p className="text-xs font-normal text-text-primary">
            {startDate} ~ {endDate}
          </p>
        </div>

        {/* 그래프 */}
        <div className="flex justify-center sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
          <DonutChart progressRate={progressRate} status={status} size={220} />
        </div>
      </div>
    </section>
  )
}
