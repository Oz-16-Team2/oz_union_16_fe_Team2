import { Trophy } from 'lucide-react'

import { TabButton } from '@/components/common/ui'
import { cn } from '@/utils/cn'

import { TAB_LABELS } from './Ranking.constants'
import type { RankingProps, RankingType } from './Ranking.types'
import { normalizeUser } from './Ranking.utils'
import { RankingItem } from './RankingItem'

const RANKING_TYPES: RankingType[] = ['weekly', 'monthly', 'total']

export function Ranking({
  rankings,
  activeType,
  onTypeChange,
  className,
}: RankingProps) {
  const normalizedRankings = rankings.map((user) =>
    normalizeUser(user, activeType)
  )

  return (
    <section
      className={cn(
        'w-full min-w-sm rounded-2xl bg-surface border border-border-default p-4 ',
        className
      )}
    >
      {/* 헤더 */}
      <div className="flex flex-col gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Trophy size={30} className="text-yellow-500 shrink-0" />
          <h2 className="text-2xl font-bold text-text-primary">랭킹 순위</h2>
        </div>
      </div>

      {/* 탭 */}
      <div className="flex gap-2 mb-3">
        {RANKING_TYPES.map((type) => (
          <TabButton
            key={type}
            isActive={activeType === type}
            onClick={() => onTypeChange(type)}
            className="cursor-pointer"
          >
            {TAB_LABELS[type]}
          </TabButton>
        ))}
      </div>

      <hr className="border-border-default mb-3" />

      {/* 랭킹 목록 */}
      <ul className="flex flex-col gap-0.5">
        {normalizedRankings.map((user) => (
          <RankingItem key={user.user_id} user={user} />
        ))}
      </ul>
    </section>
  )
}
