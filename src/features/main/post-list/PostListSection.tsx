import { useEffect, useMemo } from 'react'
import { Link } from 'react-router'

import { PenLine } from 'lucide-react'

import { formatError } from '@/apis/api.utils'
import { EmptyState, TabButton } from '@/components/common/ui'
import { buttonVariants } from '@/components/common/ui/button/Button.style'
import { usePostListQuery } from '@/query/main/usePostListQuery'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/utils/cn'

import { PostList } from './PostList'
import type { ApiPostListItem } from './PostList.api.types'
import {
  type PostListItem,
  POSTS_PAGE_SIZE,
  type PostSortOrder,
} from './PostList.types'
import { usePostListFilters } from './usePostListFilters'

const SORT_ORDERS: PostSortOrder[] = ['latest', 'trending', 'suggested']

const SORT_LABELS: Record<PostSortOrder, string> = {
  latest: '최신순',
  trending: '인기순',
  suggested: '추천순',
}

function toPostListItem(
  item: ApiPostListItem,
  currentNickname: string | null
): PostListItem {
  return {
    postId: item.post_id,
    images: item.images,
    profileImageUrl: item.profile_image_url,
    nickname: item.nickname,
    createdAt: item.created_at,
    title: item.title,
    tags: item.tags,
    contentPreview: item.content_preview,
    likeCount: item.like_count,
    commentCount: item.comment_count,
    isLiked: item.is_liked,
    isScrapped: item.is_scrapped,
    isOwner: currentNickname !== null && item.nickname === currentNickname,
  }
}

export function PostListSection() {
  const user = useAuthStore((state) => state.user)
  const {
    filters,
    mode,
    inputValue,
    setInputValue,
    handleSearch,
    handleSortChange,
    handlePageChange,
  } = usePostListFilters()

  const { sort, page } = filters

  const { data, isLoading, isFetching, isError, error } = usePostListQuery(
    mode,
    POSTS_PAGE_SIZE
  )
  const shouldShowSkeleton = isLoading && mode.type !== 'search'

  const posts = useMemo(
    () =>
      (data?.posts ?? []).map((item) =>
        toPostListItem(item, user?.nickname ?? null)
      ),
    [data?.posts, user?.nickname]
  )

  const totalPages = useMemo(
    () =>
      Math.max(
        1,
        Math.ceil((data?.total_count ?? 0) / (data?.size ?? POSTS_PAGE_SIZE))
      ),
    [data?.total_count, data?.size]
  )

  useEffect(() => {
    if (!isFetching && data?.posts.length === 0 && page > 1) {
      handlePageChange(page - 1)
    }
  }, [data, isFetching, page, handlePageChange])

  const errorMessage = useMemo(() => {
    const detail = error?.response?.data.error_detail
    return detail ? formatError(detail) : undefined
  }, [error])

  // 최신순, 인기순, 추천순 정렬 버튼 + 글쓰기 버튼
  const filterArea = (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        {SORT_ORDERS.map((order) => (
          <TabButton
            key={order}
            isActive={sort === order}
            onClick={() => handleSortChange(order)}
            className="cursor-pointer"
          >
            {SORT_LABELS[order]}
          </TabButton>
        ))}
      </div>

      {user && (
        <Link
          to="/post/create"
          className={cn(
            buttonVariants({ variant: 'primary', size: 'sm', rounded: 'full' }),
            'px-3 py-2 text-sm sm:px-5'
          )}
        >
          <PenLine size={16} />
          <span className="hidden sm:inline">글쓰기</span>
        </Link>
      )}
    </div>
  )

  let emptyView: React.ReactNode

  if (filters.keyword.trim()) {
    emptyView = isFetching ? (
      <div className="flex-1" />
    ) : (
      <EmptyState
        title="검색 결과가 없습니다."
        description="다른 검색어로 다시 찾아보세요."
        className="flex-1"
      />
    )
  } else if (sort === 'suggested') {
    emptyView = (
      <EmptyState
        title="아직 추천할 게시글이 없어요."
        description="게시글을 작성하거나 좋아요를 눌러보세요. 활동 기반으로 추천이 시작됩니다."
        className="flex-1"
      />
    )
  } else {
    emptyView = (
      <EmptyState
        title="존재하는 게시물이 없습니다."
        description="아직 등록된 게시글이 없습니다."
        className="flex-1"
      />
    )
  }

  return (
    <PostList
      posts={posts}
      totalPages={totalPages}
      currentPage={page}
      searchValue={inputValue}
      isLoading={shouldShowSkeleton}
      isError={isError}
      errorMessage={errorMessage}
      filterArea={filterArea}
      emptyView={emptyView}
      stickPaginationToBottom
      onSearch={handleSearch}
      onSearchChange={setInputValue}
      onPageChange={handlePageChange}
    />
  )
}
