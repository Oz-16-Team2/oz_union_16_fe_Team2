import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'

import { formatError } from '@/apis/api.utils'
import { EmptyState } from '@/components/common/ui'
import { buttonVariants } from '@/components/common/ui/button/Button.style'
import { type PostListItem, POSTS_PAGE_SIZE } from '@/features/main/post-list'
import { PostList } from '@/features/main/post-list/PostList'
import type { ApiMyPostListItem } from '@/features/my-posts/myPosts.api.types'
import { useMyPostsQuery } from '@/query/post'
import { cn } from '@/utils/cn'

function toMyPostListItem(post: ApiMyPostListItem): PostListItem {
  return {
    postId: post.post_id,
    images: post.images,
    profileImageUrl: post.profile_image_url,
    nickname: post.nickname,
    createdAt: post.created_at,
    title: post.title,
    tags: post.tags,
    contentPreview: post.content_preview,
    likeCount: post.like_count,
    commentCount: post.comment_count,
    isLiked: post.is_liked,
    isScrapped: post.is_scrapped,
    isOwner: true,
  }
}

export function MyPostsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const hasSearchQuery = searchQuery.trim().length > 0
  const apiPage = currentPage - 1

  const { data, isLoading, isFetching, isError, error } = useMyPostsQuery({
    page: hasSearchQuery ? 0 : apiPage,
    size: POSTS_PAGE_SIZE,
  })

  const posts = useMemo(
    () => (data?.posts ?? []).map(toMyPostListItem),
    [data?.posts]
  )

  useEffect(() => {
    if (searchInput === searchQuery) return

    const timer = window.setTimeout(() => {
      setSearchQuery(searchInput)
      setCurrentPage(1)
    }, 500)

    return () => window.clearTimeout(timer)
  }, [searchInput, searchQuery])

  useEffect(() => {
    if (
      hasSearchQuery ||
      isFetching ||
      data?.posts?.length !== 0 ||
      currentPage <= 1
    ) {
      return
    }

    const timer = window.setTimeout(() => {
      setCurrentPage((page) => page - 1)
    }, 0)

    return () => window.clearTimeout(timer)
  }, [currentPage, data?.posts?.length, hasSearchQuery, isFetching])

  const filteredPosts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()
    if (!normalizedQuery) return posts
    return posts.filter((post) =>
      [post.title, post.contentPreview, post.nickname, ...post.tags]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)
    )
  }, [posts, searchQuery])

  const totalPages = useMemo(() => {
    if (hasSearchQuery) {
      return Math.max(1, Math.ceil(filteredPosts.length / POSTS_PAGE_SIZE))
    }

    return Math.max(
      1,
      Math.ceil((data?.total_count ?? 0) / (data?.size ?? POSTS_PAGE_SIZE))
    )
  }, [data?.total_count, data?.size, filteredPosts.length, hasSearchQuery])

  const errorMessage = useMemo(() => {
    const detail = error?.response?.data.error_detail
    return detail ? formatError(detail) : undefined
  }, [error])

  const emptyView = useMemo(() => {
    return (
      <EmptyState
        title={
          hasSearchQuery
            ? '검색 결과가 없습니다.'
            : '아직 작성한 게시글이 없습니다.'
        }
        description={
          hasSearchQuery
            ? '다른 검색어로 다시 찾아보세요.'
            : '첫 게시글을 작성하고 목표를 공유해보세요.'
        }
        action={
          hasSearchQuery ? undefined : (
            <Link
              to="/post/create"
              className={cn(
                buttonVariants({
                  variant: 'primary',
                  size: 'sm',
                  rounded: 'full',
                }),
                'px-5 py-2 text-sm'
              )}
            >
              게시글 작성
            </Link>
          )
        }
        className="flex-1"
      />
    )
  }, [hasSearchQuery])

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6">
      <div className="px-4">
        <h1 className="text-2xl font-semibold text-center">내가 쓴 게시글</h1>
      </div>

      <PostList
        posts={filteredPosts}
        totalPages={totalPages}
        currentPage={currentPage}
        searchValue={searchInput}
        isLoading={isLoading}
        isError={isError}
        errorMessage={errorMessage}
        emptyView={emptyView}
        stickPaginationToBottom
        onSearchChange={setSearchInput}
        onSearch={(query) => {
          setSearchQuery(query)
          setCurrentPage(1)
        }}
        onPageChange={setCurrentPage}
      />
    </main>
  )
}
