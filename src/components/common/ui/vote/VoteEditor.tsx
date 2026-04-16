import { CalendarDays, Users } from 'lucide-react'

import { Button } from '@/components/common/ui'
import { cn } from '@/utils/cn'

import { voteButtonVariants } from './Vote.style'
import type { VoteEditorProps } from './Vote.type'

function getSubmitLabel(mode: VoteEditorProps['mode']) {
  return mode === 'edit' ? '투표 수정 하기' : '투표 생성 하기'
}

const inputVariants = {
  base: 'h-14 w-full rounded-full px-5 text-sm outline-none placeholder:text-text-muted',

  enabled: {
    first: 'border border-gray-300 bg-gray-300 text-text-primary',
    second: 'border border-primary-100 bg-primary-100 text-text-primary',
  },

  disabled: 'border border-border-default bg-gray-100 text-text-muted',
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
      <Button
        type="button"
        variant="ghost"
        onClick={onClickPeriod}
        className="mb-4 flex items-center gap-2 p-0"
      >
        <CalendarDays className="h-4 w-4 text-text-muted" />
        <span
          className={cn(
            'text-sm',
            hasPeriod ? 'text-text-primary' : 'text-text-muted'
          )}
        >
          {hasPeriod ? `${startDate} ~ ${endDate}` : '투표 기간을 선택하세요'}
        </span>
      </Button>

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
                    'text-sm',
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

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitDisabled}
            className={cn(
              voteButtonVariants.base,
              isSubmitDisabled
                ? voteButtonVariants.disabled
                : voteButtonVariants.enabled
            )}
          >
            {submitLabel}
          </button>
        </div>
      </section>

      <div className="mt-4 flex items-center gap-2 text-sm text-text-muted">
        <Users className="h-4 w-4" />
        <span>{participantCount}명 참여중</span>
      </div>
    </>
  )
}
