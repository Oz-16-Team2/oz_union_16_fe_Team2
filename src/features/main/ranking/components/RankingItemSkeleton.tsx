import { Medal } from 'lucide-react'

import { cn } from '@/utils/cn'

import { DEFAULT_RANK_STYLE, RANK_STYLES } from '../Ranking.constants'

type RankingItemSkeletonProps = {
  rank: number
}

export function RankingItemSkeleton({ rank }: RankingItemSkeletonProps) {
  const isTop3 = rank <= 3
  const { text, border } = RANK_STYLES[rank] ?? DEFAULT_RANK_STYLE

  return (
    <li
      className={cn(
        'flex w-full items-center gap-2 rounded-xl border px-3 py-2.5',
        border
      )}
    >
      {/* 순위 배지 */}
      <span
        className={cn(
          'flex items-center justify-center size-7 text-sm shrink-0',
          text
        )}
      >
        {isTop3 ? <Medal size={22} className="shrink-0" /> : `${rank}위`}
      </span>

      {/* 프로필 이미지 스켈레톤 */}
      <div
        className={cn(
          'size-8 rounded-full border-2 overflow-hidden shrink-0',
          border
        )}
      >
        <div className="size-full animate-pulse bg-border-default" />
      </div>

      {/* 닉네임 스켈레톤 */}
      <div className="h-3.5 w-20 animate-pulse rounded bg-border-default" />

      {/* 인증 횟수 스켈레톤 */}
      <div className="ml-auto h-3 w-10 shrink-0 animate-pulse rounded bg-border-default" />
    </li>
  )
}
