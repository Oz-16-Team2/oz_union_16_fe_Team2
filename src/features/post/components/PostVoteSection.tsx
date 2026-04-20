import { VoteEditor } from '@/components/common/ui'
import type { DateRange } from '@/components/common/ui/calendar/Calendar.type'

import type { PostFormMode } from '../post.types'

type PostVoteSectionProps = {
  mode: PostFormMode
  options: string[]
  period?: DateRange
  onChangeOption: (index: number, value: string) => void
  onChangePeriod: (date: DateRange | null) => void
}

export function PostVoteSection({
  mode,
  options,
  period,
  onChangeOption,
  onChangePeriod,
}: PostVoteSectionProps) {
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
