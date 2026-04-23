import type { RankingType } from '@/features/main/ranking'

export const RANKING_ENDPOINTS = {
  ranking: (type: RankingType) => `/statics/rankings/${type}`,
  // ranking()은 RankingType만 허용해 ':rankingType' 같은 MSW 패턴 문자열을 넘길 수 없으므로
  // MSW 핸들러 전용 패턴 경로를 별도 분리
  rankingPattern: '/statics/rankings/:rankingType',
} as const
