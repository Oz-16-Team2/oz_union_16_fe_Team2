import type { VoteEditorMode } from '@/components/common/ui'
import { Input, VoteEditor } from '@/components/common/ui'
import type { DateRange } from '@/components/common/ui/calendar/Calendar.type'

import type { PostFormMode } from '../post.types'
import { SectionLabel } from './SectionLabel'

type PostVoteSectionProps = {
  mode: PostFormMode
  question: string
  options: string[]
  period?: DateRange
  onChangeQuestion: (question: string) => void
  onChangeOption: (index: number, value: string) => void
  onChangePeriod: (date: DateRange | null) => void
  onConfirm: () => void
}

export function PostVoteSection({
  mode,
  question,
  options,
  period,
  onChangeQuestion,
  onChangeOption,
  onChangePeriod,
  onConfirm,
}: PostVoteSectionProps) {
  // 일단 생성 페이지에서 투표 생성 , 수정 페이지에선 투표 수정 한다는 가정
  const voteEditorMode = mode as VoteEditorMode

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border-default bg-surface p-4">
      <SectionLabel label="투표 생성" />

      <Input
        placeholder="투표 제목을 입력하세요"
        value={question}
        onChange={(e) => onChangeQuestion(e.target.value)}
      />

      <VoteEditor
        mode={voteEditorMode}
        options={options}
        period={period}
        onChangeOption={onChangeOption}
        onChangePeriod={onChangePeriod}
        onSubmit={onConfirm}
      />
    </div>
  )
}
