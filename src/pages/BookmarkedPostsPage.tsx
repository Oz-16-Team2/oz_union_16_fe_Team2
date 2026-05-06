import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router'

import { formatError } from '@/apis/api.utils'
import { EmptyState } from '@/components/common/ui'
import { buttonVariants } from '@/components/common/ui/button/Button.style'
import { POSTS_PAGE_SIZE } from '@/features/main/post-list'
import { PostList } from '@/features/main/post-list/PostList'
import type { ApiPostListItem } from '@/features/main/post-list/PostList.api.types'
import { useBookmarkedPostsQuery } from '@/query/main/useBookmarkedPostsQuery'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/utils/cn'

function toPostListItem(item: ApiPostListItem, currentNickname: string | null) {
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

export function BookmarkedPostsPage() {
  const user = useAuthStore((state) => state.user)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page')) || 1

  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const hasSearchQuery = searchQuery.trim().length > 0

  const { data, isLoading, isFetching, isError, error } =
    useBookmarkedPostsQuery({
      page: hasSearchQuery ? 0 : page - 1,
      size: POSTS_PAGE_SIZE,
    })

  const handlePageChange = useCallback(
    (newPage: number) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          if (newPage === 1) next.delete('page')
          else next.set('page', String(newPage))
          return next
        },
        { replace: true }
      )
    },
    [setSearchParams]
  )

  // 500ms debounce: 입력이 멈추면 searchQuery 반영 후 1페이지로 이동
  useEffect(() => {
    if (searchInput === searchQuery) return
    const timer = window.setTimeout(() => {
      setSearchQuery(searchInput)
      handlePageChange(1)
    }, 500)
    return () => window.clearTimeout(timer)
  }, [searchInput, searchQuery, handlePageChange])

  // 삭제 후 현재 페이지가 비면 이전 페이지로 이동
  useEffect(() => {
    if (!isFetching && data?.posts.length === 0 && page > 1) {
      handlePageChange(page - 1)
    }
  }, [data, isFetching, page, handlePageChange])

  const filteredPosts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()
    return (data?.posts ?? [])
      .map((item) => toPostListItem(item, user?.nickname ?? null))
      .filter((post) => {
        if (!normalizedQuery) return true
        return [post.title, post.contentPreview, post.nickname, ...post.tags]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)
      })
  }, [data?.posts, user?.nickname, searchQuery])

  const totalPages = useMemo(() => {
    if (hasSearchQuery) {
      return Math.max(1, Math.ceil(filteredPosts.length / POSTS_PAGE_SIZE))
    }
    return Math.max(
      1,
      Math.ceil((data?.total_count ?? 0) / (data?.size ?? POSTS_PAGE_SIZE))
    )
  }, [data?.total_count, data?.size, filteredPosts.length, hasSearchQuery])

  const errorMessage = error?.response?.data.error_detail
    ? formatError(error.response.data.error_detail)
    : undefined

  const emptyView = useMemo(
    () => (
      <EmptyState
        title={
          hasSearchQuery
            ? '검색 결과가 없습니다.'
            : '아직 스크랩한 게시글이 없습니다.'
        }
        description={
          hasSearchQuery
            ? '다른 검색어로 다시 찾아보세요.'
            : '관심있는 게시글에 스크랩 버튼을 눌러보세요.'
        }
        action={
          hasSearchQuery ? undefined : (
            <Link
              to="/"
              className={cn(
                buttonVariants({
                  variant: 'primary',
                  size: 'sm',
                  rounded: 'full',
                }),
                'px-5 py-2 text-sm'
              )}
            >
              메인으로 이동
            </Link>
          )
        }
        className="flex-1"
      />
    ),
    [hasSearchQuery]
  )

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6">
      <div className="px-4">
        <h1 className="text-2xl font-semibold text-center">북마크</h1>
      </div>
      <PostList
        posts={filteredPosts}
        totalPages={totalPages}
        currentPage={hasSearchQuery ? 1 : page}
        searchValue={searchInput}
        isLoading={isLoading}
        isError={isError}
        errorMessage={errorMessage}
        emptyView={emptyView}
        onSearchChange={setSearchInput}
        onSearch={(query) => {
          setSearchQuery(query)
          handlePageChange(1)
        }}
        onPageChange={handlePageChange}
        stickPaginationToBottom
      />
    </main>
  )
}
