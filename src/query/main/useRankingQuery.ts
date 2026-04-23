import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import type { ApiErrorResponse } from '@/apis/api.types'
import { rankingApi } from '@/apis/ranking'
import type { RankingType } from '@/features/main/ranking'
import type { ApiRankingItem } from '@/features/main/ranking/Ranking.api.types'

const RANKING_STALE_TIME = 3 * 60 * 1000

export function useRankingQuery(type: RankingType) {
  return useQuery<ApiRankingItem[], AxiosError<ApiErrorResponse>>({
    queryKey: ['ranking', type],
    queryFn: () =>
      rankingApi.getRanking(type).then((res) => res.data.detail.rankings),
    staleTime: RANKING_STALE_TIME,
  })
}
