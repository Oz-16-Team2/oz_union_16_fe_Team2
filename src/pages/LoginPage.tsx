import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/common/ui'
import { AuthForm, AuthPageLayout } from '@/features/auth'
import {
  type EmailLoginRequestSchema,
  emailLoginRequestSchema,
} from '@/schemas/auth/login'
import { cn } from '@/utils/cn'

const socialLoginButtons = [
  {
    provider: 'kakao',
    label: '카카오 로그인',
    iconLabel: 'K',
    className: 'bg-[#FEE500] text-[#191919] hover:bg-[#F6D900]',
  },
  {
    provider: 'naver',
    label: '네이버 로그인',
    iconLabel: 'N',
    className: 'bg-[#03C75A] text-white hover:bg-[#02B350]',
  },
  {
    provider: 'google',
    label: '구글 로그인',
    iconLabel: 'G',
    className: 'bg-white text-[#4285F4]',
  },
] as const

export function LoginPage() {
  const methods = useForm<EmailLoginRequestSchema>({
    mode: 'onChange',
    resolver: zodResolver(emailLoginRequestSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {
    control,
    formState: { isValid, isDirty },
  } = methods

  const LoginField = AuthForm.FormField<EmailLoginRequestSchema>

  // 로그인 API 연결 전 임시 제출 함수입니다.
  const handleLoginSubmit = () => {}
  const handleSocialLogin = (
    provider: (typeof socialLoginButtons)[number]['provider']
  ) => {
    // TODO: 소셜 로그인 시작 API 또는 OAuth URL 연결
    void provider
  }

  return (
    <AuthPageLayout
      title="로그인"
      subTitle="계정으로 로그인하고 꾸준함을 이어가세요"
    >
      <FormProvider {...methods}>
        <AuthForm onSubmit={methods.handleSubmit(handleLoginSubmit)}>
          <LoginField
            label="이메일"
            name="email"
            control={control}
            type="email"
            placeholder="example@email.com"
          />
          <LoginField
            label="비밀번호"
            control={control}
            name="password"
            type="password"
            placeholder="비밀번호을 입력해주세요"
          />

          <Button
            variant={'neutral'}
            type="submit"
            rounded={'lg'}
            className={cn(
              'text-xl py-3 w-full',
              isValid
                ? 'bg-black hover:bg-[#121212]'
                : 'disabled:bg-black/30 disabled:text-white/20'
            )}
            size="lg"
            disabled={!isDirty || !isValid}
          >
            로그인
          </Button>

          <div className="flex items-center gap-3 py-1">
            <span className="h-px flex-1 bg-border-default" />
            <span className="text-xs text-text-muted">또는</span>
            <span className="h-px flex-1 bg-border-default" />
          </div>

          {/* 소셜 로그인 레이아웃 */}
          <div className="flex justify-center items-center gap-12">
            {socialLoginButtons.map(
              ({ provider, label, iconLabel, className }) => (
                <Button
                  key={provider}
                  aria-label={label}
                  rounded={'full'}
                  className={cn(
                    'flex size-14 items-center justify-center text-xl font-bold transition-colors',
                    className
                  )}
                  onClick={() => handleSocialLogin(provider)}
                >
                  <span aria-hidden="true">{iconLabel}</span>
                </Button>
              )
            )}
          </div>
          <p className="flex justify-center items-center gap-3 mt-2 text-sm text-text-muted">
            계정이 없으신가요?
            <Link to="/signup" className="font-medium text-primary-600">
              회원가입
            </Link>
          </p>
        </AuthForm>
      </FormProvider>
    </AuthPageLayout>
  )
}
