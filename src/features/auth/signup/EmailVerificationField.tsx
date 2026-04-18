import { useEffect, useState } from 'react'
import {
  type Control,
  type FieldErrors,
  type UseFormClearErrors,
  type UseFormRegister,
  type UseFormSetError,
  useWatch,
} from 'react-hook-form'

import { Button } from '@/components/common/ui'
import type { SignupSchema } from '@/schemas/auth/signup'

import { FormField } from '../FormField'

// API 연동 전까지 사용하는 임시 인증번호
const VERIFICATION_CODE = '123456'
const VERIFICATION_SECONDS = 300
const INITIAL_STATUS = 'idle'

type EmailVerificationFieldProps = {
  control: Control<SignupSchema>
  errors: FieldErrors<SignupSchema>
  register: UseFormRegister<SignupSchema>
  setError?: UseFormSetError<SignupSchema>
  clearErrors?: UseFormClearErrors<SignupSchema>
}

type VerificationStatus = 'idle' | 'sent' | 'expired' | 'success'

// 300초를 5:00 형식으로 보여주기 위한 표시용 함수
function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const restSeconds = seconds % 60

  return `${minutes}:${restSeconds.toString().padStart(2, '0')}`
}

export function EmailVerificationField({
  control,
  errors,
  register,
}: EmailVerificationFieldProps) {
  const [status, setStatus] = useState<VerificationStatus>(INITIAL_STATUS)
  const [seconds, setSeconds] = useState(VERIFICATION_SECONDS)
  const [error, setError] = useState('')

  // RHF에 등록된 email, email_token 값을 버튼 상태 계산에 사용
  const email = useWatch({ control, name: 'email' })?.trim() ?? ''
  const token = useWatch({ control, name: 'email_token' })?.trim() ?? ''
  const isEmailFilled = email.length > 0
  const isCodeEntered = token.length > 0

  // 인증번호 발송 상태가 되면 5분 타이머를 시작
  useEffect(() => {
    if (status !== 'sent') {
      return
    }

    const timerId = window.setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          window.clearInterval(timerId)
          setStatus('expired')
          return 0
        }

        return prevSeconds - 1
      })
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [status])

  // API 연결 전 임시 발송 처리. 실제 발송은 send-email API로 대체
  const startVerification = () => {
    setError('')
    setSeconds(VERIFICATION_SECONDS)
    setStatus('sent')
  }

  // API 연결 전 임시 인증번호 검증. 실제 검증은 verify-email API로 대체
  const handleClick = () => {
    if (status === 'idle' || status === 'expired') {
      startVerification()
      return
    }

    if (token === VERIFICATION_CODE) {
      setError('')
      setStatus('success')
      return
    }

    setError('다시 입력해주세요')
  }

  const buttonText = {
    idle: '인증',
    expired: '다시 시도',
    sent: isCodeEntered ? '확인' : formatTime(seconds),
    success: '인증완료',
  }[status]

  const disabled = status === 'success' || (status === 'idle' && !isEmailFilled)

  // 발송 전에는 이메일 입력 필드, 발송 후에는 인증번호 입력 필드
  const showEmailInput = status === 'idle'

  return (
    <div className="relative">
      {showEmailInput ? (
        <FormField
          label="이메일"
          id="signup-email"
          type="email"
          placeholder="이메일을 입력해주세요"
          error={errors.email?.message}
          {...register('email')}
        />
      ) : (
        <FormField
          label="이메일"
          id="signup-email-token"
          placeholder="인증번호를 입력해주세요"
          error={error || errors.email_token?.message}
          {...register('email_token', {
            // 인증번호를 다시 입력하면 임시 에러 제거
            onChange: () => setError(''),
          })}
        />
      )}

      <Button
        type="button"
        size="sm"
        variant={status === 'success' ? 'primary' : 'outline'}
        className="absolute right-2 bottom-2 bg-transparent disabled:opacity-15"
        disabled={disabled}
        onClick={handleClick}
      >
        {buttonText}
      </Button>
    </div>
  )
}
