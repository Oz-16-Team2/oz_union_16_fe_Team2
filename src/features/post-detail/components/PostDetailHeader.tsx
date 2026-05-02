import { MoreVertical } from 'lucide-react'

import { ActionMenu } from '@/components/common/overlay'
import { formatRelativeTime } from '@/utils/formatRelativeTime'

type MenuItem = {
  label: string
  onClick: () => void
  variant?: 'default' | 'danger'
}

type PostDetailHeaderProps = {
  author: {
    nickname: string
    profileImageUrl?: string | null
  }
  createdAt: string
  menuItems: MenuItem[]
}

export function PostDetailHeader({
  author,
  createdAt,
  menuItems,
}: PostDetailHeaderProps) {
  return (
    <div className="mt-9 flex items-center justify-between">
      {/* 왼쪽 (프로필) */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
          {author.profileImageUrl ? (
            <img
              src={author.profileImageUrl}
              alt={`${author.nickname}의 프로필 이미지`}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-medium text-text-primary">
            {author.nickname}
          </span>
          <span className="text-xs text-text-muted">
            {formatRelativeTime(createdAt)}
          </span>
        </div>
      </div>

      {/* 오른쪽 (더보기 메뉴) */}
      <ActionMenu
        trigger={
          <button type="button" className="text-text-primary">
            <MoreVertical size={20} />
          </button>
        }
        items={menuItems}
        align="right"
        size="sm"
      />
    </div>
  )
}
