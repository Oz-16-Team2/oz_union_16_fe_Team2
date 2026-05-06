import { useEffect } from 'react'

import { Button, useToast } from '@/components/common/ui'
import { useTagsQuery } from '@/query/post'
import { cn } from '@/utils/cn'

import { MAX_TAGS } from '../post.constants'

type PostTagSectionProps = {
  selectedTagIds: number[]
  onToggle: (id: number) => void
  defaultTagNames?: string[]
  onInitialize?: (ids: number[]) => void
}

export function PostTagSection({
  selectedTagIds,
  onToggle,
  defaultTagNames,
  onInitialize,
}: PostTagSectionProps) {
  const toast = useToast()
  const { data: tags = [], isError, isLoading } = useTagsQuery()

  useEffect(() => {
    if (isError) toast.error('태그 목록을 불러오지 못했습니다.')
  }, [isError, toast])

  useEffect(() => {
    if (!onInitialize || !defaultTagNames?.length || !tags.length) return

    const ids = defaultTagNames
      .map((name) => tags.find((t) => t.name === name)?.id)
      .filter((id): id is number => id !== undefined)

    onInitialize(ids)
  }, [tags, defaultTagNames, onInitialize])

  const isMaxReached = selectedTagIds.length >= MAX_TAGS

  if (!isLoading && !isError && tags.length === 0) {
    return <p className="pl-2 text-text-muted">등록된 태그가 없습니다.</p>
  }

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
              'font-medium',
              isSelected
                ? 'bg-primary-500 text-white'
                : isDisabled
                  ? 'cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600'
                  : 'bg-gray-100 text-text-muted hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
            )}
          >
            #{tag.name}
          </Button>
        )
      })}
    </div>
  )
}
