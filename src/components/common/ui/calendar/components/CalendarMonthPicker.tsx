import { format, getMonth, isSameMonth, startOfMonth } from 'date-fns'
import { ko } from 'date-fns/locale'

import { Button } from '@/components/common/ui'
import { cn } from '@/utils/cn'

// date-fns locale 기준으로 월 이름을 생성
const MONTHS = Array.from({ length: 12 }, (_, index) =>
  format(new Date(2000, index), 'M월', { locale: ko })
)

type CalendarMonthPickerProps = {
  currentDate: Date
  minDate?: Date
  onSelectMonth: (month: number) => void
}

// 월 버튼이 가질 수 있는 상태
// 상태별 월 버튼 스타일
type MonthButtonState = 'current' | 'default' | 'disabled' | 'selected'

const MONTH_BUTTON_STATE_CLASS: Record<MonthButtonState, string> = {
  current: 'text-primary-500',
  default: 'text-text-primary',
  disabled:
    'cursor-not-allowed text-text-muted disabled:!bg-transparent disabled:!text-text-muted dark:disabled:!bg-transparent',
  selected: 'bg-primary-500 text-white hover:bg-primary-500 hover:text-white',
}

// 연도 안에서 월을 빠르게 선택하는 화면
export function CalendarMonthPicker({
  currentDate,
  minDate,
  onSelectMonth,
}: CalendarMonthPickerProps) {
  return (
    <div className="grid grid-cols-3 gap-2 py-2">
      {MONTHS.map((month, index) => {
        const monthDate = startOfMonth(
          new Date(currentDate.getFullYear(), index)
        )
        const isCurrentMonth = isSameMonth(monthDate, new Date())
        const isSelectedMonth = getMonth(currentDate) === index
        const isDisabled = minDate ? monthDate < startOfMonth(minDate) : false
        // disabled > selected > current > default 순서로 월 버튼 상태를 결정
        const monthState: MonthButtonState = isDisabled
          ? 'disabled'
          : isSelectedMonth
            ? 'selected'
            : isCurrentMonth
              ? 'current'
              : 'default'

        return (
          <Button
            key={month}
            variant="ghost"
            disabled={isDisabled}
            onClick={() => onSelectMonth(index)}
            className={cn(
              'h-10 rounded-md text-sm font-semibold',
              !isDisabled &&
                !isSelectedMonth &&
                'transition-colors hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-white/10 dark:hover:text-primary-400',
              MONTH_BUTTON_STATE_CLASS[monthState]
            )}
          >
            {month}
          </Button>
        )
      })}
    </div>
  )
}
