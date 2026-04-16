import type { RankingType } from './Ranking.types'

type RankStyleConfig = {
  text: string
  bg: string
  border: string
  shadow: string
}

export const RANK_STYLES: Record<number, RankStyleConfig> = {
  1: {
    text: 'text-text-ranking-gold font-bold',
    bg: 'bg-ranking-gold-bg',
    border: 'border-ranking-gold-border',
    shadow: 'hover:shadow-ranking-gold',
  },
  2: {
    text: 'text-text-ranking-silver font-bold',
    bg: 'bg-ranking-silver-bg',
    border: 'border-ranking-silver-border',
    shadow: 'hover:shadow-ranking-silver',
  },
  3: {
    text: 'text-text-ranking-bronze font-bold',
    bg: 'bg-ranking-bronze-bg',
    border: 'border-ranking-bronze-border',
    shadow: 'hover:shadow-ranking-bronze',
  },
}

export const DEFAULT_RANK_STYLE: RankStyleConfig = {
  text: 'text-text-muted font-medium',
  bg: 'bg-ranking-default-bg',
  border: 'border-ranking-default-border',
  shadow: '',
}

export const TAB_LABELS: Record<RankingType, string> = {
  weekly: '주간',
  monthly: '월간',
  total: '누적',
}
