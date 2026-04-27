import type { DateRange } from '@/components/common/ui/calendar/Calendar.type'
import type { Goal } from '@/features/my-page/components/goal/goal.types'

// 문자열 날짜를 로컬 Date 객체로 변환
// 'YYYY-MM-DD' 형식일 경우 UTC로 처리되며 하루 밀리는 문제를 방지하기 위해
// 'T00:00:00'을 붙여 로컬 기준으로 생성
export const toLocalDate = (value?: string) => {
  if (!value) return null
  const date = new Date(value.includes('T') ? value : `${value}T00:00:00`)
  return Number.isNaN(date.getTime()) ? null : date
}

// Date 객체를 'YYYY-MM-DD' 문자열로 변환 (서버 전송용)
// UTC 변환 시 날짜가 밀리는 문제를 방지하기 위해 로컬 기준으로 직접 포맷팅
export const toLocalDateString = (value: Date) => {
  const year = value.getFullYear()
  const month = String(value.getMonth() + 1).padStart(2, '0')
  const day = String(value.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

// 두 날짜를 비교하여 left가 right보다 이전이거나 같은지 확인
export const isSameOrBefore = (left: Date, right: Date) =>
  left.getTime() <= right.getTime()

// 두 날짜를 비교하여 left가 right보다 이후이거나 같은지 확인
export const isSameOrAfter = (left: Date, right: Date) =>
  left.getTime() >= right.getTime()

// Goal 데이터를 DateRange 형태로 변환
// 문자열로 된 startDate, endDate를 Date 객체로 변환
export function toDateRange(goal: Goal): DateRange {
  return {
    start: toLocalDate(goal.startDate),
    end: toLocalDate(goal.endDate),
  }
}

// 특정 목표(goal)가 선택한 기간(period)에 포함되는지 확인
// 기간 필터링 로직 (캘린더 범위 선택 시 사용)
export function matchesPeriod(goal: Goal, period: DateRange) {
  if (!period.start && !period.end) return true

  const goalRange = toDateRange(goal)
  if (!goalRange.start || !goalRange.end) return false

  const periodStart = period.start ?? period.end
  const periodEnd = period.end ?? period.start

  if (!periodStart || !periodEnd) return true

  return (
    isSameOrBefore(goalRange.start, periodEnd) &&
    isSameOrAfter(goalRange.end, periodStart)
  )
}
