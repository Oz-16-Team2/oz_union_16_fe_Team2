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
    const requestPayload = authSchema.loginRequestSchema.parse(payload)

    const { data } = await apiClient.post<authSchema.LoginResponse>(
      AUTH_ENDPOINTS.login,
      requestPayload
    )

    return authSchema.loginResponseSchema.parse(data)
  },

  logout: async (): Promise<authSchema.LogoutResponse> => {
    const { data } = await apiClient.post<authSchema.LogoutResponse>(
      AUTH_ENDPOINTS.logout
    )

    // 로그아웃도 응답 스키마를 한 번 검증해 두면
    // 서버 응답 형식이 바뀌었을 때 호출부에서 빨리 감지할 수 있습니다.
    return authSchema.logoutResponseSchema.parse(data)
  },

  socialLoginCallback: async <TProvider extends SocialLoginProvider>(
    provider: TProvider,
    payload: SocialLoginCallbackRequestMap[TProvider]
  ): Promise<authSchema.LoginResponse> => {
    const requestSchema = socialLoginCallbackRequestSchemas[provider]

    const requestPayload = requestSchema.parse(payload)

    const { data } = await apiClient.post<authSchema.LoginResponse>(
      AUTH_ENDPOINTS.socialLoginCallback(provider),
      requestPayload
    )

    return authSchema.loginResponseSchema.parse(data)
  },
} as const
