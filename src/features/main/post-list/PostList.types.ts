export type PostSortOrder = 'latest' | 'trending' | 'suggested'

export type PostListItem = {
  postId: number
  images: string[]
  profileImageUrl: string | null
  nickname: string
  createdAt: string
  title: string
  tags: string[]
  contentPreview: string
  likeCount: number
  commentCount: number
  isLiked: boolean
  isScrapped: boolean
  isOwner: boolean
}

export type PostListProps = {
  posts: PostListItem[]
  totalPages: number
  currentPage: number
  searchValue?: string
  isLoading?: boolean
  isError?: boolean
  errorMessage?: string
  filterArea?: React.ReactNode
  emptyView?: React.ReactNode
  stickPaginationToBottom?: boolean
  onSearch: (keyword: string) => void
  onSearchChange?: (value: string) => void
  onPageChange: (page: number) => void
}

export const POSTS_PAGE_SIZE = 8
