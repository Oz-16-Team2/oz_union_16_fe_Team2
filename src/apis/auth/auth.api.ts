import { apiClient } from '@/apis/apiClient'

import * as authSchema from './auth.schema'
import { AUTH_ENDPOINTS, type SocialLoginProvider } from './endpoints'

type SocialLoginCallbackRequestMap = {
  kakao: authSchema.KakaoLoginCallbackRequest
  naver: authSchema.NaverLoginCallbackRequest
  google: authSchema.GoogleLoginCallbackRequest
}

const socialLoginCallbackRequestSchemas = {
  kakao: authSchema.kakaoLoginCallbackRequestSchema,
  naver: authSchema.naverLoginCallbackRequestSchema,
  google: authSchema.googleLoginCallbackRequestSchema,
} as const

export const authApi = {
  signup: async (payload: authSchema.SignupRequest) => {
    const { data } = await apiClient.post<authSchema.SignupResponse>(
      AUTH_ENDPOINTS.signup,
      payload
    )
    return data
  },

  sendEmailVerification: async ({
    email,
  }: authSchema.SendEmailVerificationRequest) => {
    const { data } =
      await apiClient.post<authSchema.SendEmailVerificationResponse>(
        AUTH_ENDPOINTS.sendEmailVerification,
        { email }
      )

    return data
  },

  verifyEmail: async ({ email, code }: authSchema.VerifyEmailRequest) => {
    const { data } = await apiClient.get<authSchema.VerifyEmailResponse>(
      AUTH_ENDPOINTS.verifyEmail,
      {
        params: { email, code },
      }
    )

    return data
  },

  checkNickname: async ({ nickname }: authSchema.CheckNicknameRequest) => {
    const { data } = await apiClient.get<authSchema.CheckNicknameResponse>(
      AUTH_ENDPOINTS.checkNickname,
      {
        params: { nickname },
      }
    )

    return data
  },

  login: async (
    payload: authSchema.LoginRequest
  ): Promise<authSchema.LoginResponse> => {
    // 로그인 요청 스키마를 그대로 사용해 API 호출 전에 payload 형태를 한 번 검증합니다.
    // 추후 실제 API가 붙어도 이 함수의 호출부는 유지하고 endpoint/baseURL만 실제 서버로 향하게 됩니다.
    const requestPayload = authSchema.loginRequestSchema.parse(payload)

    const { data } = await apiClient.post<authSchema.LoginResponse>(
      AUTH_ENDPOINTS.login,
      requestPayload
    )

    // MSW 응답도 실제 API 응답과 같은 스키마를 따르는지 확인합니다.
    // 실제 API 연동 후 응답 형태가 확정되면 이 검증으로 프론트/백엔드 계약을 빠르게 확인할 수 있습니다.
    return authSchema.loginResponseSchema.parse(data)
  },

  socialLoginCallback: async <TProvider extends SocialLoginProvider>(
    provider: TProvider,
    payload: SocialLoginCallbackRequestMap[TProvider]
  ): Promise<authSchema.LoginResponse> => {
    const requestSchema = socialLoginCallbackRequestSchemas[provider]

    // 소셜 로그인은 provider마다 필요한 callback payload가 달라서 provider별 스키마로 검증합니다.
    // 현재 로그인 페이지에서는 MSW 테스트용 mock code/state를 보내며, 실제 OAuth 연동 시 callback 페이지에서 받은 값을 넘기면 됩니다.
    const requestPayload = requestSchema.parse(payload)

    const { data } = await apiClient.post<authSchema.LoginResponse>(
      AUTH_ENDPOINTS.socialLoginCallback(provider),
      requestPayload
    )

    // 소셜 로그인 callback 응답도 일반 로그인과 동일한 응답 스키마를 재사용합니다.
    // 현재는 MSW 확인용 access_token이며, 실제 토큰 저장 정책이 정해지기 전까지 호출부에서 저장하지 않습니다.
    return authSchema.loginResponseSchema.parse(data)
  },
} as const
