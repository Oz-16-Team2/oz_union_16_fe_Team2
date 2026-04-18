import { Link } from 'react-router'

import { Button } from '@/components/common/ui'
import { AuthForm, AuthPageLayout, FormField } from '@/features/auth'

export function LoginPage() {
  return (
    <AuthPageLayout
      title="로그인"
      subTitle="계정으로 로그인하고 꾸준함을 이어가세요"
    >
      <AuthForm>
        <FormField
          label="이메일"
          name="email"
          type="email"
          placeholder="이메일"
        />
        <FormField
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호"
        />

        <div className="flex flex-col gap-3">
          <Button type="button" size="lg">
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
    </AuthPageLayout>
  )
}
