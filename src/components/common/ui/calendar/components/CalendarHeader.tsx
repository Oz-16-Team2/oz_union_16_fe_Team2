import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

import { Button } from '@/components/common/ui'

import type { CalendarViewMode } from '../Calendar.type'

type CalendarHeaderProps = {
  currentDate: Date
  onClose: () => void
  onNextMonth: () => void
  onPrevMonth: () => void
  onTitleClick: () => void
  viewMode: CalendarViewMode
}

// 패널 상단 영역 현재 월 표시, 월 이동, 닫기 액션을 담당
export function CalendarHeader({
  currentDate,
  onClose,
  onNextMonth,
  onPrevMonth,
  onTitleClick,
  viewMode,
}: CalendarHeaderProps) {
  const title =
    viewMode === 'day'
      ? format(currentDate, 'yyyy년 M월', { locale: ko })
      : format(currentDate, 'yyyy년', { locale: ko })

  return (
    <>
      <Button
        variant="ghost"
        aria-label="달력 닫기"
        onClick={onClose}
        leftIcon={<X aria-hidden="true" size={10} />}
        className="absolute right-1.5 top-2 z-10 rounded-full bg-black/10 p-1 hover:bg-black/20"
      />

      <div className="my-2.5 grid grid-cols-[1fr_auto_1fr] items-center">
        <Button
          variant="ghost"
          onClick={onPrevMonth}
          aria-label={viewMode === 'day' ? 'Previous month' : 'Previous year'}
          leftIcon={<ChevronLeft aria-hidden="true" size={20} />}
          className="size-8 justify-self-start hover:bg-transparent hover:text-primary-500"
        />

        <Button
          variant="ghost"
          onClick={onTitleClick}
          className="text-base text-text-primary hover:bg-primary-100"
        >
          {title}
        </Button>

        <Button
          variant="ghost"
          onClick={onNextMonth}
          aria-label={viewMode === 'day' ? 'Next month' : 'Next year'}
          rightIcon={<ChevronRight aria-hidden="true" size={20} />}
          className="size-8 justify-self-end hover:bg-transparent hover:text-primary-500"
        />
      </div>
    </>
  )
}
