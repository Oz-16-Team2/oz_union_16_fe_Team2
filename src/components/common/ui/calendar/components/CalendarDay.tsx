import { format, getDay, isSameDay, isToday, startOfDay } from 'date-fns'

import { Button } from '@/components/common/ui'
import { cn } from '@/utils/cn'

import type { DateRange } from '../Calendar.type'

type CalendarDayProps = {
  day: Date
  holidays: Date[]
  minDate: Date
  onSelect: (date: Date) => void
  selectedDate: DateRange
}

// 날짜 버튼이 가질 수 있는  상태
type DayButtonState = 'default' | 'disabled' | 'redDay' | 'selected' | 'today'

// 상태별 날짜 버튼 스타일
const DAY_BUTTON_STATE_CLASS: Record<DayButtonState, string> = {
  default: 'text-primary',
  disabled:
    'cursor-not-allowed text-text-muted disabled:bg-transparent disabled:text-text-muted',
  redDay: 'text-red-500 hover:text-red-500',
  selected: 'bg-primary-500 text-white hover:bg-primary-500',
  today: 'text-primary-500',
}

// 날짜 셀 하나를 렌더링 range 배경과 선택 원형 표시를 함께 처리
export function CalendarDay({
  day,
  holidays,
  minDate,
  onSelect,
  selectedDate,
}: CalendarDayProps) {
  const { start, end } = selectedDate

  const isStart = start ? isSameDay(day, start) : false
  const isEnd = end ? isSameDay(day, end) : false
  const isSelected = isStart || isEnd

  // 시작일과 종료일 사이의 날짜는 연한 배경으로 연결해 range를 보여줌
  const isInRange = start && end ? day > start && day < end : false
  const isCurrent = isToday(day)
  const isDisabled = startOfDay(day) < minDate
  const isSunday = getDay(day) === 0
  const isHoliday = holidays.some((holiday) => isSameDay(day, holiday))
  const isRedDay = isSunday || isHoliday
  const hasRangeEnd = Boolean(end)
  const hasRangeStart = Boolean(start)

  // disabled > selected > redDay > today > default 순서로 날짜 버튼 상태를 결정
  const dayState: DayButtonState = isDisabled
    ? 'disabled'
    : isSelected
      ? 'selected'
      : isRedDay
        ? 'redDay'
        : isCurrent
          ? 'today'
          : 'default'

  return (
    <div className="relative flex h-9 w-full items-center justify-center">
      {/* range 내부 날짜의 연결 배경 */}
      {isInRange && (
        <div className="absolute left-0 right-0 top-1/2 h-9 -translate-y-1/2 bg-primary-100/80" />
      )}

      {/* 시작일에서 종료일 방향으로 이어지는 반쪽 배경 */}
      {isStart && hasRangeEnd && (
        <div className="absolute left-1/2 right-0 top-1/2 h-9 -translate-y-1/2 bg-primary-100" />
      )}

      {/* 종료일에서 시작일 방향으로 이어지는 반쪽 배경 */}
      {isEnd && hasRangeStart && (
        <div className="absolute left-0 right-1/2 top-1/2 h-9 -translate-y-1/2 bg-primary-100" />
      )}

      <Button
        variant="ghost"
        disabled={isDisabled}
        onClick={() => onSelect(day)}
        className={cn(
          'relative z-10 flex size-9 items-center rounded-full text-sm font-semibold',
          !isDisabled &&
            !isSelected &&
            'cursor-pointer transition-colors hover:bg-primary-100/70 hover:text-primary-600',
          DAY_BUTTON_STATE_CLASS[dayState]
        )}
      >
        {format(day, 'd')}
      </Button>
    </div>
  )
}
