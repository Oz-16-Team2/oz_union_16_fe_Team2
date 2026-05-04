import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'

import { formatError } from '@/apis/api.utils'
import { POSTS_PAGE_SIZE } from '@/features/main/post-list'
import { PostList } from '@/features/main/post-list/PostList'
import type { ApiPostListItem } from '@/features/main/post-list/PostList.api.types'
import type { PostListItem } from '@/features/main/post-list/PostList.types'
import { useBookmarkedPostsQuery } from '@/query/main/useBookmarkedPostsQuery'
import { useAuthStore } from '@/store/authStore'

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

export function BookmarkedPostsPage() {
  const user = useAuthStore((state) => state.user)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const [inputValue, setInputValue] = useState('')

  const { data, isLoading, isFetching, isError, error } =
    useBookmarkedPostsQuery({
      page: page - 1,
      size: POSTS_PAGE_SIZE,
    })

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

  useEffect(() => {
    if (!isFetching && data?.posts.length === 0 && page > 1) {
      handlePageChange(page - 1)
    }
  }, [data, isFetching, page, handlePageChange])

  const errorMessage = useMemo(() => {
    const detail = error?.response?.data.error_detail
    return detail ? formatError(detail) : undefined
  }, [error])

  return (
    <PostList
      posts={posts}
      totalPages={totalPages}
      currentPage={page}
      searchValue={inputValue}
      isLoading={isLoading}
      isError={isError}
      errorMessage={errorMessage}
      onSearch={setInputValue}
      onSearchChange={setInputValue}
      onPageChange={handlePageChange}
    />
  )
}
