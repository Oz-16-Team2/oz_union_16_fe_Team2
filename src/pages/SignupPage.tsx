import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'

import { Button } from '@/components/common/ui'
import {
  AuthForm,
  AuthFormLayout,
  PasswordVisibilityButton,
  ProfileImageSelectField,
  SignupDropAnimationFrame,
} from '@/features/auth'
import { useAuthEntranceMotion } from '@/features/auth/hooks/useAuthEntranceMotion'
import { useAuthEyeStatus } from '@/features/auth/hooks/useAuthEyeStatus'
import { usePasswordVisibility } from '@/features/auth/hooks/usePasswordVisibility'
import { useEmailVerification } from '@/features/auth/signup/hook/useEmailVerification'
import { useNicknameCheck } from '@/features/auth/signup/hook/useNicknameCheck'
import { useSignupMutation } from '@/query/auth'
import {
  type SignupFormSchema,
  signupFormSchema,
} from '@/schemas/auth/authForm.schema'
import { cn } from '@/utils/cn'

type SignupFocusedField =
  | 'nickname'
  | 'email'
  | 'code'
  | 'password'
  | 'passwordConfirm'
  | null

export function SignupPage() {
  const navigate = useNavigate()
  const {
    isDropped,
    isCompactMotion,
    isEntranceEyeActive,
    prefersReducedMotion,
  } = useAuthEntranceMotion()
  const [focusedField, setFocusedField] = useState<SignupFocusedField>(null)
  const [lastFocusedField, setLastFocusedField] =
    useState<SignupFocusedField>(null)
  const [isSuccessMotion, setIsSuccessMotion] = useState(false)

  const methods = useForm<SignupFormSchema>({
    mode: 'onChange',
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: '',
      code: '',
      nickname: '',
      password: '',
      passwordConfirm: '',
      profile_image: '',
      email_token: '',
    },
  })

  const {
    control,
    formState: { errors, isValid, isDirty },
    setError,
    setValue,
  } = methods
  const profileImageUrl = useWatch({ control, name: 'profile_image' })

  const SignupField = AuthForm.FormField<SignupFormSchema>
  const passwordVisibility = usePasswordVisibility()
  const passwordConfirmVisibility = usePasswordVisibility()

  const nicknameCheck = useNicknameCheck(methods)
  const emailVerification = useEmailVerification(methods)
  const signupMutation = useSignupMutation(setError, {
    onSuccess: () => {
      setIsSuccessMotion(true)
      window.setTimeout(() => {
        navigate('/login')
      }, 620)
    },
  })
  const canSignup =
    isDirty &&
    isValid &&
    nicknameCheck.isChecked &&
    emailVerification.isVerified
  const hasSignupError =
    Boolean(errors.nickname) ||
    Boolean(errors.email) ||
    Boolean(errors.code) ||
    Boolean(errors.password) ||
    Boolean(errors.passwordConfirm) ||
    signupMutation.isError
  const errorTargetField: SignupFocusedField =
    errors.password || errors.passwordConfirm || signupMutation.isError
      ? 'password'
      : errors.email || errors.code || errors.nickname
        ? 'email'
        : null

  const eyeStatus = useAuthEyeStatus<SignupFocusedField>({
    emailFields: ['email', 'code', 'nickname'],
    errorTargetField,
    focusedField,
    hasError: hasSignupError,
    isDropped,
    isEntranceEyeActive,
    lastFocusedField,
    passwordFields: ['password', 'passwordConfirm'],
  })

  const handleFieldFocus = (field: Exclude<SignupFocusedField, null>) => {
    // blur 이후 에러가 떠도 마지막으로 입력하던 필드를 계속 바라보도록 기억합니다.
    setFocusedField(field)
    setLastFocusedField(field)
  }

  const handleSignupSubmit = ({
    email,
    email_token,
    password,
    nickname,
    profile_image,
  }: SignupFormSchema) => {
    signupMutation.mutate({
      email,
      password,
      nickname,
      profile_image,
      email_token,
    })
  }

  return (
    <div className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden">
      <SignupDropAnimationFrame
        isDropped={isDropped}
        isSuccessMotion={isSuccessMotion}
        isCompactMotion={isCompactMotion}
        eyeStatus={eyeStatus}
        prefersReducedMotion={prefersReducedMotion}
      >
        <AuthFormLayout
          methods={methods}
          title="회원가입"
          description="작심삼일 말고, 작심며칠! 오늘 부터 꾸준함을 만들어보세요"
          onSubmit={methods.handleSubmit(handleSignupSubmit)}
        >
          <SignupField
            name="nickname"
            label="닉네임"
            control={control}
            type="text"
            placeholder="닉네임을 입력해주세요"
            onFocus={() => handleFieldFocus('nickname')}
            onBlur={() => setFocusedField(null)}
          >
            <Button
              className={cn(
                'py-1 min-w-17 px-0 bg-transparent hover:text-text-primary disabled:bg-transparent disabled:text-text-muted',
                nicknameCheck.isChecked && 'text-text-primary'
              )}
              size={'sm'}
              variant="outline"
              disabled={nicknameCheck.isPending}
              onClick={nicknameCheck.check}
            >
              {nicknameCheck.isPending ? (
                <LoaderCircle size={14} className="animate-spin" />
              ) : nicknameCheck.isChecked ? (
                '사용가능'
              ) : (
                '중복확인'
              )}
            </Button>
          </SignupField>

          <SignupField
            name="email"
            label="이메일"
            control={control}
            type="email"
            placeholder="이메일을 입력해주세요"
            onFocus={() => handleFieldFocus('email')}
            onBlur={() => setFocusedField(null)}
          >
            <Button
              className={cn(
                'py-1 min-w-17 px-0 bg-transparent hover:text-text-primary disabled:bg-transparent disabled:text-text-muted',
                emailVerification.isVerified && 'text-white'
              )}
              size={'sm'}
              variant="outline"
              disabled={emailVerification.isSending}
              onClick={emailVerification.send}
            >
              {emailVerification.isSending ? (
                <LoaderCircle size={14} className="animate-spin" />
              ) : emailVerification.isVerified ? (
                '인증완료'
              ) : emailVerification.isSent ? (
                '재전송'
              ) : (
                '인증'
              )}
            </Button>
          </SignupField>

          {emailVerification.isCodeFieldOpen ? (
            <SignupField
              name="code"
              label="인증번호"
              control={control}
              type="text"
              placeholder="인증번호를 입력해주세요"
              onFocus={() => handleFieldFocus('code')}
              onBlur={() => setFocusedField(null)}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs text-primary-500">
                  {emailVerification.timerText}
                </span>
                <Button
                  type="button"
                  className="py-1 min-w-17 px-0 bg-transparent hover:text-white disabled:bg-transparent disabled:text-white"
                  size={'sm'}
                  variant="outline"
                  disabled={emailVerification.isVerifying}
                  onClick={emailVerification.verify}
                >
                  {emailVerification.isVerifying ? (
                    <LoaderCircle size={14} className="animate-spin" />
                  ) : (
                    '확인'
                  )}
                </Button>
              </div>
            </SignupField>
          ) : null}

          <SignupField
            name="password"
            label="비밀번호"
            control={control}
            actionClassName="pb-0"
            type={passwordVisibility.inputType}
            placeholder="비밀번호를 입력해주세요"
            onFocus={() => handleFieldFocus('password')}
            onBlur={() => setFocusedField(null)}
          >
            <PasswordVisibilityButton
              isVisible={passwordVisibility.isVisible}
              onToggle={passwordVisibility.toggleVisibility}
            />
          </SignupField>

          <SignupField
            name="passwordConfirm"
            label="비밀번호 확인"
            control={control}
            actionClassName="pb-0"
            type={passwordConfirmVisibility.inputType}
            placeholder="비밀번호 재입력해주세요"
            onFocus={() => handleFieldFocus('passwordConfirm')}
            onBlur={() => setFocusedField(null)}
          >
            <PasswordVisibilityButton
              isVisible={passwordConfirmVisibility.isVisible}
              onToggle={passwordConfirmVisibility.toggleVisibility}
            />
          </SignupField>

          <ProfileImageSelectField
            value={profileImageUrl}
            onChange={(value) =>
              setValue('profile_image', value, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          />

          <div className="flex flex-col gap-3">
            <Button
              variant={'neutral'}
              type="submit"
              rounded={'lg'}
              className={cn(
                'min-h-13 w-full py-3 text-xl text-white',
                isSuccessMotion
                  ? 'bg-black text-white disabled:bg-black disabled:text-white'
                  : signupMutation.isPending
                    ? 'disabled:bg-black disabled:text-white'
                    : canSignup
                      ? 'bg-black hover:bg-[#121212]'
                      : 'disabled:bg-[#d9d9d9] disabled:text-white/60 dark:disabled:bg-black/30 dark:disabled:text-white/20'
              )}
              size="lg"
              disabled={
                !canSignup || signupMutation.isPending || isSuccessMotion
              }
            >
              {signupMutation.isPending ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                '회원가입'
              )}
            </Button>
            <p className="mt-4 flex items-center justify-center gap-3 text-sm text-text-muted">
              이미 계정이 있으신가요 ?
              <Link to="/login" className="font-medium text-primary-600">
                로그인
              </Link>
            </p>
          </div>
        </AuthFormLayout>
      </SignupDropAnimationFrame>
    </div>
  )
}
