import { CalendarDays, Users } from 'lucide-react'

import { Button } from '@/components/common/ui'
import { cn } from '@/utils/cn'

import type { VoteEditorProps } from './Vote.type'

function getSubmitLabel(mode: VoteEditorProps['mode']) {
  return mode === 'edit' ? '투표 수정 하기' : '투표 생성 하기'
}

const inputVariants = {
  base: 'h-[54px] w-full rounded-full px-5 text-[14px] outline-none placeholder:text-text-muted',

  enabled: {
    first: 'border border-gray-300 bg-gray-300 text-text-primary',
    second: 'border border-primary-100 bg-primary-100 text-text-primary',
  },

  disabled: 'border border-border-default bg-gray-100 text-text-muted',
}

const buttonVariants = {
  base: 'h-[42px] w-[464px] rounded-lg text-[16px] font-medium',

  enabled:
    'bg-button-primary-bg text-button-primary-text hover:bg-button-primary-hover',

  disabled: 'cursor-not-allowed bg-gray-400 text-white',
}

export function VoteEditor({
  mode,
  startDate,
  endDate,
  options,
  participantCount = 0,
  disabled = false,
  onChangeOption,
  onSubmit,
  onClickPeriod,
}: VoteEditorProps) {
  const hasPeriod = Boolean(startDate && endDate)
  const hasValidOptions = options.every((opt) => opt.trim() !== '')
  const isSubmitDisabled = disabled || !hasPeriod || !hasValidOptions
  const submitLabel = getSubmitLabel(mode)

  return (
    <>
      {/* 기간 */}
      <Button
        type="button"
        variant="ghost"
        onClick={onClickPeriod}
        className="mb-4 flex items-center gap-2 p-0"
      >
        <CalendarDays className="h-4 w-4 text-text-muted" />
        <span
          className={cn(
            'text-[14px]',
            hasPeriod ? 'text-text-primary' : 'text-text-muted'
          )}
        >
          {hasPeriod ? `${startDate} ~ ${endDate}` : '투표 기간을 선택하세요'}
        </span>
      </Button>

      {/* 카드 */}
      <section className="w-full rounded-2xl border border-border-default bg-gray-100 px-6 py-6">
        <div className="flex flex-col gap-4">
          {options.map((option, index) => {
            const inputStyle = hasPeriod
              ? index === 0
                ? inputVariants.enabled.first
                : inputVariants.enabled.second
              : inputVariants.disabled

            return (
              <div
                key={`vote-editor-option-${index}`}
                className="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-4"
              >
                <span
                  className={cn(
                    'text-[14px]',
                    hasPeriod ? 'text-text-primary' : 'text-text-muted'
                  )}
                >
                  옵션 입력
                </span>

                <input
                  value={option}
                  onChange={(e) => onChangeOption?.(index, e.target.value)}
                  placeholder="옵션을 입력하세요"
                  className={cn(
                    inputVariants.base,
                    inputStyle,
                    'focus:border-focus-border'
                  )}
                />
              </div>
            )
          })}
        </div>

        {/* 버튼 */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitDisabled}
            className={cn(
              buttonVariants.base,
              isSubmitDisabled
                ? buttonVariants.disabled
                : buttonVariants.enabled
            )}
          >
            {submitLabel}
          </button>
        </div>
      </section>

      {/* 참여 */}
      <div className="mt-4 flex items-center gap-2 text-[14px] text-text-muted">
        <Users className="h-4 w-4" />
        <span>{participantCount}명 참여중</span>
      </div>
    </>
  )
}
