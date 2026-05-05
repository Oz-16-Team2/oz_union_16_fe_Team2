import { Users } from 'lucide-react'

import { Button, Calendar } from '@/components/common/ui'
import { cn } from '@/utils/cn'

import { VoteEditorMode, type VoteEditorProps } from './Vote.type'

function getSubmitLabel(mode: VoteEditorProps['mode']) {
  return mode === VoteEditorMode.EDIT ? '투표 수정하기' : '투표 생성하기'
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
  period,
  options,
  participantCount = 0,
  disabled = false,
  hideOptionLength = false,
  hideParticipantCount = false,
  onChangeOption,
  onSubmit,
  onChangePeriod,
}: VoteEditorProps) {
  const hasPeriod = Boolean(period?.start && period?.end)
  const hasValidOptions = options.every((option) => option.trim() !== '')
  const isSubmitDisabled = disabled || !hasPeriod || !hasValidOptions
  const submitLabel = getSubmitLabel(mode)

  return (
    <>
      <div className="mb-4">
        <Calendar
          value={period}
          onChange={onChangePeriod}
          label="투표 기간을 선택하세요"
        />
      </div>

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

                <div className="min-w-0">
                  <input
                    value={option}
                    maxLength={12}
                    disabled={disabled}
                    onChange={(e) => onChangeOption?.(index, e.target.value)}
                    placeholder="옵션을 입력하세요"
                    className={cn(
                      inputVariants.base,
                      inputStyle,
                      'focus:border-focus-border'
                    )}
                  />

                  {!hideOptionLength && (
                    <span className="mt-1 block text-right text-xs text-text-muted">
                      {option.length}/12
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {onSubmit && (
          <div className="mt-8 flex justify-center">
            <Button
              type="button"
              variant="primary"
              onClick={onSubmit}
              disabled={isSubmitDisabled}
              className="h-10 w-full max-w-md"
            >
              {submitLabel}
            </Button>
          </div>
        )}
      </section>

      {!hideParticipantCount && (
        <div className="mt-4 flex items-center gap-2 text-sm text-text-muted">
          <Users className="h-4 w-4" />
          <span>{participantCount}명 참여중</span>
        </div>
      )}
    </>
  )
}
