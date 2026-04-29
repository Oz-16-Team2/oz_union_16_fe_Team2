import type { RankingType } from '@/features/main/ranking'

export const RANKING_ENDPOINTS = {
  ranking: (type: RankingType) => `/goals/ranking/${type}`,
} as const
