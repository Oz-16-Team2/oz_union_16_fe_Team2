import { apiClient } from '@/apis/apiClient'
import type { RankingType, RankingUser } from '@/features/main/ranking'

import { RANKING_ENDPOINTS } from './endpoints'
import type { ApiRankingResponse } from './ranking.api.types'

export const rankingApi = {
  getRanking: async (type: RankingType): Promise<RankingUser[]> => {
    const response = await apiClient.get<ApiRankingResponse>(
      RANKING_ENDPOINTS.ranking(type)
    )
    return response.data.detail.rankings as RankingUser[]
  },
} as const
