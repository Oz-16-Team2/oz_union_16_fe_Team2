export const POST_ENDPOINTS = {
  goals: '/goals/',
  tags: '/posts/tags',
  post: (postId: number) => `/posts/${postId}/`,
  posts: '/posts/',
  postLikes: (postId: number | string) => `/posts/${postId}/likes/`,
  postScraps: (postId: number | string) => `/posts/${postId}/scraps`,
  postReports: (postId: number | string) => `/posts/${postId}/reports/`,
  presignedUrl: '/posts/presigned-url/',
  postSearch: '/posts/search',
  postTrending: '/posts/trending',
  postSuggestions: '/posts/suggestions',
} as const
