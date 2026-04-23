import { delay, http, HttpResponse } from 'msw'

import { toMswApiUrl } from '@/apis/apiPath'
import { POST_ENDPOINTS } from '@/apis/post'

import { mockGoals, mockPost, mockPostList, mockTags } from '../data/post'

export const postHandler = [
  // GET /api/v1/goals — 목표 목록 조회
  http.get(toMswApiUrl(POST_ENDPOINTS.goals), async () => {
    await delay(300)
    return HttpResponse.json(mockGoals, { status: 200 })
  }),

  // GET /api/v1/tags — 태그 목록 조회
  http.get(toMswApiUrl(POST_ENDPOINTS.tags), async () => {
    await delay(300)
    return HttpResponse.json(mockTags, { status: 200 })
  }),

  // GET /api/v1/posts — 게시글 목록 조회
  http.get(toMswApiUrl(POST_ENDPOINTS.posts), async ({ request }) => {
    await delay(400)

    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? 0)
    const size = Number(url.searchParams.get('size') ?? 20)

    return HttpResponse.json(
      {
        posts: mockPostList,
        page,
        size,
        total_count: mockPostList.length,
      },
      { status: 200 }
    )
  }),

  // GET /api/v1/posts/:postId — 게시글 단건 조회
  // mockPost.post_id(305) 외 ID 접근 시 404 반환 → isError 분기 동작 확인 가능
  http.get(toMswApiUrl(POST_ENDPOINTS.post(':postId')), async ({ params }) => {
    await delay(400)

    const postId = Number(params.postId)
    if (postId !== mockPost.post_id) {
      return HttpResponse.json(
        { detail: '해당 게시글을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return HttpResponse.json(mockPost, { status: 200 })
  }),

  // POST /api/v1/posts — 게시글 생성
  http.post(toMswApiUrl(POST_ENDPOINTS.posts), async () => {
    await delay(600)
    return HttpResponse.json(
      { detail: '게시글이 성공적으로 생성되었습니다.', post_id: 306 },
      { status: 201 }
    )
  }),

  // PATCH /api/v1/posts/:postId — 게시글 수정
  http.patch(toMswApiUrl(POST_ENDPOINTS.post(':postId')), async () => {
    await delay(600)

    return HttpResponse.json(
      { detail: '게시글이 성공적으로 수정되었습니다.' },
      { status: 200 }
    )
  }),
]
