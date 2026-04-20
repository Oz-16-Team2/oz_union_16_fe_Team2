import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { Link } from 'react-router'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'

import { Button } from '@/components/common/ui'
import {
  AuthForm,
  AuthPageLayout,
  ProfileImageSelectField,
} from '@/features/auth'
import { useEmailVerification } from '@/features/auth/signup/hook/useEmailVerification'
import { useNicknameCheck } from '@/features/auth/signup/hook/useNicknameCheck'
import { useSignupMutation } from '@/query/auth'
import {
  type SignupFormSchema,
  signupFormSchema,
} from '@/schemas/auth/authForm.schema'
import { cn } from '@/utils/cn'

export function SignupPage() {
  const methods = useForm<SignupFormSchema>({
    mode: 'onChange',
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: '',
      code: '',
      nickname: '',
      password: '',
      passwordConfirm: '',
      profile_image_url: '',
      email_token: '',
    },
  })

  const {
    control,
    formState: { isValid, isDirty },
    setError,
    setValue,
  } = methods
  const profileImageUrl = useWatch({ control, name: 'profile_image_url' })

  const SignupField = AuthForm.FormField<SignupFormSchema>

  const nicknameCheck = useNicknameCheck(methods)
  const emailVerification = useEmailVerification(methods)
  const signupMutation = useSignupMutation(setError)
  const canSignup =
    isDirty &&
    isValid &&
    nicknameCheck.isChecked &&
    emailVerification.isVerified

  const handleSignupSubmit = ({
    email_token,
    password,
    nickname,
    profile_image_url,
  }: SignupFormSchema) => {
    signupMutation.mutate({
      password,
      nickname,
      profile_image_url,
      email_token,
    })
  }

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
            <Button
              className={cn(
                'h-7 min-w-20 bg-transparent hover:text-white disabled:bg-transparent disabled:text-white',
                nicknameCheck.isChecked && 'text-white'
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
          >
            <Button
              className={cn(
                'h-7 min-w-20 bg-transparent hover:text-white disabled:bg-transparent disabled:text-white',
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
            >
              <div className="flex items-center gap-2">
                <span className="text-xs text-primary-500">
                  {emailVerification.timerText}
                </span>
                <Button
                  type="button"
                  className="h-7 min-w-16 bg-transparent hover:text-white disabled:bg-transparent disabled:text-white"
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
            type="password"
            placeholder="비밀번호를 입력해주세요"
          />

          <SignupField
            name="passwordConfirm"
            label="비밀번호 확인"
            control={control}
            type="password"
            placeholder="비밀번호 재입력해주세요"
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
              variant={'neutral'}
              type="submit"
              rounded={'lg'}
              className={cn(
                'min-h-13 text-xl py-3 w-full',
                signupMutation.isPending
                  ? 'disabled:bg-black disabled:text-white'
                  : canSignup
                    ? 'bg-black hover:bg-[#121212]'
                    : 'disabled:bg-black/30 disabled:text-white/20'
              )}
              size="lg"
              disabled={!canSignup || signupMutation.isPending}
            >
              {signupMutation.isPending ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                '회원가입'
              )}
            </Button>
            <p className="flex justify-center items-center gap-3 mt-2 text-sm text-text-muted">
              이미 계정이 있으신가요 ?
              <Link to="/login" className="font-medium text-primary-600">
                로그인
              </Link>
            </p>
          </div>
        </AuthForm>
      </FormProvider>
    </AuthPageLayout>
  )
}
