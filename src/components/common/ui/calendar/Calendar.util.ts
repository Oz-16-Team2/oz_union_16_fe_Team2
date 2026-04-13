import { format } from 'date-fns'

import type { DateRange } from './Calendar.type'

// 선택된 날짜 상태(DateRange)를 문자열로 변환하는 유틸 함수
export function formatSelectedDate(
  selectedDate: DateRange,
  fallbackText: string
) {
  if (!selectedDate.start) {
    return fallbackText
  }

  if (!selectedDate.end) {
    return format(selectedDate.start, 'yyyy.MM.dd')
  }

  return `${format(selectedDate.start, 'yyyy.MM.dd')} ~ ${format(
    selectedDate.end,
    'yyyy.MM.dd'
  )}`
}
