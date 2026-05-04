import { useRef } from 'react'

import { AlertCircle, Trophy } from 'lucide-react'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { TabButton } from '@/components/common/ui'
import { cn } from '@/utils/cn'

import type { ApiRankingItem } from '../Ranking.api.types'
import { TAB_LABELS } from '../Ranking.constants'
import type { RankingProps, RankingType } from '../Ranking.types'
import { normalizeUser } from '../Ranking.utils'
import { RankingItem } from './RankingItem'
import { RankingItemSkeleton } from './RankingItemSkeleton'

import 'swiper/css'

const RANKING_TYPES: RankingType[] = ['weekly', 'monthly', 'total']
const SKELETON_COUNT = 5

export function Ranking({
  rankings,
  isLoading,
  isError,
  errorMessage,
  activeType,
  onTypeChange,
  className,
}: RankingProps) {
  const swiperRef = useRef<SwiperType | null>(null)

  const handleTabClick = (type: RankingType) => {
    const index = RANKING_TYPES.indexOf(type)
    swiperRef.current?.slideTo(index)
  }

  const handleSlideChange = (swiper: SwiperType) => {
    onTypeChange(RANKING_TYPES[swiper.activeIndex])
  }

  const normalizedUsers = rankings.map((user: ApiRankingItem) =>
    normalizeUser(user, activeType)
  )

  return (
    <section
      className={cn(
        'w-full min-w-0 rounded-2xl bg-surface border border-border-default p-4',
        className
      )}
    >
      {/* 랭킹 순위 */}
      <div className="flex items-center gap-2 mb-3">
        <Trophy size={30} className="text-yellow-500 shrink-0" />
        <h2 className="text-2xl font-bold text-text-primary">랭킹 순위</h2>
      </div>

      {/* 탭 버튼 - 주간, 월간, 전체 */}
      <div className="flex gap-2 mb-3">
        {RANKING_TYPES.map((type) => (
          <TabButton
            key={type}
            isActive={activeType === type}
            onClick={() => handleTabClick(type)}
            className="cursor-pointer"
          >
            {TAB_LABELS[type]}
          </TabButton>
        ))}
      </div>

      <hr className="border-border-default mb-3" />

      {/* 랭킹 슬라이드 */}
      {isError ? (
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-error-500">
          <AlertCircle size={36} className="opacity-60" />
          <p className="text-sm">
            {errorMessage ?? '랭킹 정보를 불러오는 데 실패했습니다.'}
          </p>
        </div>
      ) : (
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          onSlideChange={handleSlideChange}
          initialSlide={RANKING_TYPES.indexOf(activeType)}
        >
          {RANKING_TYPES.map((type) => (
            <SwiperSlide key={type}>
              <ul className="flex flex-col gap-0.5">
                {isLoading
                  ? Array.from({ length: SKELETON_COUNT }, (_, i) => (
                      <RankingItemSkeleton key={i} rank={i + 1} />
                    ))
                  : normalizedUsers.map((user) => (
                      <RankingItem key={user.user_id} user={user} />
                    ))}
              </ul>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  )
}
