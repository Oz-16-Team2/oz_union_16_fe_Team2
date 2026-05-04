import { VoteViewerMode } from '@/components/common/ui/vote/Vote.type'

type VoteResultOption = {
  vote_option_id: number
  content: string
  count: number
  rate: number
}

type VoteDetail = {
  status: string
  total_count: number
  is_voted?: boolean
  voted_option_id?: number | null
  options: VoteResultOption[]
}

export function getVoteMode(
  voteInfo: { status: string } | null,
  isVoted?: boolean
) {
  if (!voteInfo) return VoteViewerMode.GUEST
  if (voteInfo.status === 'closed') return VoteViewerMode.CLOSED
  if (isVoted) return VoteViewerMode.VOTED

  return VoteViewerMode.MEMBER
}

export function toVoteDisplayOptions(
  voteDetail: VoteDetail | undefined,
  selectedOptionId: string | null
) {
  return (
    voteDetail?.options.map((opt) => ({
      id: String(opt.vote_option_id),
      optionLabel: opt.content,
      valueLabel: `${opt.rate}%`,
      percentage: opt.rate,
      checked: voteDetail.is_voted
        ? voteDetail.voted_option_id === opt.vote_option_id
        : selectedOptionId === String(opt.vote_option_id),
    })) ?? []
  )
}
