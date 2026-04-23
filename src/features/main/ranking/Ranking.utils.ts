import type {
  ApiMonthlyRankingUser,
  ApiRankingItem,
  ApiTotalRankingUser,
  ApiWeeklyRankingUser,
} from './Ranking.api.types'
import type { NormalizedRankingUser, RankingType } from './Ranking.types'

export function normalizeUser(
  user: ApiRankingItem,
  type: RankingType
): NormalizedRankingUser {
  switch (type) {
    case 'weekly': {
      const u = user as ApiWeeklyRankingUser
      return { ...u, cert_count: u.week_cert_count }
    }
    case 'monthly': {
      const u = user as ApiMonthlyRankingUser
      return { ...u, cert_count: u.month_cert_count }
    }
    case 'total': {
      const u = user as ApiTotalRankingUser
      return { ...u, cert_count: u.total_cert_count }
    }
  }
}
