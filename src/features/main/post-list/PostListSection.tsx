import { useState } from 'react'

import { formatError } from '@/apis/api.utils'
import { pinkCharacterImage } from '@/assets/images'
import { usePostsQuery } from '@/query/main/usePostsQuery'

import { PostList } from './PostList'
import type { ApiPostListItem } from './PostList.api.types'
import {
  type PostListItem,
  POSTS_PAGE_SIZE,
  type PostSortOrder,
} from './PostList.types'

// API 명세서 상 snake_case 를 컴포넌트에서 사용할 camelCase 로 변환하는 함수
function toPostListItem(item: ApiPostListItem): PostListItem {
  return {
    id: item.post_id,
    image: item.images[0],
    profileImage: item.profile_image_url ?? pinkCharacterImage,
    nickname: item.nickname,
    createdAt: item.created_at,
    title: item.title,
    tags: item.tags,
    contentPreview: item.content_preview,
    likeCount: item.like_count,
    commentCount: item.comment_count,
    isScrapped: item.is_scrapped,
    onLike: () => {},
    onShare: () => {},
    onScrap: () => {},
  }
}

export function PostListSection() {
  const [sortOrder, setSortOrder] = useState<PostSortOrder>('latest')
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading, isError, error } = usePostsQuery({
    page: currentPage - 1,
    sortBy: sortOrder,
  })

  const posts = (data?.posts ?? []).map(toPostListItem)
  const totalPages = Math.max(
    1,
    Math.ceil((data?.total_count ?? 0) / (data?.size ?? POSTS_PAGE_SIZE))
  )

  const errorDetail = error?.response?.data.error_detail
  const errorMessage = errorDetail ? formatError(errorDetail) : undefined

  return (
    <PostList
      posts={posts}
      totalPages={totalPages}
      currentPage={currentPage}
      sortOrder={sortOrder}
      isLoading={isLoading}
      isError={isError}
      errorMessage={errorMessage}
      onSearch={() => {}}
      onSortChange={(sort) => {
        setSortOrder(sort)
        setCurrentPage(1)
      }}
      onPageChange={setCurrentPage}
    />
  )
}
