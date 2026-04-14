import { useState } from 'react'

import { Button, Calendar, Input } from '@/components/common/ui'
import type { DateRange } from '@/components/common/ui/calendar/Calendar.type'

import { Card } from './Card'
import type { GoalCardEditProps } from './GoalCard.types'

// 목표 값을 props로 받아와야할 수 있음 -> 도넛 차트 생성 시 작업
export function GoalCardEdit({
  label = '개별 목표',
  mode,
  initialTitle = '',
  initialDateRange,
  onClose,
  onSubmit,
}: GoalCardEditProps) {
  const [title, setTitle] = useState(initialTitle)
  const [dateRange, setDateRange] = useState<DateRange | null>(
    initialDateRange ?? null
  )

  const handleSubmit = () => {
    onSubmit({ title, dateRange })
  }

  return (
    <Card className="flex flex-col gap-2">
      {/* 상단 */}
      <div className="flex items-center gap-2">
        <div className="size-3 rounded-xs bg-text-muted" />
        <span className="text-text-primary font-bold text-lg">{label}</span>
      </div>

      {/* 캘린더 */}
      <div className="h-4 flex items-center">
        <Calendar
          label="날짜를 선택하세요"
          value={dateRange ?? undefined}
          onChange={setDateRange}
        />
      </div>

      {/* 차트 영역 */}
      <div className="flex flex-col h-55 w-64 p-3 gap-2 rounded-xl border border-border-default">
        <Input
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-8 py-1 px-2 text-sm"
        />
        {/* TODO: 도넛 차트 임시*/}
        <div className="size-39 rounded-full border-2 border-gray-200 mx-auto" />
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
