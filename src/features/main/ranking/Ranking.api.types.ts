// GET /api/v1/statics/rankings/weekly
export type ApiWeeklyRankingUser = {
  user_id: number
  nickname: string
  profile_img_url: string | null
  rank: number
  week_cert_count: number
}

// GET /api/v1/statics/rankings/monthly
export type ApiMonthlyRankingUser = {
  user_id: number
  nickname: string
  profile_img_url: string | null
  rank: number
  month_cert_count: number
}

// GET /api/v1/statics/rankings/total
export type ApiTotalRankingUser = {
  user_id: number
  nickname: string
  profile_img_url: string | null
  rank: number
  total_cert_count: number
}

export type ApiRankingItem =
  | ApiWeeklyRankingUser
  | ApiMonthlyRankingUser
  | ApiTotalRankingUser

// GET /api/v1/statics/rankings/:type — 200 OK
export type ApiRankingResponse = {
  detail: {
    rankings: ApiRankingItem[]
  }
}
