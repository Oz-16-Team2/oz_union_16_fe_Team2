// login 관련 MSW 핸들러
import { http, HttpResponse } from 'msw'

import { toMswApiUrl } from '@/apis/apiPath'
import { AUTH_ENDPOINTS } from '@/apis/auth'
import {
  googleLoginCallbackRequestSchema,
  kakaoLoginCallbackRequestSchema,
  loginRequestSchema,
  naverLoginCallbackRequestSchema,
} from '@/apis/auth/auth.schema'
import {
  getMockSocialLoginResponse,
  mockLoginResponse,
  mockLoginUser,
} from '@/mocks/data/auth'

const socialLoginCallbackRequestSchemas = {
  kakao: kakaoLoginCallbackRequestSchema,
  naver: naverLoginCallbackRequestSchema,
  google: googleLoginCallbackRequestSchema,
} as const

export const loginHandler = [
  http.post(toMswApiUrl(AUTH_ENDPOINTS.login), async ({ request }) => {
    const body = await request.json()

    // MSW에서도 실제 API와 같은 요청 스키마를 사용해 잘못된 payload를 field error로 내려줍니다.
    // 추후 실제 API가 붙으면 이 handler 전체가 삭제되고 서버 검증 결과를 사용하게 됩니다.
    const parsedBody = loginRequestSchema.safeParse(body)

    if (!parsedBody.success) {
      return HttpResponse.json(
        {
          error_detail: {
            email: ['이메일 형식이 올바르지 않습니다.'],
            password: ['비밀번호를 입력해주세요'],
          },
        },
        { status: 422 }
      )
    }

    const { email, password } = parsedBody.data
    const isMockUser =
      email === mockLoginUser.email && password === mockLoginUser.password

    if (!isMockUser) {
      return HttpResponse.json(
        { error_detail: '이메일 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      )
    }

    // 로그인 성공 mock 응답입니다. 실제 access token이 아직 없어서 화면 흐름 확인용으로만 사용합니다.
    return HttpResponse.json(mockLoginResponse)
  }),

  ...(['kakao', 'naver', 'google'] as const).map((provider) =>
    http.post(
      toMswApiUrl(AUTH_ENDPOINTS.socialLoginCallback(provider)),
      async ({ request }) => {
        const body = await request.json()
        const requestSchema = socialLoginCallbackRequestSchemas[provider]

        // provider별 callback payload를 스키마 기준으로 검증합니다.
        // 실제 OAuth 연동 시 이 handler는 삭제되고, 백엔드 callback API가 같은 역할을 담당합니다.
        const parsedBody = requestSchema.safeParse(body)

        if (!parsedBody.success) {
          return HttpResponse.json(
            {
              error_detail: {
                code: ['소셜 로그인 인증 코드가 올바르지 않습니다.'],
              },
            },
            { status: 422 }
          )
        }

        // 소셜 로그인 성공 mock 응답입니다. token은 저장하지 않고 MSW 연결 확인에만 사용합니다.
        return HttpResponse.json(getMockSocialLoginResponse(provider))
      }
    )
  ),
]
