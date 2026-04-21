import { lazy, Suspense } from 'react'

import { Badge, Button } from '@/components/common/ui'
import { formatSelectedDate } from '@/components/common/ui/calendar/Calendar.util'

import { Card } from './Card'
import {
  type GoalCardProps,
  STATUS_BADGE_VARIANT,
  STATUS_LABEL,
} from './GoalCard.types'

const DonutChart = lazy(() =>
  import('@/components/common/ui/chart/DonutChart').then((m) => ({
    default: m.DonutChart,
  }))
)

export function GoalCard({
  label = '개별 목표',
  title,
  status, // 목표 카드 상태
  progressRate, // 진행률
  period, // 시작일 + 종료일
  onDelete, // 삭제 버튼 클릭 이벤트
}: GoalCardProps) {
  return (
    <Card className="flex flex-col gap-2">
      {/* 상단 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-xs bg-text-muted" />
          <span className="text-text-primary font-bold text-lg">{label}</span>
        </div>
        <Badge variant={STATUS_BADGE_VARIANT[status]}>
          {STATUS_LABEL[status]}
        </Badge>
      </div>

      {/* 날짜 */}
      <p className="h-4 flex items-center pl-4 text-xs text-text-muted">
        {formatSelectedDate(period, '날짜 미설정')}
      </p>

      {/* 차트 영역 */}
      <div className="flex flex-col h-55 w-64 p-3 gap-2 rounded-xl border border-border-default">
        <span className="text-text-primary font-bold w-full text-start truncate">
          {title}
        </span>
        {/* TODO: 도넛 스켈레톤 컴포넌트 추가 되면 교체 아니면 이거 계속 사용 + 따로 파일로 분리하여 다룰지 생각 */}
        <Suspense
          fallback={
            <div className="flex size-35 items-center justify-center mx-auto">
              <div className="size-32.5 rounded-full border-15 border-gray-200 animate-pulse" />
            </div>
          }
        >
          <DonutChart progressRate={progressRate} status={status} />
        </Suspense>
      </div>

      {/* 하단 */}
      <div className="mt-auto flex justify-end">
        <Button variant="danger" size="sm" rounded="md" onClick={onDelete}>
          삭제
        </Button>
      </div>
    </Card>
  )
}
