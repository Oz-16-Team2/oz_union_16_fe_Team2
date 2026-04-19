import * as z from 'zod'

const email = z.email('이메일 형식이 올바르지 않습니다.')
const loginPassword = z.string().min(1, '비밀번호를 입력해주세요')
const signupPassword = z.string().min(8, '비밀번호는 8자 이상이어야 합니다.')
const nickname = z.string().min(1, '닉네임을 입력해주세요')
const profileImageUrl = z.string().optional()
const code = z.string().min(1, '인증번호를 입력해주세요')
const passwordConfirm = z.string().min(1, '비밀번호 확인을 입력해주세요')

export const loginFormSchema = z.object({
  email,
  password: loginPassword,
})

export const signupFormSchema = z
  .object({
    email,
    code,
    password: signupPassword,
    passwordConfirm,
    nickname,
    profile_image_url: profileImageUrl,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다',
  })

export type LoginFormSchema = z.infer<typeof loginFormSchema>
export type SignupFormSchema = z.infer<typeof signupFormSchema>
