import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'

import { Button } from '@/components/common/ui'
import {
  AuthForm,
  AuthFormLayout,
  CharacterDropAnimationFrame,
} from '@/features/auth'
import { useAuthEntranceMotion } from '@/features/auth/hooks/useAuthEntranceMotion'
import { useAuthEyeStatus } from '@/features/auth/hooks/useAuthEyeStatus'
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
  const navigate = useNavigate()
  const {
    isDropped,
    isCompactMotion,
    isEntranceEyeActive,
    prefersReducedMotion,
  } = useAuthEntranceMotion()
  const [focusedField, setFocusedField] = useState<LoginFocusedField>(null)
  const [lastFocusedField, setLastFocusedField] =
    useState<LoginFocusedField>(null)
  const [pendingSocialProvider, setPendingSocialProvider] =
    useState<SocialLoginProvider | null>(null)
  const [isSuccessMotion, setIsSuccessMotion] = useState(false)

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
  const loginMutation = useLoginMutation(setError, {
    onSuccess: () => {
      setIsSuccessMotion(true)
      window.setTimeout(() => {
        navigate('/')
      }, 620)
    },
  })
  const socialLoginMutation = useSocialLoginMutation()
  const isSocialLoginPending = socialLoginMutation.isPending
  const hasLoginError =
    Boolean(errors.email) || Boolean(errors.password) || loginMutation.isError
  const errorTargetField: LoginFocusedField = errors.email
    ? 'email'
    : errors.password || loginMutation.isError
      ? 'password'
      : null

  const eyeStatus = useAuthEyeStatus<LoginFocusedField>({
    emailFields: ['email'],
    errorTargetField,
    focusedField,
    hasError: hasLoginError,
    isDropped,
    isEntranceEyeActive,
    lastFocusedField,
    passwordFields: ['password'],
  })

  const handleLoginSubmit = (formValues: LoginFormSchema) => {
    loginMutation.mutate(formValues)
  }

  const handleSocialLogin = (provider: SocialLoginProvider) => {
    setPendingSocialProvider(provider)

    const mutationOptions = {
      onSettled: () => {
        // 소셜 버튼별 loading 표시를 끝내기 위한 로컬 상태입니다.
        // 실제 OAuth redirect 방식으로 바뀌면 이 상태는 삭제될 수 있습니다.
        setPendingSocialProvider(null)
      },
    }

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
    <div className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden">
      <CharacterDropAnimationFrame
        isDropped={isDropped}
        isSuccessMotion={isSuccessMotion}
        isCompactMotion={isCompactMotion}
        eyeStatus={eyeStatus}
        prefersReducedMotion={prefersReducedMotion}
      >
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
              'w-full py-3 text-xl text-white',
              isSuccessMotion
                ? 'bg-black text-white disabled:bg-black disabled:text-white'
                : loginMutation.isPending
                  ? 'disabled:bg-black disabled:text-white'
                  : isValid
                    ? 'bg-black hover:bg-[#121212]'
                    : 'disabled:bg-[#d9d9d9] disabled:text-white/60 dark:disabled:bg-black/30 dark:disabled:text-white/20'
            )}
            size="lg"
            disabled={
              !isDirty || !isValid || loginMutation.isPending || isSuccessMotion
            }
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
          <p className="mt-4 flex items-center justify-center gap-3 text-sm text-text-muted">
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
