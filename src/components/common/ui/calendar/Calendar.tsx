import { CalendarDays } from 'lucide-react'

import { Button } from '@/components/common/ui'
import { cn } from '@/utils/cn'

import type { CalendarProps } from './Calendar.type'
import { formatSelectedDate } from './Calendar.util'
import { CalendarBody } from './components/CalendarBody'
import { CalendarHeader } from './components/CalendarHeader'
import { CalendarMonthPicker } from './components/CalendarMonthPicker'
import { useCalendar } from './useCalendar'

// 캘린더 컨테이너는 상태 hook과 하위 UI 컴포넌트를 연결한다.
export function Calendar({
  label = '날짜를 선택해주세요',
  ...calendarProps
}: CalendarProps) {
  // state/date/actions로 hook 반환값을 묶어 Calendar JSX에서 역할을 구분
  const { actions, date, state } = useCalendar(calendarProps)
  const hasSelectedDate = Boolean(state.selectedDate.start)
  const triggerTextColorClass = hasSelectedDate
    ? 'text-text-primary'
    : 'text-text-muted group-hover:text-text-primary'

  return (
    <div className="relative w-full">
      {/* 캘린더의 열림/닫힘 버튼 */}
      <div className="flex w-50">
        <Button
          variant="ghost"
          aria-expanded={state.isOpen}
          onClick={actions.toggleCalendar}
          className="group inline-flex hover:bg-transparent"
          leftIcon={
            <CalendarDays
              aria-hidden="true"
              className={cn('shrink-0', triggerTextColorClass)}
              size={16}
            />
          }
        >
          <span className={cn('text-xs font-semibold', triggerTextColorClass)}>
            {formatSelectedDate(state.selectedDate, label)}
          </span>
        </Button>
      </div>

      {/* 패널은 날짜 선택 모드와 월 선택 모드를 전환해서 보여줌 */}
      {state.isOpen && (
        <div className="absolute left-0 top-full z-10 mt-3 h-fit w-2xs rounded-2xl border border-border-default/60 bg-white/80 p-4 shadow-card-main backdrop-blur-md">
          <CalendarHeader
            currentDate={state.currentDate}
            onClose={actions.closeCalendar}
            onNextMonth={
              state.viewMode === 'day' ? actions.nextMonth : actions.nextYear
            }
            onPrevMonth={
              state.viewMode === 'day' ? actions.prevMonth : actions.prevYear
            }
            // 제목 클릭 시 날짜 보기와 월 선택 보기를 전환
            onTitleClick={() =>
              actions.setViewMode((mode) => (mode === 'day' ? 'month' : 'day'))
            }
            viewMode={state.viewMode}
          />

          {state.viewMode === 'day' ? (
            <CalendarBody
              daysInMonth={date.daysInMonth}
              holidays={calendarProps.holidays ?? []}
              minDate={date.effectiveMinDate}
              prefixDays={date.prefixDays}
              selectedDate={state.draftDate}
              suffixDays={date.suffixDays}
              onSelectDate={actions.updateDraftDate}
            />
          ) : (
            // 월 선택 후에는 선택한 월의 날짜 보기로 돌아감
            <CalendarMonthPicker
              currentDate={state.currentDate}
              minDate={date.effectiveMinDate}
              onSelectMonth={actions.selectMonth}
            />
          )}

          {/* 캘린더 하단의 초기화/선택 액션 */}
          <div className="mt-2 flex items-center gap-4">
            <Button
              size="md"
              variant="neutral"
              className="w-full"
              onClick={() => actions.updateDraftDate(null)}
            >
              초기화
            </Button>
            <Button
              size="md"
              className="w-full"
              onClick={actions.confirmSelectedDate}
            >
              선택
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
