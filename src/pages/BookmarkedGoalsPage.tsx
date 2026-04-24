import { useMemo, useState } from 'react'

import { pinkCharacterImage } from '@/assets/images'
import {
  type PostListItem,
  POSTS_PAGE_SIZE,
  type PostSortOrder,
} from '@/features/main/post-list'
import { PostList } from '@/features/main/post-list/PostList'
import { mockPostList } from '@/mocks/data/post'

const BOOKMARKED_POSTS: PostListItem[] = mockPostList
  .filter((post) => post.is_scrapped)
  .map((post) => ({
    id: post.post_id,
    image: post.images[0],
    profileImage: post.profile_image_url ?? pinkCharacterImage,
    nickname: post.nickname,
    createdAt: post.created_at,
    title: post.title,
    tags: post.tags,
    contentPreview: post.content_preview,
    likeCount: post.like_count,
    commentCount: post.comment_count,
    isScrapped: post.is_scrapped,
    onLike: () => {},
    onShare: () => {},
    onScrap: () => {},
  }))

export function BookmarkedGoalsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOrder, setSortOrder] = useState<PostSortOrder>('latest')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    const searchedPosts = normalizedQuery
      ? BOOKMARKED_POSTS.filter((post) =>
          [post.title, post.contentPreview, post.nickname, ...post.tags]
            .join(' ')
            .toLowerCase()
            .includes(normalizedQuery)
        )
      : BOOKMARKED_POSTS

    const sortedPosts = [...searchedPosts].sort((a, b) => {
      if (sortOrder === 'popular') return b.likeCount - a.likeCount
      return b.id - a.id
    })

    return sortedPosts
  }, [searchQuery, sortOrder])

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / POSTS_PAGE_SIZE)
  )
  const pagedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PAGE_SIZE,
    currentPage * POSTS_PAGE_SIZE
  )

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <PostList
        posts={pagedPosts}
        totalPages={totalPages}
        currentPage={currentPage}
        sortOrder={sortOrder}
        onSearch={(query) => {
          setSearchQuery(query)
          setCurrentPage(1)
        }}
        onSortChange={(sort) => {
          setSortOrder(sort)
          setCurrentPage(1)
        }}
        onPageChange={setCurrentPage}
      />
    </main>
  )
}
