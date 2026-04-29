import { Link } from 'react-router'

import { AlertCircle, FileText } from 'lucide-react'

import {
  Pagination,
  PostCard,
  PostCardSkeleton,
  SearchBar,
} from '@/components/common/ui'
import { cn } from '@/utils/cn'

import type {
  PostListItem,
  PostListProps,
  PostSortOrder,
} from './PostList.types'
import { POSTS_PAGE_SIZE } from './PostList.types'

export type { PostListItem, PostSortOrder }

const STATUS_VIEWS = {
  error: {
    icon: <AlertCircle size={48} />,
    message: '게시물을 불러오는 데 실패했습니다.',
  },
  empty: {
    icon: <FileText size={48} />,
    message: '존재하는 게시물이 없습니다.',
  },
}

export function PostList({
  posts,
  totalPages,
  currentPage,
  searchValue = '',
  isLoading = false,
  isError = false,
  errorMessage,
  filterArea,
  emptyView,
  onSearch,
  onSearchChange,
  onPageChange,
}: PostListProps) {
  // 기본으로 POST 불러 올때 early return 으로 렌더링 처리

  const renderContent = () => {
    if (!isLoading && isError) {
      return (
        <PostStatusView
          {...STATUS_VIEWS.error}
          message={errorMessage ?? STATUS_VIEWS.error.message}
          isError
        />
      )
    }
    if (!isLoading && posts.length === 0) {
      return emptyView ?? <PostStatusView {...STATUS_VIEWS.empty} />
    }
    return <PostGrid posts={posts} isLoading={isLoading} />
  }

  return (
    <section className="flex min-w-sm w-full flex-col gap-4 px-4">
      {/* 1. 검색 + 필터 영역 여기서 필터링 추가 시 filterArea로 검색만 하고 싶으면 빈값 filterArea에 props 안받기 */}
      <div className="flex flex-col gap-3">
        <SearchBar
          value={searchValue}
          onSearch={onSearch}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="게시물 검색"
        />
        {filterArea}
      </div>

      {/* 2. 카드 목록 */}
      {renderContent()}

      {/* 3. 페이지네이션 */}
      <div className={cn('pt-4 flex justify-center', isLoading && 'invisible')}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </section>
  )
}

// --- PostList 내부 컴포넌트 ---

/** Error 나 Empty일때 보일 뷰
 */
export const PostStatusView = ({
  icon,
  message,
  subMessage,
  isError = false,
}: {
  icon: React.ReactNode
  message: string
  subMessage?: string
  isError?: boolean
}) => (
  <div
    className={cn(
      'flex min-h-[43rem] flex-col items-center justify-center gap-3',
      isError ? 'text-error-500' : 'text-text-muted'
    )}
  >
    {icon}
    <p className="font-medium">{message}</p>
    {subMessage && <p className="text-sm text-center max-w-sm">{subMessage}</p>}
  </div>
)

/** 게시물 목록 뷰 */
const PostGrid = ({
  posts,
  isLoading,
}: {
  posts: PostListItem[]
  isLoading: boolean
}) => (
  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {isLoading
      ? Array.from({ length: POSTS_PAGE_SIZE }, (_, i) => (
          <li key={i}>
            <PostCardSkeleton />
          </li>
        ))
      : posts.map((post) => (
          <li key={post.postId}>
            <PostCard {...post} />
          </li>
        ))}
  </ul>
)
