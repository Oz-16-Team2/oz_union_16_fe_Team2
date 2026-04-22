import type { UseFormSetError } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import {
  authApi,
  type FieldErrorResponse,
  type SignupRequest,
  type SignupResponse,
} from '@/apis/auth'
import { useToast } from '@/components/common/ui'
import type { SignupFormSchema } from '@/schemas/auth/authForm.schema'

export function useSignupMutation(setError: UseFormSetError<SignupFormSchema>) {
  const toast = useToast()
  const navigate = useNavigate()

  // 회원가입 제출은 사용자가 회원가입 버튼을 눌렀을 때만 실행합니다.
  return useMutation<
    SignupResponse,
    AxiosError<FieldErrorResponse>,
    SignupRequest
  >({
    mutationFn: authApi.signup,
    onSuccess: (data) => {
      // 성공 토스트가 사라진 뒤 로그인 페이지로 이동하도록 짧은 지연을 둡니다.
      toast.success(data.detail, { duration: 2000 })
      window.setTimeout(() => {
        navigate('/login')
      }, 2000)
    },
    onError: (error) => {
      const errorDetail = error.response?.data?.error_detail

      // 서버에서 내려준 회원가입 필드 에러를 폼 에러로 연결합니다.
      if (errorDetail?.email?.[0]) {
        setError('email', {
          type: 'server',
          message: errorDetail.email[0],
        })
      }

      if (errorDetail?.nickname?.[0]) {
        setError('nickname', {
          type: 'server',
          message: errorDetail.nickname[0],
        })
      }

      if (errorDetail?.email_token?.[0]) {
        setError('code', {
          type: 'server',
          message: errorDetail.email_token[0],
        })
      }

      if (!errorDetail) {
        setError('nickname', {
          type: 'server',
          message: '회원가입에 실패했습니다.',
        })
      }
    },
  })
}
