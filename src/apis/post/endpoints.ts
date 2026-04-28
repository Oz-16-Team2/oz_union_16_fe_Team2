export const POST_ENDPOINTS = {
  goals: '/goals',
  tags: '/tags',
  posts: '/posts',
  // 스웨거 기준으로 trailing slash 적용 (/posts/{id}/)
  // Django REST API 표준에 맞춤
  post: (postId: number | string) => `/posts/${postId}/`,
} as const
