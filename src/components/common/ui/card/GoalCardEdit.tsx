import { lazy, Suspense, useState } from 'react'

import { Button, Calendar, Input } from '@/components/common/ui'
import type { DateRange } from '@/components/common/ui/calendar/Calendar.type'
import { formatSelectedDate } from '@/components/common/ui/calendar/Calendar.util'

import { Card } from './Card'
import type { GoalCardEditProps } from './GoalCard.types'

const DonutChart = lazy(() =>
  import('@/components/common/ui/chart/DonutChart').then((m) => ({
    default: m.DonutChart,
  }))
)

export function GoalCardEdit({
  label = '개별 목표',
  mode,
  initialTitle,
  initialDateRange,
  initialProgressRate,
  initialStatus,
  onClose,
  onSubmit,
}: GoalCardEditProps) {
  const [title, setTitle] = useState(initialTitle)
  const [dateRange, setDateRange] = useState<DateRange>(initialDateRange)

  const handleSubmit = () => {
    if (mode === 'create') {
      onSubmit({ title, dateRange })
      return
    }

    onSubmit({ title })
  }

  return (
    <Card className="flex flex-col gap-2">
      {/* 상단 */}
      <div className="flex items-center gap-2">
        <div className="size-3.5 rounded-xs bg-gray-300 dark:bg-white/15" />
        <span className="text-text-primary font-bold text-lg">{label}</span>
      </div>

      {/* 캘린더 */}
      <div className="h-4 flex items-center">
        {mode === 'create' ? (
          <Calendar
            label="날짜를 선택하세요"
            value={dateRange}
            onChange={(value) =>
              setDateRange(value ?? { start: null, end: null })
            }
          />
        ) : (
          <span className="text-xs pl-4 text-text-muted">
            {formatSelectedDate(initialDateRange, '날짜 수정 불가')}
          </span>
        )}
      </div>

      {/* 차트 영역 */}
      <div className="flex flex-col p-3 gap-2 rounded-xl border border-border-default">
        <Input
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="py-1 px-2 text-sm"
        />
        {/* TODO: 도넛 스켈레톤 컴포넌트 추가 되면 교체 아니면 이거 계속 사용 + 따로 파일로 분리하여 다룰지 생각 */}
        <Suspense
          fallback={
            <div className="flex size-35 items-center justify-center mx-auto">
              <div className="size-32.5 rounded-full border-15 border-gray-200 animate-pulse" />
            </div>
          }
        >
          <DonutChart
            progressRate={initialProgressRate}
            status={initialStatus}
          />
        </Suspense>
      </div>

      {/* 하단 */}
      <div className="mt-auto flex justify-end gap-2">
        <Button variant="modal" size="sm" onClick={onClose}>
          닫기
        </Button>
        <Button variant="primary" size="sm" onClick={handleSubmit}>
          {mode === 'edit' ? '수정' : '등록'}
        </Button>
      </div>
    </Card>
  )
}
