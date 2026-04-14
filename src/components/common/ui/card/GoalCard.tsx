import { Badge, Button } from '@/components/common/ui'

import { Card } from './Card'
import { type GoalCardProps, STATUS_BADGE_VARIANT } from './GoalCard.types'

export function GoalCard({
  label = '개별 목표',
  title,
  status,
  startDate,
  // Todo: 목표 값은 props로 받아와야 함 -> 도넛 차트 생성 시 작업
  endDate,
  onDelete,
}: GoalCardProps) {
  return (
    <Card className="flex flex-col gap-2">
      {/* 상단 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-xs bg-text-muted" />
          <span className="text-text-primary font-bold text-lg">{label}</span>
        </div>
        <Badge variant={STATUS_BADGE_VARIANT[status]}>{status}</Badge>
      </div>

      {/* 날짜 */}
      <p className="h-4 flex items-center pl-4 text-xs text-text-muted">
        {startDate} - {endDate}
      </p>

      {/* 차트 영역 */}
      <div className="flex flex-col h-55 w-64 p-3 gap-2 rounded-xl border border-border-default">
        <span className="text-text-primary font-bold w-full text-start truncate">
          {title}
        </span>
        {/* TODO: 도넛 차트 */}
        <div className="size-39 rounded-full border-2 border-gray-200 mx-auto" />
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
