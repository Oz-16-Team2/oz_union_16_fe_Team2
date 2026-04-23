import type { PostCardProps } from '@/components/common/ui/card/PostCard.types'

export type PostSortOrder = 'latest' | 'popular'

export type PostListItem = PostCardProps & { id: number }

export type PostListProps = {
  posts: PostListItem[]
  totalPages: number
  currentPage: number
  sortOrder: PostSortOrder
  isLoading?: boolean
  isError?: boolean
  errorMessage?: string
  onSearch: (query: string) => void
  onSortChange: (sort: PostSortOrder) => void
  onPageChange: (page: number) => void
}

export const POSTS_PAGE_SIZE = 8
