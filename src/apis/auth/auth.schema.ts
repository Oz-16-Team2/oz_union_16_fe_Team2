import * as z from 'zod'

const code = z.string()
const state = z.string()
const email = z.email()
const password = z.string()
const nickname = z.string()
const profileImageUrl = z.string().optional()
const emailToken = z.string()
const detail = z.string()
const accessToken = z.string()
const fieldError = z.record(z.string(), z.array(z.string()))

// REQ-AUTH-001: 이메일 회원가입
// POST /api/v1/accounts/signup
export const signupRequestSchema = z.object({
  email,
  password,
  nickname,
  profile_image: profileImageUrl,
  email_token: emailToken,
})

export const signupResponseSchema = z.object({
  detail,
})

// REQ-AUTH-002: 이메일 인증 발송
// POST /api/v1/accounts/verification/send-email
export const sendEmailVerificationRequestSchema = z.object({
  email,
})

export const sendEmailVerificationResponseSchema = z.object({
  detail,
})

// REQ-AUTH-003: 이메일 인증 확인
// GET /api/v1/accounts/verification/verify-email
export const verifyEmailRequestSchema = z.object({
  email,
  code,
})

export const verifyEmailResponseSchema = z.object({
  detail,
  email_token: emailToken,
})

// REQ-AUTH-004~006: 소셜 로그인 콜백
// POST /api/v1/accounts/social-login/kakao/callback
export const kakaoLoginCallbackRequestSchema = z.object({
  code,
})

// POST /api/v1/accounts/social-login/naver/callback
export const naverLoginCallbackRequestSchema = z.object({
  code,
  state,
})

// POST /api/v1/accounts/social-login/google/callback
export const googleLoginCallbackRequestSchema = z.object({
  code,
  state: state.optional(),
})

export const socialLoginResponseSchema = z.object({
  access_token: accessToken,
})

// REQ-AUTH-007: 이메일 로그인
// POST /api/v1/accounts/login
export const loginRequestSchema = z.object({
  email,
  password,
})

export const loginResponseSchema = z.object({
  access_token: accessToken,
})

export const fieldErrorResponseSchema = z.object({
  error_detail: fieldError,
})

export const loginUnauthorizedResponseSchema = z.object({
  error_detail: z.literal('이메일 또는 비밀번호가 올바르지 않습니다.'),
})

// REQ-AUTH-008: 로그아웃
// POST /api/v1/accounts/logout
export const logoutResponseSchema = z.object({
  detail,
})

// REQ-AUTH-009: JWT 토큰 재발급
// POST /api/v1/accounts/token/refresh
// refresh_token은 HttpOnly 쿠키로만 전달되므로 요청 body는 비어 있습니다.
export const refreshTokenRequestSchema = z.object({})

export const refreshTokenResponseSchema = z.object({
  access_token: accessToken,
})

export const sessionExpiredResponseSchema = z.object({
  error_detail: z.object({
    detail: z.literal('로그인 세션이 만료되었습니다.'),
  }),
})

// REQ-AUTH-010: 닉네임 중복 확인
// GET /api/v1/accounts/check-nickname
export const checkNicknameRequestSchema = z.object({
  nickname,
})

export const checkNicknameResponseSchema = z.object({
  detail,
})

// REQ-AUTH-011: 내 프로필 조회
// GET /api/v1/accounts/me
export const meResponseSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  profile_image_url: z.string(),
})

// Zod 스키마 기반 타입 추론
// z.infer<typeof schema>를 사용하면,
// Zod로 정의한 스키마를 기준으로 TypeScript 타입을 자동 생성
// 목적:
// 1. 타입을 따로 정의하지 않아도 됨 (중복 제거)
// 2. API 스펙 변경 시 스키마만 수정하면 타입도 자동 반영됨
// 3. 폼/응답/요청 구조를 하나의 기준(Zod)으로 통일 가능
// 즉, "타입 정의 + 런타임 검증"을 동시에 가져가기 위한 구조

export type SignupRequest = z.infer<typeof signupRequestSchema>
export type SignupResponse = z.infer<typeof signupResponseSchema>
export type SendEmailVerificationRequest = z.infer<
  typeof sendEmailVerificationRequestSchema
>
export type SendEmailVerificationResponse = z.infer<
  typeof sendEmailVerificationResponseSchema
>

export type VerifyEmailRequest = z.infer<typeof verifyEmailRequestSchema>
export type VerifyEmailResponse = z.infer<typeof verifyEmailResponseSchema>
export type KakaoLoginCallbackRequest = z.infer<
  typeof kakaoLoginCallbackRequestSchema
>
export type NaverLoginCallbackRequest = z.infer<
  typeof naverLoginCallbackRequestSchema
>
export type GoogleLoginCallbackRequest = z.infer<
  typeof googleLoginCallbackRequestSchema
>
export type SocialLoginResponse = z.infer<typeof socialLoginResponseSchema>
export type LoginRequest = z.infer<typeof loginRequestSchema>
export type LoginResponse = z.infer<typeof loginResponseSchema>
export type FieldErrorResponse = z.infer<typeof fieldErrorResponseSchema>
export type LoginUnauthorizedResponse = z.infer<
  typeof loginUnauthorizedResponseSchema
>
export type LogoutResponse = z.infer<typeof logoutResponseSchema>
export type RefreshTokenResponse = z.infer<typeof refreshTokenResponseSchema>
export type SessionExpiredResponse = z.infer<
  typeof sessionExpiredResponseSchema
>
export type CheckNicknameRequest = z.infer<typeof checkNicknameRequestSchema>
export type CheckNicknameResponse = z.infer<typeof checkNicknameResponseSchema>
export type MeResponse = z.infer<typeof meResponseSchema>
