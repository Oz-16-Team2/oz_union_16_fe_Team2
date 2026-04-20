import { useEffect, useRef, useState } from 'react'
import { type UseFormReturn, useWatch } from 'react-hook-form'

import {
  useSendEmailVerificationMutation,
  useVerifyEmailMutation,
} from '@/query/auth'
import type { SignupFormSchema } from '@/schemas/auth/authForm.schema'

const EMAIL_VERIFICATION_SECONDS = 5 * 60
const EMPTY_EMAIL_AUTH = {
  emailToken: '',
  sentEmail: '',
  verifiedEmail: '',
}

const formatTimer = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainSeconds = seconds % 60

  return `${minutes}:${String(remainSeconds).padStart(2, '0')}`
}

export function useEmailVerification(methods: UseFormReturn<SignupFormSchema>) {
  const [timer, setTimer] = useState(0)
  const [emailAuth, setEmailAuth] = useState(EMPTY_EMAIL_AUTH)
  const isFirstEmailRender = useRef(true)

  const { clearErrors, control, getValues, setError, setValue, trigger } =
    methods
  const email = useWatch({ control, name: 'email' })
  const sendMutation = useSendEmailVerificationMutation()
  const verifyMutation = useVerifyEmailMutation()

  const isSent = sendMutation.isSuccess && emailAuth.sentEmail === email
  const isVerified =
    verifyMutation.isSuccess && emailAuth.verifiedEmail === email
  const isCodeFieldOpen = isSent && !isVerified && timer > 0

  // 이메일을 수정하면 기존 인증 상태와 입력된 인증번호를 초기화합니다.
  useEffect(() => {
    if (isFirstEmailRender.current) {
      isFirstEmailRender.current = false
      return
    }

    clearErrors('email')
    clearErrors('code')
    setValue('code', '')
    setValue('email_token', '', { shouldValidate: true })
    // 이전 이메일로 받은 인증 토큰이 새 이메일에 재사용되지 않도록 지웁니다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEmailAuth(EMPTY_EMAIL_AUTH)
  }, [clearErrors, email, setValue])

  // 인증번호 발송 후 남은 시간을 1초마다 줄입니다.
  useEffect(() => {
    if (!isSent || timer <= 0 || isVerified) return

    const timerId = window.setInterval(() => {
      setTimer((seconds) => {
        const nextSeconds = seconds - 1

        if (nextSeconds <= 0) {
          // 인증 시간이 끝나면 코드 입력 필드를 닫고 인증 버튼 상태로 되돌립니다.
          sendMutation.reset()
          verifyMutation.reset()
          setValue('code', '')
          setValue('email_token', '', { shouldValidate: true })
          setEmailAuth(EMPTY_EMAIL_AUTH)
          return 0
        }

        return nextSeconds
      })
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [isSent, isVerified, sendMutation, setValue, timer, verifyMutation])

  const send = async () => {
    if (isVerified) return

    // 이메일 형식이 유효할 때만 인증번호 발송 API를 호출합니다.
    const isEmailValid = await trigger('email')

    if (!isEmailValid) return

    sendMutation.mutate(
      { email: getValues('email') },
      {
        onSuccess: () => {
          clearErrors('email')
          clearErrors('code')
          verifyMutation.reset()
          setValue('code', '')
          setValue('email_token', '', { shouldValidate: true })
          setEmailAuth({
            ...EMPTY_EMAIL_AUTH,
            sentEmail: getValues('email'),
          })
          setTimer(EMAIL_VERIFICATION_SECONDS)
        },
        onError: (error) => {
          setError('email', {
            type: 'server',
            message:
              error.response?.data?.error_detail.email?.[0] ??
              '인증번호 발송에 실패했습니다.',
          })
        },
      }
    )
  }

  const verify = async () => {
    // 제한 시간이 지나면 확인 요청을 보내지 않고 재전송을 유도합니다.
    if (timer <= 0) {
      setError('code', {
        type: 'manual',
        message: '인증 시간이 만료되었습니다. 다시 보내주세요.',
      })
      return
    }

    const code = getValues('code')?.trim()

    if (!code) {
      setError('code', {
        type: 'manual',
        message: '인증번호를 입력해주세요',
      })
      return
    }

    const isCodeValid = await trigger('code')

    if (!isCodeValid) return

    verifyMutation.mutate(
      { email: getValues('email'), code },
      {
        onSuccess: (data) => {
          clearErrors('code')
          // 인증 성공 후 회원가입 요청에 사용할 1회용 이메일 토큰을 보관합니다.
          setValue('email_token', data.email_token, { shouldValidate: true })
          setEmailAuth({
            emailToken: data.email_token,
            sentEmail: getValues('email'),
            verifiedEmail: getValues('email'),
          })
          setTimer(0)
        },
        onError: (error) => {
          setError('code', {
            type: 'server',
            message:
              error.response?.data?.error_detail.code?.[0] ??
              '인증번호를 다시 확인해주세요.',
          })
        },
      }
    )
  }

  return {
    emailToken: isVerified ? emailAuth.emailToken : '',
    isCodeFieldOpen,
    isSending: sendMutation.isPending,
    isSent,
    isVerified,
    isVerifying: verifyMutation.isPending,
    send,
    timerText: formatTimer(isSent ? timer : 0),
    verify,
  }
}
