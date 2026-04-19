import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { Link } from 'react-router'

import { zodResolver } from '@hookform/resolvers/zod'

import { yellowCharacterImage } from '@/assets/images'
import { Button } from '@/components/common/ui'
import {
  AuthForm,
  AuthPageLayout,
  ProfileImageSelectField,
} from '@/features/auth'
import { type SignupSchema, signupSchema } from '@/schemas/auth/signup'
import { cn } from '@/utils/cn'

/*
 * TODO:
 * 1. 이메일 인증 요청 API 연결 (이메일 입력 후 '이메일확인' 버튼 클릭)
 * 2. 이메일 인증 코드 검증 → email_token 설정
 * 3. 닉네임 중복확인 API 연결 ('중복확인' 버튼 클릭 시)
 * 4. TanStack Query로 mutation 분리 (emailVerify, nicknameCheck)
 * 5. 검증 성공 상태를 form 상태와 연동 (ex. isEmailVerified, isNicknameChecked)
 */

export function SignupPage() {
  const methods = useForm<SignupSchema>({
    mode: 'onChange',
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordConfirm: '',
      profile_image_url: yellowCharacterImage,
      email_token: '',
    },
  })

  const {
    control,
    formState: { isValid, isDirty },
    setValue,
  } = methods
  const profileImageUrl = useWatch({ control, name: 'profile_image_url' })

  const SignupField = AuthForm.FormField<SignupSchema>

  // API 연결 전 임시 제출 함수입니다. 회원가입 API가 붙으면 여기서 요청을 보냅니다.
  const handleSignupSubmit = () => {}

  return (
    <AuthPageLayout
      title="회원가입"
      subTitle="작심삼일 말고, 작심며칠! 오늘 부터 꾸준함을 만들어보세요"
    >
      <FormProvider {...methods}>
        <AuthForm onSubmit={methods.handleSubmit(handleSignupSubmit)}>
          <SignupField
            name="nickname"
            label="닉네임"
            control={control}
            type="text"
            placeholder="닉네임을 입력해주세요"
          >
            <Button>중복확인</Button>
          </SignupField>

          <SignupField control={control} name="email" label="이메일">
            <Button
              type="button"
              onClick={() =>
                setValue('email_token', 'verified', {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
            >
              이메일확인
            </Button>
          </SignupField>

          <SignupField
            control={control}
            name="password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호"
          />

          <SignupField
            control={control}
            name="passwordConfirm"
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호 재입력"
          />

          <ProfileImageSelectField
            value={profileImageUrl}
            onChange={(value) =>
              setValue('profile_image_url', value, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          />

          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              className={cn(
                'text-xl',
                isValid ? 'bg-black hover:bg-[#121212]' : 'disabled:opacity-10'
              )}
              size="lg"
              disabled={!isDirty || !isValid}
            >
              회원가입
            </Button>
            <Link to="/login" className="text-center text-sm text-text-muted">
              이미 계정이 있으신가요? 로그인
            </Link>
          </div>
        </AuthForm>
      </FormProvider>
    </AuthPageLayout>
  )
}
