import { Crown, Medal } from 'lucide-react'

import { pinkCharacterImage } from '@/assets/images'
import { cn } from '@/utils/cn'

import { DEFAULT_RANK_STYLE, RANK_STYLES } from '../Ranking.constants'
import type { NormalizedRankingUser } from '../Ranking.types'

type RankingItemProps = {
  user: NormalizedRankingUser
}

export function RankingItem({ user }: RankingItemProps) {
  const { rank, nickname, cert_count, profile_img_url } = user

  const isTop3 = rank <= 3
  const {
    text: rankTextStyle,
    bg,
    border,
    shadow,
  } = RANK_STYLES[rank] ?? DEFAULT_RANK_STYLE

  return (
    <li
      className={cn(
        'flex w-full items-center gap-2 rounded-xl border px-3 py-2.5 transition-shadow cursor-pointer',
        bg,
        border,
        shadow
      )}
    >
      {/* 순위 배지 */}
      <span
        className={cn(
          'flex items-center justify-center size-7 text-sm shrink-0',
          rankTextStyle
        )}
      >
        {isTop3 ? <Medal size={22} className="shrink-0" /> : `${rank}위`}
      </span>

      <div className="relative shrink-0">
        {rank === 1 && (
          <Crown
            size={14}
            className="absolute text-text-ranking-gold fill-text-ranking-gold -rotate-40"
            // 왕관 위치 미세 조정을 위한 하드 코딩
            style={{ top: '-20%', left: '-15%' }}
          />
        )}
        <div
          className={cn('size-8 rounded-full border-2 overflow-hidden', border)}
        >
          <img
            src={profile_img_url || pinkCharacterImage}
            alt="기본 프로필"
            className="size-full object-cover"
          />
        </div>
      </div>

      {/* 닉네임 */}
      <span className="flex-1 text-sm truncate text-text-primary">
        {nickname}
      </span>

      {/* 인증 횟수 */}
      <span className="text-xs text-text-muted shrink-0">
        <span className={cn('font-semibold', isTop3 && rankTextStyle)}>
          {cert_count} 회
        </span>
      </span>
    </li>
  )
}
