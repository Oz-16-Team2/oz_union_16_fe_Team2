export const POST_ENDPOINTS = {
  goals: '/goals',
  tags: '/tags',
  posts: '/posts',
  post: (postId: number | string) => `/posts/${postId}`,
} as const
