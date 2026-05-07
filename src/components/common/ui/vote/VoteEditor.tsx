import { Users } from 'lucide-react'

import { Button, Calendar } from '@/components/common/ui'
import { cn } from '@/utils/cn'

import { VoteEditorMode, type VoteEditorProps } from './Vote.type'

const VOTE_OPTION_MAX_LENGTH = 12

function getSubmitLabel(mode: VoteEditorProps['mode']) {
  return mode === VoteEditorMode.EDIT ? '투표 수정하기' : '투표 생성하기'
}

const inputVariants = {
  base: 'h-10 w-full rounded-full px-4 text-sm shadow-sm outline-none placeholder:text-text-muted sm:h-10 sm:px-4',

  enabled: {
    first:
      'border border-gray-300 bg-gray-300 text-text-primary dark:border-white/15 dark:bg-white/20',
    second:
      'border border-primary-100 bg-primary-100 text-text-primary dark:border-primary-400/30 dark:bg-primary-600/20',
  },

  disabled:
    'border border-border-default bg-gray-100 text-text-muted dark:bg-white/10',
}

export function VoteEditor({
  mode,
  period,
  options,
  participantCount = 0,
  disabled = false,
  hideOptionLength = false,
  hideParticipantCount = false,
  periodError,
  actionSlot,
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
      <div className="mb-3">
        <Calendar
          value={period}
          onChange={onChangePeriod}
          label="투표 기간을 선택하세요"
          className="w-full"
        />

        {periodError && (
          <p className="mt-1.5 px-4 text-xs text-status-danger-text">
            {periodError}
          </p>
        )}
      </div>

      <section className="w-full rounded-2xl border border-border-default bg-gray-100 px-3 py-3 dark:bg-white/10 sm:px-3.5 sm:py-3.5">
        <div className="flex flex-col gap-2">
          {options.map((option, index) => {
            const safeOption = option.slice(0, VOTE_OPTION_MAX_LENGTH)

            const inputStyle = hasPeriod
              ? index === 0
                ? inputVariants.enabled.first
                : inputVariants.enabled.second
              : inputVariants.disabled

            return (
              <div
                key={`vote-editor-option-${index}`}
                className="grid grid-cols-[60px_minmax(0,1fr)] items-center gap-2 sm:grid-cols-[64px_minmax(0,1fr)]"
              >
                <span
                  className={cn(
                    'text-sm',
                    hasPeriod ? 'text-text-primary' : 'text-text-muted'
                  )}
                >
                  옵션 입력
                </span>

                <div className="relative w-full min-w-0">
                  <input
                    value={safeOption}
                    maxLength={VOTE_OPTION_MAX_LENGTH}
                    disabled={disabled}
                    onChange={(e) =>
                      onChangeOption?.(
                        index,
                        e.target.value.slice(0, VOTE_OPTION_MAX_LENGTH)
                      )
                    }
                    placeholder="옵션을 입력하세요"
                    className={cn(
                      inputVariants.base,
                      inputStyle,
                      'pr-14 focus:border-focus-border'
                    )}
                  />

                  {!hideOptionLength && (
                    <span className="absolute right-5 bottom-1.5 text-2xs text-text-muted">
                      {safeOption.length}/{VOTE_OPTION_MAX_LENGTH}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {onSubmit && (
          <div className="mt-4 flex justify-center sm:mt-5">
            <Button
              type="button"
              variant="primary"
              onClick={onSubmit}
              disabled={isSubmitDisabled}
              className="h-10 w-full disabled:bg-gray-300 disabled:text-text-muted disabled:hover:bg-gray-300 dark:disabled:bg-white/15 dark:disabled:text-white/40 dark:disabled:hover:bg-white/15 sm:max-w-md"
            >
              {submitLabel}
            </Button>
          </div>
        )}
      </section>

      {!hideParticipantCount && (
        <div className="mt-3 flex items-center justify-between gap-2 text-sm text-text-muted">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{participantCount}명 참여중</span>
          </div>

          {actionSlot}
        </div>
      )}
    </>
  )
}
