import { useMemo } from 'react'
import { Link } from 'react-router'

import { PenLine, Sparkles } from 'lucide-react'

import { formatError } from '@/apis/api.utils'
import { TabButton } from '@/components/common/ui'
import { buttonVariants } from '@/components/common/ui/button/Button.style'
import { usePostListQuery } from '@/query/main/usePostListQuery'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/utils/cn'

import { PostList, PostStatusView } from './PostList'
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
    images: item.images[0] ?? '',
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

  const { data, isLoading, isError, error } = usePostListQuery(
    mode,
    POSTS_PAGE_SIZE
  )

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
            'px-5 py-2 text-sm'
          )}
        >
          <PenLine size={16} />
          글쓰기
        </Link>
      )}
    </div>
  )

  // 추천순 필터링 시 빈화면 따로 처리 해줌
  const suggestedEmptyState = (
    <PostStatusView
      icon={<Sparkles size={48} />}
      message="아직 추천할 게시글이 없어요."
      subMessage="게시글을 작성하거나 좋아요를 눌러보세요. 활동 기반으로 추천이 시작됩니다."
    />
  )

  return (
    <PostList
      posts={posts}
      totalPages={totalPages}
      currentPage={page}
      searchValue={inputValue}
      isLoading={isLoading}
      isError={isError}
      errorMessage={errorMessage}
      filterArea={filterArea}
      emptyView={sort === 'suggested' ? suggestedEmptyState : undefined}
      onSearch={handleSearch}
      onSearchChange={setInputValue}
      onPageChange={handlePageChange}
    />
  )
}
