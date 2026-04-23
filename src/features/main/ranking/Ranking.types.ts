export type RankingType = 'weekly' | 'monthly' | 'total'

type RankingUserBase = {
  user_id: number
  nickname: string
  profile_img_url: number | string | null
  rank: number
}

// 필드명은 API 응답 기준: week_cert_count / month_cert_count / total_cert_count
export type WeeklyRankingUser = RankingUserBase & {
  week_cert_count: number
}

export type MonthlyRankingUser = RankingUserBase & {
  month_cert_count: number
}

export type TotalRankingUser = RankingUserBase & {
  total_cert_count: number
}

export type RankingUser =
  | WeeklyRankingUser
  | MonthlyRankingUser
  | TotalRankingUser

/** 정규화된 유저 타입 → cert_count로 통일 */
export type NormalizedRankingUser = RankingUserBase & {
  cert_count: number
}

export type RankingProps = {
  rankings: RankingUser[]
  isLoading: boolean
  isError: boolean
  errorMessage?: string
  activeType: RankingType
  onTypeChange: (type: RankingType) => void
  className?: string
}
