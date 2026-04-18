import { useForm } from 'react-hook-form'
import { Link } from 'react-router'

import { zodResolver } from '@hookform/resolvers/zod'

import { yellowCharacterImage } from '@/assets/images'
import { Button } from '@/components/common/ui'
import {
  AuthForm,
  AuthPageLayout,
  EmailVerificationField,
  FormField,
  NicknameCheckField,
  ProfileImageSelectField,
} from '@/features/auth'
import { type SignupSchema, signupSchema } from '@/schemas/auth/signup'
import { cn } from '@/utils/cn'

export function SignupPage() {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    register,
    setValue,
  } = useForm<SignupSchema>({
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

  // API 연결 전 임시 제출 함수입니다. 회원가입 API가 붙으면 여기서 요청을 보냅니다.
  const handleSignupSubmit = () => {}

  return (
    <AuthPageLayout
      title="회원가입"
      subTitle="작심삼일 말고, 작심며칠! 오늘 부터 꾸준함을 만들어보세요"
    >
      <AuthForm onSubmit={handleSubmit(handleSignupSubmit)}>
        <NicknameCheckField
          control={control}
          errors={errors}
          register={register}
        />
        <EmailVerificationField
          control={control}
          errors={errors}
          register={register}
        />
        <FormField label="비밀번호" type="password" placeholder="비밀번호" />
        <FormField
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호 재입력"
        />
        <ProfileImageSelectField
          control={control}
          errors={errors}
          setValue={setValue}
        />

        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            className={cn(
              'text-xl',
              isValid ? 'bg-black hover:bg-[#121212]' : 'disabled:opacity-10'
            )}
            size="lg"
            disabled={!isValid}
          >
            회원가입
          </Button>
          <Link to="/login" className="text-center text-sm text-text-muted">
            이미 계정이 있으신가요? 로그인
          </Link>
        </div>
      </AuthForm>
    </AuthPageLayout>
  )
}
