import * as z from 'zod'

const code = z.string()
const state = z.string()
const email = z.email()
const password = z.string()
const nickname = z.string()
const refreshToken = z.string()
const profileImageUrl = z.string().optional()
const emailToken = z.string()
const detail = z.string()
const accessToken = z.string()
const fieldError = z.record(z.string(), z.array(z.string()))

// REQ-AUTH-001: 이메일 회원가입
export const signupRequestSchema = z.object({
  password,
  nickname,
  profile_image_url: profileImageUrl,
  email_token: emailToken,
})

export const signupResponseSchema = z.object({
  detail,
})

// REQ-AUTH-002: 이메일 인증 발송
export const sendEmailVerificationRequestSchema = z.object({
  email,
})

export const sendEmailVerificationResponseSchema = z.object({
  detail,
})

// REQ-AUTH-003: 이메일 인증 확인
export const verifyEmailRequestSchema = z.object({
  email,
  code,
})

export const verifyEmailResponseSchema = z.object({
  detail,
  email_token: emailToken,
})

// REQ-AUTH-004~006: 소셜 로그인 콜백
export const kakaoLoginCallbackRequestSchema = z.object({
  code,
})

export const naverLoginCallbackRequestSchema = z.object({
  code,
  state,
})

export const googleLoginCallbackRequestSchema = z.object({
  code,
  state: state.optional(),
})

// REQ-AUTH-007: 이메일 로그인
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
export const logoutResponseSchema = z.object({
  detail,
})

// REQ-AUTH-009: JWT 토큰 재발급
export const refreshTokenRequestSchema = z.object({
  refresh_token: refreshToken,
})

export const refreshTokenResponseSchema = z.object({
  access_token: accessToken,
})

export const sessionExpiredResponseSchema = z.object({
  error_detail: z.object({
    detail: z.literal('로그인 세션이 만료되었습니다.'),
  }),
})

// REQ-AUTH-010: 닉네임 중복 확인
export const checkNicknameRequestSchema = z.object({
  nickname,
})

export const checkNicknameResponseSchema = z.object({
  detail,
})

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
export type LoginRequest = z.infer<typeof loginRequestSchema>
export type LoginResponse = z.infer<typeof loginResponseSchema>
export type FieldErrorResponse = z.infer<typeof fieldErrorResponseSchema>
export type LoginUnauthorizedResponse = z.infer<
  typeof loginUnauthorizedResponseSchema
>
export type LogoutResponse = z.infer<typeof logoutResponseSchema>
export type RefreshTokenRequest = z.infer<typeof refreshTokenRequestSchema>
export type RefreshTokenResponse = z.infer<typeof refreshTokenResponseSchema>
export type SessionExpiredResponse = z.infer<
  typeof sessionExpiredResponseSchema
>
export type CheckNicknameRequest = z.infer<typeof checkNicknameRequestSchema>
export type CheckNicknameResponse = z.infer<typeof checkNicknameResponseSchema>
