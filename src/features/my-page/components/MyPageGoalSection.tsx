import { useState } from 'react'

import { Plus, RotateCcw } from 'lucide-react'

import { Button, GoalCardEdit, TabButton } from '@/components/common/ui'
import { cn } from '@/utils/cn'

const GOAL_FILTERS = ['전체 보기', '진행중', '미달성', '완료'] as const

export function MyPageGoalSection() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof GOAL_FILTERS)[number]>('진행중')
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const handleResetFilter = () => {
    setActiveFilter('전체 보기')
  }

  return (
    <section className="flex flex-col gap-8">
      {/* 목표 목록 필터와 생성 버튼을 한 줄로 묶는 상단 영역 */}
      <div className="flex justify-between items-center border-b border-border-default  pb-1">
        <div className="flex flex-wrap items-center gap-0.5">
          {GOAL_FILTERS.map((filter) => (
            <TabButton
              key={filter}
              type="button"
              isActive={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className="px-0"
            >
              {filter}
            </TabButton>
          ))}
          <span className="text-[#e0e0e0]">|</span>
          <Button
            variant="ghost"
            rounded="full"
            leftIcon={<RotateCcw className="size-4" aria-hidden="true" />}
            onClick={handleResetFilter}
            className="h-8 px-3 text-sm text-text-muted hover:text-primary-600"
          >
            초기화
          </Button>
        </div>

        <Button
          size={'md'}
          rounded="full"
          leftIcon={<Plus className="size-4" aria-hidden="true" />}
          onClick={() => setIsCreateOpen(true)}
          className="w-fit"
        >
          목표 생성
        </Button>
      </div>

      {/* TODO: API 연결 후 생성 카드와 목표 카드 데이터를 서버 상태 기준으로 교체 */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(276px,1fr))] justify-items-center gap-y-4.5">
        <div
          className={cn(
            'transition-opacity duration-200',
            isCreateOpen ? 'opacity-100' : 'pointer-events-none opacity-40'
          )}
          aria-disabled={!isCreateOpen}
        >
          <GoalCardEdit
            mode="create"
            initialTitle=""
            initialDateRange={{ start: null, end: null }}
            initialProgressRate={0}
            initialStatus="IN_PROGRESS"
            onClose={() => setIsCreateOpen(false)}
            onSubmit={() => setIsCreateOpen(false)}
          />
        </div>

        {/* 목표 생성 카드 map 으로 */}
      </div>
    </section>
  )
}
