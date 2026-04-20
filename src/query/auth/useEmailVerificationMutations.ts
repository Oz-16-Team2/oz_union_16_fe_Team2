import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import {
  authApi,
  type FieldErrorResponse,
  type SendEmailVerificationRequest,
  type SendEmailVerificationResponse,
  type VerifyEmailRequest,
  type VerifyEmailResponse,
} from '@/apis/auth'

export function useSendEmailVerificationMutation() {
  // 인증번호 발송은 사용자가 인증 버튼을 눌렀을 때만 실행합니다.
  return useMutation<
    SendEmailVerificationResponse,
    AxiosError<FieldErrorResponse>,
    SendEmailVerificationRequest
  >({
    mutationFn: authApi.sendEmailVerification,
  })
}

export function useVerifyEmailMutation() {
  // 인증번호 확인은 사용자가 확인 버튼을 눌렀을 때만 실행합니다.
  return useMutation<
    VerifyEmailResponse,
    AxiosError<FieldErrorResponse>,
    VerifyEmailRequest
  >({
    mutationFn: authApi.verifyEmail,
  })
}
