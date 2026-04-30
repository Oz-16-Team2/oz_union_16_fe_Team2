import * as z from 'zod'

const email = z.email('이메일 형식이 올바르지 않습니다.')
const loginPassword = z.string().min(1, '비밀번호를 입력해주세요')
const signupPassword = z
  .string()
  .min(8, '비밀번호는 8자 이상이어야 합니다.')
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d).+$/,
    '비밀번호는 영문과 숫자를 모두 포함해야 합니다.'
  )
const nickname = z.string().trim().min(1, '닉네임을 입력해주세요')
const profileImageUrl = z.string().min(1, '프로필 캐릭터를 선택해주세요')
const code = z.string().min(1, '인증번호를 입력해주세요')
const passwordConfirm = z.string().min(1, '비밀번호 확인을 입력해주세요')
const emailToken = z.string()

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
    profile_image: profileImageUrl,
    email_token: emailToken,
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: 'custom',
        path: ['passwordConfirm'],
        message: '비밀번호가 일치하지 않습니다',
      })
    }
  })

export type LoginFormSchema = z.infer<typeof loginFormSchema>
export type SignupFormSchema = z.infer<typeof signupFormSchema>
