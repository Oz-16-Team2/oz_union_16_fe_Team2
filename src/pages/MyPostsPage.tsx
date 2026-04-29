import { useMemo, useState } from 'react'

import { pinkCharacterImage } from '@/assets/images'
import { type PostListItem, POSTS_PAGE_SIZE } from '@/features/main/post-list'
import { PostList } from '@/features/main/post-list/PostList'
import { mockPostList } from '@/mocks/data/post'

const MY_POSTS: PostListItem[] = mockPostList
  .filter((post) => post.nickname === '운동왕' || post.nickname === '요가고수')
  .map((post) => ({
    postId: post.post_id,
    images: post.images,
    profileImageUrl: post.profile_image_url ?? pinkCharacterImage,
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
  }))

export function MyPostsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()
    if (!normalizedQuery) return MY_POSTS
    return MY_POSTS.filter((post) =>
      [post.title, post.contentPreview, post.nickname, ...post.tags]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)
    )
  }, [searchQuery])

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
        onSearch={(query) => {
          setSearchQuery(query)
          setCurrentPage(1)
        }}
        onPageChange={setCurrentPage}
      />
    </main>
  )
}
