import * as z from 'zod'

const code = z.string().min(1, '인가 코드를 입력해주세요')
const state = z.string().min(1, 'state 값을 입력해주세요')
const email = z.email('이메일 형식이 올바르지 않습니다.')
const password = z.string().min(1, '비밀번호를 입력해주세요')
const accessToken = z.string()
const fieldError = z.record(z.string(), z.array(z.string()))

// REQ-AUTH-004: 카카오 소셜 회원가입/로그인 콜백 API 요청값
export const kakaoLoginCallbackRequestSchema = z.object({
  code,
})

// REQ-AUTH-005: 네이버 소셜 회원가입/로그인 콜백 API 요청값
export const naverLoginCallbackRequestSchema = z.object({
  code,
  state,
})

// REQ-AUTH-006: 구글 소셜 회원가입/로그인 콜백 API 요청값
export const googleLoginCallbackRequestSchema = z.object({
  code,
  state: state.optional(),
})

// REQ-AUTH-007: 이메일 로그인 API 요청값
export const emailLoginRequestSchema = z.object({
  email,
  password,
})

// 로그인 성공 응답값
export const loginResponseSchema = z.object({
  access_token: accessToken,
})

// 이메일 로그인 인증 실패 응답값
export const emailLoginUnauthorizedResponseSchema = z.object({
  error_detail: z.literal('이메일 또는 비밀번호가 올바르지 않습니다.'),
})

// 로그인/소셜 로그인 필드 검증 실패 응답값
export const loginFieldErrorResponseSchema = z.object({
  error_detail: fieldError,
})

export type KakaoLoginCallbackRequestSchema = z.infer<
  typeof kakaoLoginCallbackRequestSchema
>
export type NaverLoginCallbackRequestSchema = z.infer<
  typeof naverLoginCallbackRequestSchema
>
export type GoogleLoginCallbackRequestSchema = z.infer<
  typeof googleLoginCallbackRequestSchema
>
export type EmailLoginRequestSchema = z.infer<typeof emailLoginRequestSchema>
export type LoginResponseSchema = z.infer<typeof loginResponseSchema>
export type LoginFieldErrorResponseSchema = z.infer<
  typeof loginFieldErrorResponseSchema
>
export type EmailLoginUnauthorizedResponseSchema = z.infer<
  typeof emailLoginUnauthorizedResponseSchema
>
