import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'

import { Button } from '@/components/common/ui'
import {
  AuthForm,
  AuthFormLayout,
  CharacterDropAnimationFrame,
} from '@/features/auth'
import type { CharacterEyeStatus } from '@/features/auth/character/eye/useCharacterEye'
import { useAuthEntranceMotion } from '@/features/auth/hooks/useAuthEntranceMotion'
import { usePasswordVisibility } from '@/features/auth/hooks/usePasswordVisibility'
import { mockSocialLoginPayload } from '@/mocks/data/auth'
import { useLoginMutation, useSocialLoginMutation } from '@/query/auth'
import {
  type LoginFormSchema,
  loginFormSchema,
} from '@/schemas/auth/authForm.schema'
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

type SocialLoginProvider = (typeof socialLoginButtons)[number]['provider']
type LoginFocusedField = 'email' | 'password' | null

export function LoginPage() {
  const { isDropped, isEntranceEyeActive } = useAuthEntranceMotion()
  const [focusedField, setFocusedField] = useState<LoginFocusedField>(null)
  const [lastFocusedField, setLastFocusedField] =
    useState<LoginFocusedField>(null)
  const [pendingSocialProvider, setPendingSocialProvider] =
    useState<SocialLoginProvider | null>(null)

  const methods = useForm<LoginFormSchema>({
    mode: 'onChange',
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {
    control,
    formState: { errors, isValid, isDirty },
    setError,
  } = methods

  const LoginField = AuthForm.FormField<LoginFormSchema>
  const passwordVisibility = usePasswordVisibility()
  const loginMutation = useLoginMutation(setError)
  const socialLoginMutation = useSocialLoginMutation()
  const isSocialLoginPending = socialLoginMutation.isPending
  const hasLoginError =
    Boolean(errors.email) || Boolean(errors.password) || loginMutation.isError
  const errorTargetField: LoginFocusedField = errors.email
    ? 'email'
    : errors.password || loginMutation.isError
      ? 'password'
      : null
  const eyeTargetField = errorTargetField ?? focusedField ?? lastFocusedField

  // 비밀번호 입력 중에는 에러 유무와 무관하게 다른 쪽을 보고, 그 외에는 에러 필드를 우선 봅니다.
  const eyeStatus: CharacterEyeStatus =
    focusedField === 'password'
      ? 'look-away'
      : hasLoginError
        ? eyeTargetField === 'password'
          ? 'password-error'
          : eyeTargetField === 'email'
            ? 'email-error'
            : 'error'
        : focusedField === 'email'
          ? 'email'
          : !isDropped || isEntranceEyeActive
            ? 'entrance'
            : 'idle'

  const handleLoginSubmit = (formValues: LoginFormSchema) => {
    // 로그인 폼 제출 시 authApi.login -> MSW login handler 순서로 요청이 흐릅니다.
    // 실제 API가 개발되면 같은 mutation을 유지한 채 baseURL만 실제 서버로 연결하면 됩니다.
    loginMutation.mutate(formValues)
  }

  const handleSocialLogin = (provider: SocialLoginProvider) => {
    // 현재는 OAuth redirect가 없어서 MSW callback endpoint를 직접 호출합니다.
    // 추후 실제 소셜 로그인 연동 시 provider 로그인 URL로 이동하거나 callback 페이지에서 이 요청을 실행하도록 교체합니다.
    setPendingSocialProvider(provider)

    const mutationOptions = {
      onSettled: () => {
        // 소셜 버튼별 loading 표시를 끝내기 위한 로컬 상태입니다.
        // 실제 OAuth redirect 방식으로 바뀌면 이 상태는 삭제될 수 있습니다.
        setPendingSocialProvider(null)
      },
    }

    // provider별 callback payload 모양이 달라서 분기별로 mutation 변수를 넘깁니다.
    // 이렇게 두면 스키마 타입과 provider가 어긋나는 실수를 TypeScript가 잡아줍니다.
    if (provider === 'kakao') {
      socialLoginMutation.mutate(
        {
          provider,
          payload: mockSocialLoginPayload.kakao,
        },
        mutationOptions
      )
      return
    }

    if (provider === 'naver') {
      socialLoginMutation.mutate(
        {
          provider,
          payload: mockSocialLoginPayload.naver,
        },
        mutationOptions
      )
      return
    }

    socialLoginMutation.mutate(
      {
        provider,
        payload: mockSocialLoginPayload.google,
      },
      mutationOptions
    )
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center">
      <CharacterDropAnimationFrame isDropped={isDropped} eyeStatus={eyeStatus}>
        <AuthFormLayout
          methods={methods}
          title="로그인"
          description="계정으로 로그인하고 꾸준함을 이어가세요"
          onSubmit={methods.handleSubmit(handleLoginSubmit)}
        >
          <LoginField
            label="이메일"
            name="email"
            control={control}
            type="email"
            placeholder="example@email.com"
            onFocus={() => {
              // blur 이후 에러가 떠도 마지막 포커스 필드를 계속 바라보도록 기억합니다.
              setFocusedField('email')
              setLastFocusedField('email')
            }}
            onBlur={() => setFocusedField(null)}
          />
          <LoginField
            label="비밀번호"
            control={control}
            name="password"
            actionClassName="pb-0"
            type={passwordVisibility.inputType}
            placeholder="비밀번호을 입력해주세요"
            onFocus={() => {
              // blur 이후 에러가 떠도 마지막 포커스 필드를 계속 바라보도록 기억합니다.
              setFocusedField('password')
              setLastFocusedField('password')
            }}
            onBlur={() => setFocusedField(null)}
          ></LoginField>

          <Button
            variant={'neutral'}
            type="submit"
            rounded={'lg'}
            className={cn(
              'text-xl py-3 w-full',
              loginMutation.isPending
                ? 'disabled:bg-black disabled:text-white'
                : isValid
                  ? 'bg-black hover:bg-[#121212]'
                  : 'disabled:bg-black/30 disabled:text-white/20'
            )}
            size="lg"
            disabled={!isDirty || !isValid || loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <LoaderCircle size={18} className="animate-spin" />
            ) : (
              '로그인'
            )}
          </Button>

          <div className="flex items-center gap-3 py-1">
            <span className="h-px flex-1 bg-border-default" />
            <span className="text-xs text-text-muted">또는</span>
            <span className="h-px flex-1 bg-border-default" />
          </div>

          <div className="flex items-center justify-center gap-12">
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
                  disabled={isSocialLoginPending}
                  onClick={() => handleSocialLogin(provider)}
                >
                  {pendingSocialProvider === provider ? (
                    <LoaderCircle size={18} className="animate-spin" />
                  ) : (
                    <span aria-hidden="true">{iconLabel}</span>
                  )}
                </Button>
              )
            )}
          </div>
          <p className="mt-2 flex items-center justify-center gap-3 text-sm text-text-muted">
            계정이 없으신가요?
            <Link to="/signup" className="font-medium text-primary-600">
              회원가입
            </Link>
          </p>
        </AuthFormLayout>
      </CharacterDropAnimationFrame>
    </div>
  )
}
