import { delay, http, HttpResponse } from 'msw'

export const postHandler = [
  // GET /api/v1/posts/:postId/comments — 댓글 목록 조회 (mock)
  http.get('/api/v1/posts/:postId/comments', async () => {
    await delay(300)
    return HttpResponse.json({
      results: [
        {
          id: 1,
          user_id: 2,
          nickname: '하이룽',
          content: '치맥이나 하자 ㅋㅋㅋㅋ',
          created_at: '2026-04-14 10:15:00',
          like_count: 0,
          is_liked: false,
          profile_image_url: null,
        },
      ],
    })
  }),

  // POST /api/v1/posts/:postId/comments — 댓글 작성
  http.post('/api/v1/posts/:postId/comments', async ({ request }) => {
    await delay(300)
    const body = (await request.json()) as { content: string }
    return HttpResponse.json(
      {
        id: Date.now(),
        user_id: 1,
        nickname: '나',
        content: body.content,
        created_at: new Date().toISOString(),
      },
      { status: 201 }
    )
  }),
]
