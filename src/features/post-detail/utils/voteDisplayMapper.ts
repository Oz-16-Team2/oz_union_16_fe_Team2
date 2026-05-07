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

type VoteModeInfo = {
  status: string
  end_at?: string | null
  endAt?: string | null
}

function isVoteClosed(voteInfo: VoteModeInfo) {
  if (voteInfo.status.toLowerCase() === 'closed') return true

  const endAt = voteInfo.end_at ?? voteInfo.endAt
  if (!endAt) return false

  const now = new Date()
  const endDate = new Date(`${endAt}T23:59:59`)

  return now > endDate
}

// 투표 상태 - ui 모드 변환
export function getVoteMode(voteInfo: VoteModeInfo | null, isVoted?: boolean) {
  if (!voteInfo) return VoteViewerMode.GUEST
  if (isVoteClosed(voteInfo)) return VoteViewerMode.CLOSED
  if (isVoted) return VoteViewerMode.VOTED

  return VoteViewerMode.MEMBER
}

// api 응답 -> VoteDisplay 옵션 반환
export function toVoteDisplayOptions(
  voteDetail: VoteDetail | undefined,
  selectedOptionId: string | null
) {
  return (
    voteDetail?.options.map((opt) => ({
      id: String(opt.vote_option_id),
      optionLabel: opt.content,
      valueLabel: opt.content,
      percentage: opt.rate,
      checked: voteDetail.is_voted
        ? voteDetail.voted_option_id === opt.vote_option_id
        : selectedOptionId === String(opt.vote_option_id),
    })) ?? []
  )
}
