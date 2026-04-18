import * as z from 'zod'

const email = z.email('이메일 형식이 올바르지 않습니다.')
const password = z.string().min(8, '비밀번호는 8자 이상이어야 합니다.')
const nickname = z.string().min(1, '닉네임을 입력해주세요')
const profileImageUrl = z.string().optional()
const emailToken = z.string().min(1, '이메일 인증이 필요합니다')
const code = z.string().min(1, '인증번호를 입력해주세요')

// REQ-AUTH-001: 회원가입 API 요청값
export const signupRequestSchema = z.object({
  email,
  password,
  nickname,
  profile_image_url: profileImageUrl,
  email_token: emailToken,
})

// 회원가입 폼 검증값: API 요청값 + 비밀번호 확인
export const signupSchema = signupRequestSchema
  .extend({
    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다',
  })

// REQ-AUTH-002: 이메일 인증 발송 API 요청값
export const sendEmailVerificationSchema = z.object({
  email,
})

// REQ-AUTH-003: 이메일 인증 확인 API 요청값
export const verifyEmailSchema = z.object({
  email,
  code,
})

export type SignupRequestSchema = z.infer<typeof signupRequestSchema>
export type SignupSchema = z.infer<typeof signupSchema>
export type SendEmailVerificationSchema = z.infer<
  typeof sendEmailVerificationSchema
>
export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>
