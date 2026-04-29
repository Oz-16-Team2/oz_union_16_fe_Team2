import { useState } from 'react'

import {
  addMonths,
  addYears,
  eachDayOfInterval,
  endOfMonth,
  getDay,
  startOfDay,
  startOfMonth,
  subMonths,
  subYears,
} from 'date-fns'

import type {
  CalendarProps,
  CalendarViewMode,
  DateRange,
} from './Calendar.type'

/**
 * Calendar 공통 로직을 분리한 커스텀 훅
 * 이 훅에서 관리하는 것
 * - 선택된 날짜 범위(start, end)
 * - 현재 화면에 보여줄 달(currentDate)
 * - 이전달 / 다음달 이동
 * - 달력 셀 렌더링에 필요한 현재 월 날짜 목록과 앞/뒤 빈칸 수
 * - 최소 선택 가능 날짜(minDate) 처리
 * 날짜 계산과 선택 로직은 이 훅에서 담당한다.
 */

const EMPTY_RANGE: DateRange = { start: null, end: null }

// 캘린더의 상태와 날짜 계산을 UI에서 분리한 hook
export function useCalendar({
  allowPastDates = false,
  defaultValue,
  minDate,
  onChange,
  value,
}: CalendarProps) {
  const isControlled = value !== undefined

  // value가 있으면 외부 상태를 따르고, 없으면 내부 상태로 동작
  const [internalDate, setInternalDate] = useState<DateRange>(
    defaultValue ?? EMPTY_RANGE
  )
  const selectedDate = (isControlled ? value : internalDate) ?? EMPTY_RANGE
  const [draftDate, setDraftDate] = useState<DateRange>(selectedDate)
  const [currentDate, setCurrentDate] = useState<Date>(
    selectedDate.start ?? new Date()
  )
  const [isOpen, setIsOpen] = useState(false)
  const [viewMode, setViewMode] = useState<CalendarViewMode>('day')

  // 마이페이지 필터처럼 과거 날짜 조회가 필요한 경우에는 제한을 풀어줍니다.
  const effectiveMinDate = allowPastDates
    ? undefined
    : startOfDay(minDate ?? new Date())

  // 현재 보고 있는 월의 날짜 목록과 앞/뒤 빈칸 수를 계산
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(monthStart)
  const daysInMonth = eachDayOfInterval({
    start: monthStart,
    end: monthEnd,
  })
  const prefixDays = (getDay(monthStart) + 6) % 7
  const suffixDays = (7 - ((prefixDays + daysInMonth.length) % 7)) % 7

  // 월 이동은 최신 currentDate를 기준으로 계산되도록 함수형 업데이트를 사용
  const prevMonth = () => {
    setCurrentDate((date) => subMonths(date, 1))
  }

  const nextMonth = () => {
    setCurrentDate((date) => addMonths(date, 1))
  }

  const prevYear = () => {
    setCurrentDate((date) => subYears(date, 1))
  }

  const nextYear = () => {
    setCurrentDate((date) => addYears(date, 1))
  }

  const selectMonth = (month: number) => {
    setCurrentDate((date) => startOfMonth(new Date(date.getFullYear(), month)))
    setViewMode('day')
  }

  const closeCalendar = () => {
    setDraftDate(selectedDate)
    setViewMode('day')
    setIsOpen(false)
  }

  const toggleCalendar = () => {
    setIsOpen((prev) => {
      if (prev) {
        setDraftDate(selectedDate)
        setViewMode('day')
      } else {
        // 캘린더를 다시 열 때는 외부에서 관리 중인 최신 선택값을 기준으로 맞춥니다.
        setDraftDate(selectedDate)
        setCurrentDate(selectedDate.start ?? new Date())
      }

      return !prev
    })
  }

  const updateDraftDate = (date: Date | null) => {
    // null은 초기화 액션으로 취급
    if (!date) {
      setDraftDate(EMPTY_RANGE)
      return
    }

    setDraftDate((currentDraftDate) => {
      if (!currentDraftDate.start || currentDraftDate.end) {
        return { start: date, end: null }
      }

      return getSortedRange(currentDraftDate.start, date)
    })
  }

  const confirmSelectedDate = () => {
    const confirmedDate = draftDate.start ? draftDate : EMPTY_RANGE

    if (!isControlled) {
      setInternalDate(confirmedDate)
    }

    onChange?.(confirmedDate.start ? confirmedDate : null)
    setIsOpen(false)
  }

  return {
    state: {
      currentDate,
      draftDate,
      isOpen,
      selectedDate,
      viewMode,
    },
    date: {
      daysInMonth,
      effectiveMinDate,
      prefixDays,
      suffixDays,
    },
    actions: {
      closeCalendar,
      confirmSelectedDate,
      nextMonth,
      nextYear,
      prevMonth,
      prevYear,
      selectMonth,
      setViewMode,
      toggleCalendar,
      updateDraftDate,
    },
  }
}

// 종료일이 시작일보다 빠르면 start/end를 바꿔 항상 오름차순 range를 만듬
function getSortedRange(start: Date, end: Date): DateRange {
  if (end < start) {
    return { start: end, end: start }
  }

  return { start, end }
}
