import { Button } from '@/components/common/ui'
import { cn } from '@/utils/cn'

import { MAX_TAGS } from '../post.constants'
import type { TagOption } from '../post.types'

// TODO: 레이아웃 테스트용 mock 데이터 — API 연동 시 제거
// 실제 데이터는 GET /api/v1/tags 로 fetch
const MOCK_TAGS: TagOption[] = [
  { id: 1, name: '운동' },
  { id: 2, name: '독서' },
  { id: 3, name: '공부' },
  { id: 4, name: '식단' },
  { id: 5, name: '취미' },
  { id: 6, name: '자기계발' },
]

type PostTagSectionProps = {
  selectedTagIds: number[]
  onToggle: (id: number) => void
}

export function PostTagSection({
  selectedTagIds,
  onToggle,
}: PostTagSectionProps) {
  // TODO: API 연동 시 MOCK_TAGS를 useQuery 또는 fetch 결과로 교체
  // GET /api/v1/tags
  const tags = MOCK_TAGS
  const isMaxReached = selectedTagIds.length >= MAX_TAGS

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isSelected = selectedTagIds.includes(tag.id)
        const isDisabled = isMaxReached && !isSelected

        return (
          <Button
            key={tag.id}
            onClick={() => onToggle(tag.id)}
            size="md"
            rounded="full"
            disabled={isDisabled}
            className={cn(
              'font-medium transition-colors',
              isSelected
                ? 'bg-primary-500 text-white'
                : isDisabled
                  ? 'cursor-not-allowed bg-gray-100 text-text-disabled'
                  : 'bg-gray-100 text-text-muted hover:bg-gray-200'
            )}
          >
            #{tag.name}
          </Button>
        )
      })}
    </div>
  )
}
