import { Link } from 'react-router'

import { AlertCircle, FileText } from 'lucide-react'

import {
  Pagination,
  PostCard,
  PostCardSkeleton,
  SearchBar,
  TabButton,
} from '@/components/common/ui'
import { cn } from '@/utils/cn'

import {
  type PostListItem,
  type PostListProps,
  POSTS_PAGE_SIZE,
  type PostSortOrder,
} from './PostList.types'

export type { PostListItem, PostSortOrder }

const SORT_ORDERS: PostSortOrder[] = ['latest', 'popular']

const SORT_LABELS: Record<PostSortOrder, string> = {
  latest: '최신순',
  popular: '인기순',
}

export function PostList({
  posts,
  totalPages,
  currentPage,
  sortOrder,
  isLoading = false,
  isError = false,
  errorMessage,
  onSearch,
  onSortChange,
  onPageChange,
}: PostListProps) {
  return (
    <section className="flex min-w-sm w-full flex-col gap-4 px-4">
      {/* 1. 검색 및 필터 영역 */}
      <div className="flex flex-col gap-4">
        <SearchBar onSearch={onSearch} placeholder="게시물 검색" />
        <PostSortFilters sortOrder={sortOrder} onSortChange={onSortChange} />
      </div>

      {/* 2. 메인 컨텐츠 영역 (상태별 분기) */}
      {isError && !isLoading ? (
        <PostStatusView
          icon={<AlertCircle size={48} className="opacity-60" />}
          message={errorMessage ?? '게시물을 불러오는 데 실패했습니다.'}
          isError
        />
      ) : !isLoading && posts.length === 0 ? (
        <PostStatusView
          icon={<FileText size={48} className="opacity-40" />}
          message="게시물이 없습니다."
        />
      ) : (
        <PostGrid posts={posts} isLoading={isLoading} />
      )}

      {/* 3. 페이지네이션 영역 */}
      {!isLoading && (
        <div className="mt-2 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </section>
  )
}

// --- PostList 내부 컴포넌트 ---

/** 1. 필터 탭 */
const PostSortFilters = ({
  sortOrder,
  onSortChange,
}: Pick<PostListProps, 'sortOrder' | 'onSortChange'>) => (
  <div className="flex gap-2">
    {SORT_ORDERS.map((order) => (
      <TabButton
        key={order}
        isActive={sortOrder === order}
        onClick={() => onSortChange(order)}
        className="cursor-pointer"
      >
        {SORT_LABELS[order]}
      </TabButton>
    ))}
  </div>
)

/** 2. Error 나 Empty일때 보일 뷰 */
const PostStatusView = ({
  icon,
  message,
  isError = false,
}: {
  icon: React.ReactNode
  message: string
  isError?: boolean
}) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center gap-3 py-24',
      isError ? 'text-error-500' : 'text-text-muted'
    )}
  >
    {icon}
    <p>{message}</p>
  </div>
)

/** 3. 게시물 목록 뷰 */
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
      : posts.map(({ id, ...cardProps }) => (
          <li key={id}>
            {/* TODO: 카드 클릭 → 상세 이동 로직 임시 연결 (추후 담당자 구현 시 제거/수정) */}
            <Link to={`/post/${id}`} className="block">
              <PostCard {...cardProps} />
            </Link>
          </li>
        ))}
  </ul>
)
