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
import { useCharacterEntranceMotion } from '@/features/auth/character/hooks/useCharacterEntranceMotion'
import { useCharacterEyeStatus } from '@/features/auth/character/hooks/useCharacterEyeStatus'
import { usePasswordVisibility } from '@/features/auth/hooks/usePasswordVisibility'
import {
  buildSocialLoginUrl,
  socialLoginButtons,
  type SocialLoginProvider,
} from '@/features/auth/socialLogin'
import { useLoginMutation } from '@/query/auth'
import {
  type LoginFormSchema,
  loginFormSchema,
} from '@/schemas/auth/authForm.schema'
import { cn } from '@/utils/cn'

type LoginFocusedField = 'email' | 'password' | null

export function LoginPage() {
  const navigate = useNavigate()
  const {
    isDropped,
    isCompactMotion,
    isEntranceEyeActive,
    prefersReducedMotion,
  } = useCharacterEntranceMotion()
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
  const isSocialLoginPending = pendingSocialProvider !== null
  const hasLoginError =
    Boolean(errors.email) || Boolean(errors.password) || loginMutation.isError
  const errorTargetField: LoginFocusedField = errors.email
    ? 'email'
    : errors.password || loginMutation.isError
      ? 'password'
      : null

  const eyeStatus = useCharacterEyeStatus<LoginFocusedField>({
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
    // redirect 직전 버튼 재클릭을 막기 위해 선택된 provider를 로컬 상태로 유지합니다.
    setPendingSocialProvider(provider)
    // 소셜 로그인 시작은 프론트 mutation이 아니라 백엔드 OAuth 시작 URL로 직접 이동합니다.
    window.location.assign(buildSocialLoginUrl(provider))
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
              'min-h-13 w-full py-3 text-xl text-white',
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
            <span className="text-xs text-text-muted">간편 로그인</span>
            <span className="h-px flex-1 bg-border-default" />
          </div>

          <div className="flex items-center justify-center gap-10">
            {socialLoginButtons.map(({ provider, label, className, Logo }) => (
              <Button
                key={provider}
                aria-label={label}
                rounded={'full'}
                className={cn(
                  'flex size-14 items-center justify-center border shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(15,23,42,0.12)] focus-visible:outline-none focus-visible:ring-4 active:translate-y-0 disabled:translate-y-0 disabled:opacity-70 sm:size-14',
                  className
                )}
                disabled={isSocialLoginPending}
                onClick={() => handleSocialLogin(provider)}
              >
                {pendingSocialProvider === provider ? (
                  <LoaderCircle size={18} className="animate-spin" />
                ) : (
                  <span className="flex items-center justify-center">
                    <Logo />
                  </span>
                )}
              </Button>
            ))}
          </div>
          <p className="mt-6 flex items-center justify-center gap-3 text-sm text-text-muted">
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
