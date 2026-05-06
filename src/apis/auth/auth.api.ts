/*
 * 인증(Auth) 관련 API 모음
 *
 * 역할:
 * - 회원가입, 로그인, 로그아웃
 * - 이메일 인증
 * - 닉네임 중복 체크
 * - 소셜 로그인 콜백 처리
 *
 * 특징:
 * - 모든 요청/응답은 zod schema로 검증
 * - apiClient를 통해 공통 axios 설정 사용
 */
import { apiClient } from '@/apis/apiClient'

import * as authSchema from './auth.schema'
import { AUTH_ENDPOINTS, type SocialLoginProvider } from './endpoints'

// 소셜 로그인 provider별 요청 payload 타입 매핑
type SocialLoginCallbackRequestMap = {
  kakao: authSchema.KakaoLoginCallbackRequest
  naver: authSchema.NaverLoginCallbackRequest
  google: authSchema.GoogleLoginCallbackRequest
}

// provider별 zod schema 매핑 (런타임 검증용)
const socialLoginCallbackRequestSchemas = {
  kakao: authSchema.kakaoLoginCallbackRequestSchema,
  naver: authSchema.naverLoginCallbackRequestSchema,
  google: authSchema.googleLoginCallbackRequestSchema,
} as const

/*
 * 실제 API 호출 함수들
 * - 각 함수는
 *   1. 요청 payload 검증 (zod)
 *   2. apiClient로 서버 요청
 *   3. 응답 검증 (zod)
 *   순서로 동작
 */
export const authApi = {
  signup: async (payload: authSchema.SignupRequest) => {
    // 1. 요청 데이터 검증 및 파싱
    const requestPayload = authSchema.signupRequestSchema.parse(payload)

    // 2. 회원가입 API 호출
    const { data } = await apiClient.post<authSchema.SignupResponse>(
      AUTH_ENDPOINTS.signup,
      requestPayload
    )

    // 3. 응답 데이터 검증 후 반환
    return authSchema.signupResponseSchema.parse(data)
  },

  sendEmailVerification: async (
    payload: authSchema.SendEmailVerificationRequest
  ) => {
    // 이메일 인증 코드 전송 요청 payload 검증
    const requestPayload =
      authSchema.sendEmailVerificationRequestSchema.parse(payload)

    // 이메일 인증 코드 전송 API 호출
    const { data } =
      await apiClient.post<authSchema.SendEmailVerificationResponse>(
        AUTH_ENDPOINTS.sendEmailVerification,
        requestPayload
      )

    return authSchema.sendEmailVerificationResponseSchema.parse(data)
  },

  verifyEmail: async (payload: authSchema.VerifyEmailRequest) => {
    // 이메일 인증 코드 검증 요청 payload 파싱
    const requestPayload = authSchema.verifyEmailRequestSchema.parse(payload)

    // 서버는 인증번호 확인 값을 body로 받습니다.
    const { data } = await apiClient.post<authSchema.VerifyEmailResponse>(
      AUTH_ENDPOINTS.verifyEmail,
      requestPayload
    )

    return authSchema.verifyEmailResponseSchema.parse(data)
  },

  checkNickname: async (payload: authSchema.CheckNicknameRequest) => {
    // 닉네임 중복 체크 요청 payload 파싱
    const requestPayload = authSchema.checkNicknameRequestSchema.parse(payload)

    // 닉네임 중복 체크 API 호출 (query param 사용)
    const { data } = await apiClient.get<authSchema.CheckNicknameResponse>(
      AUTH_ENDPOINTS.checkNickname,
      {
        params: requestPayload,
      }
    )

    return authSchema.checkNicknameResponseSchema.parse(data)
  },

  //프로필 조회 api
  me: async (): Promise<authSchema.MeResponse> => {
    const { data } = await apiClient.get(AUTH_ENDPOINTS.me)
    return authSchema.meResponseSchema.parse(data)
  },

  changeNickname: async (
    payload: authSchema.ChangeNicknameRequest
  ): Promise<authSchema.ChangeNicknameResponse> => {
    // 닉네임 변경 요청도 zod로 한 번 검증해서 API 경계의 데이터 형태를 고정합니다.
    const requestPayload = authSchema.changeNicknameRequestSchema.parse(payload)

    const { data } = await apiClient.patch<authSchema.ChangeNicknameResponse>(
      AUTH_ENDPOINTS.changeNickname,
      requestPayload
    )

    return authSchema.changeNicknameResponseSchema.parse(data)
  },

  changePassword: async (
    payload: authSchema.ChangePasswordRequest
  ): Promise<authSchema.ChangePasswordResponse> => {
    // 비밀번호 변경은 서버 필드명(password/new_password/confirm)을 그대로 보냅니다.
    const requestPayload = authSchema.changePasswordRequestSchema.parse(payload)

    const { data } = await apiClient.patch<authSchema.ChangePasswordResponse>(
      AUTH_ENDPOINTS.changePassword,
      requestPayload
    )

    return authSchema.changePasswordResponseSchema.parse(data)
  },

  checkCurrentPassword: async (
    payload: authSchema.CheckCurrentPasswordRequest
  ): Promise<authSchema.CheckCurrentPasswordResponse> => {
    const requestPayload =
      authSchema.checkCurrentPasswordRequestSchema.parse(payload)

    const { data } =
      await apiClient.post<authSchema.CheckCurrentPasswordResponse>(
        AUTH_ENDPOINTS.changePasswordCheck,
        requestPayload
      )

    return authSchema.checkCurrentPasswordResponseSchema.parse(data)
  },

  getProfileImages: async (): Promise<authSchema.ProfileImagesResponse> => {
    const { data } = await apiClient.get<authSchema.ProfileImagesResponse>(
      AUTH_ENDPOINTS.profileImages
    )
    return authSchema.profileImagesResponseSchema.parse(data)
  },

  login: async (
    payload: authSchema.LoginRequest
  ): Promise<authSchema.LoginResponse> => {
    // 로그인 요청 payload 검증
    const requestPayload = authSchema.loginRequestSchema.parse(payload)

    // 로그인 API 호출
    const { data } = await apiClient.post<authSchema.LoginResponse>(
      AUTH_ENDPOINTS.login,
      requestPayload
    )

    return authSchema.loginResponseSchema.parse(data)
  },

  logout: async (): Promise<authSchema.LogoutResponse> => {
    // 로그아웃 API 호출 (refresh_token 쿠키 제거 목적)
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
    // provider에 맞는 schema 선택
    const requestSchema = socialLoginCallbackRequestSchemas[provider]

    // 선택된 schema로 payload 검증
    const requestPayload = requestSchema.parse(payload)

    // 소셜 로그인 콜백 API 호출
    const { data } = await apiClient.post<authSchema.LoginResponse>(
      AUTH_ENDPOINTS.socialLoginCallback(provider),
      requestPayload
    )

    return authSchema.loginResponseSchema.parse(data)
  },
} as const
