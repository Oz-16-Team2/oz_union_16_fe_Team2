import { apiClient } from '@/apis/apiClient'
import type { RankingType } from '@/features/main/ranking'
import type { ApiRankingResponse } from '@/features/main/ranking/Ranking.api.types'

import { RANKING_ENDPOINTS } from './endpoints'

export const rankingApi = {
  getRanking: (type: RankingType) =>
    apiClient.get<ApiRankingResponse>(RANKING_ENDPOINTS.ranking(type)),
} as const
