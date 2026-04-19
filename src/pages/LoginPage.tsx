import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router'

import { Button } from '@/components/common/ui'
import { AuthForm, AuthPageLayout } from '@/features/auth'

type LoginFormValues = {
  email: string
  password: string
}

export function LoginPage() {
  const methods = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // 로그인 API 연결 전 임시 제출 함수입니다.
  const handleLoginSubmit = () => {}

  return (
    <AuthPageLayout
      title="로그인"
      subTitle="계정으로 로그인하고 꾸준함을 이어가세요"
    >
      <FormProvider {...methods}>
        <AuthForm onSubmit={methods.handleSubmit(handleLoginSubmit)}>
          <AuthForm.FormField<LoginFormValues>
            label="이메일"
            name="email"
            control={methods.control}
            type="email"
            placeholder="이메일"
          />
          <AuthForm.FormField<LoginFormValues>
            label="비밀번호"
            control={methods.control}
            name="password"
            type="password"
            placeholder="비밀번호"
          />

          <div className="flex flex-col gap-3">
            <Button type="submit" size="lg">
              로그인
            </Button>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center rounded-md border border-border-subtle bg-gray-100 px-4 py-2 text-base font-medium text-text-muted hover:bg-gray-100"
            >
              회원가입
            </Link>
          </div>
        </AuthForm>
      </FormProvider>
    </AuthPageLayout>
  )
}
