import type {
  MonthlyRankingUser,
  NormalizedRankingUser,
  RankingType,
  RankingUser,
  TotalRankingUser,
  WeeklyRankingUser,
} from './Ranking.types'

export function normalizeUser(
  user: RankingUser,
  type: RankingType
): NormalizedRankingUser {
  switch (type) {
    case 'weekly': {
      const u = user as WeeklyRankingUser
      return { ...u, cert_count: u.week_cert_count }
    }
    case 'monthly': {
      const u = user as MonthlyRankingUser
      return { ...u, cert_count: u.month_cert_count }
    }
    case 'total': {
      const u = user as TotalRankingUser
      return { ...u, cert_count: u.total_cert_count }
    }
  }
}
