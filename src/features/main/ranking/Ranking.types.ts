export type RankingType = 'weekly' | 'monthly' | 'total'

type RankingUserBase = {
  user_id: number
  nickname: string
  profile_img_url: number | string | null
  rank: number
}

export type WeeklyRankingUser = RankingUserBase & {
  weekly_cert_count: number
}

export type MonthlyRankingUser = RankingUserBase & {
  monthly_cert_count: number
}

export type TotalRankingUser = RankingUserBase & {
  total_cert_count: number
}

export type RankingUser =
  | WeeklyRankingUser
  | MonthlyRankingUser
  | TotalRankingUser

/** 정규화된 유저 타입을 지정 -> cert_count로 공통적으로 사용 */
export type NormalizedRankingUser = RankingUserBase & {
  cert_count: number
}

export type RankingProps = {
  rankings: RankingUser[]
  activeType: RankingType
  onTypeChange: (type: RankingType) => void
  className?: string
}
