// 캘린더는 시작일과 종료일을 함께 다루는 range 값을 사용
export type DateRange = {
  start: Date | null
  end: Date | null
}

export type CalendarViewMode = 'day' | 'month'

// 목표 생성/투표 생성에서 같은 Calendar를 재사용하기 위한 외부 props
export type CalendarProps = {
  allowPastDates?: boolean
  ariaLabel?: string
  defaultValue?: DateRange
  holidays?: Date[]
  hideLabelOnMobile?: boolean
  label?: string
  minDate?: Date
  onChange?: (date: DateRange | null) => void
  value?: DateRange
  className?: string
}
