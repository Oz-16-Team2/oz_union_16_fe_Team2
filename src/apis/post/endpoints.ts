export const POST_ENDPOINTS = {
  goals: '/goals',
  tags: '/tags',
  posts: '/posts',

  post: (postId: number | string) => `/posts/${postId}/`,
  postLikes: (postId: number | string) => `/posts/${postId}/likes/`,
  postScraps: (postId: number | string) => `/posts/${postId}/scraps`,
  postReports: (postId: number | string) => `/posts/${postId}/reports/`,
} as const
