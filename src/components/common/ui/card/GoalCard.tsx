import { lazy, Suspense } from 'react'

import { Check } from 'lucide-react'

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
  isCheckedToday = false, // 오늘 체크 여부
  onCheck, // 상단 체크 버튼 클릭 이벤트
  onEdit, // 수정 버튼 클릭 이벤트
  onDelete, // 삭제 버튼 클릭 이벤트
}: GoalCardProps) {
  const shouldShowCheck = Boolean(onCheck)
  const isCheckMarked = status === 'completed' || isCheckedToday
  const badgeClassName =
    status === 'completed'
      ? 'min-w-0 border border-transparent px-3 py-1 text-xs bg-[#EAFBF3] text-[#75B965] dark:bg-transparent dark:border-emerald-200/50 dark:text-emerald-200'
      : status === 'failed'
        ? 'min-w-0 border border-transparent px-3 py-1 text-xs bg-[#FFEEE2] text-[#FF5550] dark:bg-transparent dark:border-red-200/50 dark:text-red-200'
        : 'min-w-0 border border-transparent px-3 py-1 text-xs bg-[#F1F0FF] text-[#845FFF] dark:bg-transparent dark:border-violet-200/50 dark:text-violet-200'
  const shouldShowActions = Boolean(onEdit) || Boolean(onDelete)

  return (
    <Card className="flex flex-col gap-2">
      {/* 상단 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {shouldShowCheck ? (
            <button
              type="button"
              aria-label="목표 체크"
              aria-pressed={isCheckMarked}
              onClick={status === 'in_progress' ? onCheck : undefined}
              disabled={status !== 'in_progress'}
              className={
                isCheckMarked
                  ? 'flex size-3.5 items-center justify-center rounded-xs bg-emerald-500 text-white transition-colors hover:bg-emerald-600 dark:bg-emerald-400 dark:text-slate-900 dark:hover:bg-emerald-300'
                  : 'flex size-3.5 items-center justify-center rounded-xs bg-gray-300 text-transparent transition-colors hover:bg-gray-400 disabled:cursor-default disabled:hover:bg-gray-300 dark:bg-white/15 dark:hover:bg-white/20 dark:disabled:hover:bg-white/15'
              }
            >
              <Check className="size-2.5" strokeWidth={4} />
            </button>
          ) : null}
          {!shouldShowCheck ? <div className="size-3.5 rounded-xs" /> : null}
          <span className="text-text-primary font-bold text-lg">{label}</span>
        </div>
        <Badge
          variant={STATUS_BADGE_VARIANT[status]}
          className={badgeClassName}
        >
          {STATUS_LABEL[status]}
        </Badge>
      </div>

      {/* 날짜 */}
      <p className="h-4 flex items-center pl-4 text-xs text-text-muted">
        {formatSelectedDate(period, '날짜 미설정')}
      </p>

      {/* 차트 영역 */}
      <div className="flex flex-col p-3 gap-2 rounded-xl border border-border-default">
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
      {shouldShowActions ? (
        <div className="mt-auto flex justify-end gap-2">
          {status === 'in_progress' && onEdit ? (
            <Button variant="primary" size="sm" rounded="md" onClick={onEdit}>
              수정
            </Button>
          ) : null}
          {onDelete ? (
            <Button variant="danger" size="sm" rounded="md" onClick={onDelete}>
              삭제
            </Button>
          ) : null}
        </div>
      ) : null}
    </Card>
  )
}
