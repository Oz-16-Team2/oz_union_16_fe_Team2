import type { ApiRankingItem } from './Ranking.api.types'

export type RankingType = 'weekly' | 'monthly' | 'total'

/** 정규화된 유저 타입 → cert_count로 통일 */
export type NormalizedRankingUser = {
  user_id: number
  nickname: string
  profile_img_url: string | null
  rank: number
  cert_count: number
}

export type RankingProps = {
  rankings: ApiRankingItem[]
  isLoading: boolean
  isError: boolean
  errorMessage?: string
  activeType: RankingType
  onTypeChange: (type: RankingType) => void
  className?: string
}
