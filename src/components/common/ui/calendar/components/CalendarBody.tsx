import { cn } from '@/utils/cn'

import type { DateRange } from '../Calendar.type'
import { CalendarDay } from './CalendarDay'

const WEEK_DAYS = ['월', '화', '수', '목', '금', '토', '일']

type CalendarBodyProps = {
  daysInMonth: Date[]
  holidays: Date[]
  minDate: Date
  onSelectDate: (date: Date) => void
  prefixDays: number
  selectedDate: DateRange
  suffixDays: number
}

// 요일 행과 날짜 grid를 렌더링하는 본문 영역
export function CalendarBody({
  daysInMonth,
  holidays,
  minDate,
  onSelectDate,
  prefixDays,
  selectedDate,
  suffixDays,
}: CalendarBodyProps) {
  return (
    <>
      {/* 월요일부터 일요일까지의 요일 헤더를 표시 */}
      <div className="mb-2 grid grid-cols-7 text-center text-xs">
        {WEEK_DAYS.map((day, index) => (
          <div
            key={`${day}-${index}`}
            className={cn(
              'flex items-center justify-center font-bold text-text-primary',
              index === 6 && 'text-red-500'
            )}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 overflow-visible text-xs">
        {Array.from({ length: prefixDays }).map((_, index) => (
          <div key={`prefix-${index}`} className="size-9" />
        ))}

        {daysInMonth.map((day) => (
          <CalendarDay
            key={day.toISOString()}
            day={day}
            holidays={holidays}
            minDate={minDate}
            selectedDate={selectedDate}
            onSelect={onSelectDate}
          />
        ))}

        {Array.from({ length: suffixDays }).map((_, index) => (
          <div key={`suffix-${index}`} className="size-8" />
        ))}
      </div>
    </>
  )
}
