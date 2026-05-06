import { VoteEditor } from '@/components/common/ui'
import type { DateRange } from '@/components/common/ui/calendar/Calendar.type'
import { cn } from '@/utils/cn'

import type { PostFormMode } from '../post.types'

type PostVoteSectionProps = {
  mode: PostFormMode
  options: string[]
  period?: DateRange
  onChangeOption: (index: number, value: string) => void
  onChangePeriod: (date: DateRange | null) => void
  isExistingVoteLocked?: boolean
}

function formatDate(date?: Date | null) {
  if (!date) return ''
  return date.toISOString().split('T')[0].replaceAll('-', '.')
}

export function PostVoteSection({
  mode,
  options,
  period,
  onChangeOption,
  onChangePeriod,
  isExistingVoteLocked = false,
}: PostVoteSectionProps) {
  if (isExistingVoteLocked) {
    return (
      <>
        <p className="text-sm text-text-muted">
          기존 투표는 수정 페이지에서 변경할 수 없습니다. 투표 수정은
          상세페이지에서 진행해주세요.
        </p>

        <div className="mb-2 flex items-center gap-2 text-sm">
          <span className="text-text-primary">투표 진행중</span>
          <span className="text-text-primary">
            {formatDate(period?.start)} ~ {formatDate(period?.end)}
          </span>
        </div>
        <section className="relative mx-auto min-h-62 w-full max-w-267.5 rounded-2xl border border-border-default bg-gray-100 px-6 py-6 shadow-card-main dark:bg-white/10">
          <div className="flex flex-col gap-4 pt-8">
            {options.map((option, index) => {
              const isFirst = index === 0

              return (
                <div
                  key={`${option}-${index}`}
                  className="grid w-full grid-cols-[20px_minmax(0,1fr)_44px] items-center gap-2 text-left sm:grid-cols-[24px_minmax(0,1fr)_56px]"
                >
                  <span className="flex items-center justify-center">
                    <span className="flex size-4 items-center justify-center rounded-sm bg-gray-300 dark:bg-white/20" />
                  </span>

                  <div className="relative h-12 min-w-0 overflow-hidden rounded-full bg-gray-100 shadow-sm dark:bg-white/10 sm:h-14">
                    <div
                      className={cn(
                        'absolute inset-y-0 left-0 rounded-full',
                        isFirst ? 'bg-gray-300' : 'bg-primary-100'
                      )}
                      style={{ width: '0%' }}
                    />

                    <span className="relative z-10 flex h-full min-w-0 items-center truncate px-3 text-sm font-medium text-text-primary sm:px-6">
                      {option}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </>
    )
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border-default bg-surface p-4">
      <VoteEditor
        mode={mode}
        options={options}
        period={period}
        onChangeOption={onChangeOption}
        onChangePeriod={onChangePeriod}
      />
    </div>
  )
}
