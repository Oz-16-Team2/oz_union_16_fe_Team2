import type { UseFormSetError } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import {
  authApi,
  type FieldErrorResponse,
  type LoginRequest,
  type LoginResponse,
  type LoginUnauthorizedResponse,
} from '@/apis/auth'
import { yellowCharacterImage } from '@/assets/images'
import type { LoginFormSchema } from '@/schemas/auth/authForm.schema'
import { useAuthStore } from '@/store/authStore'

type UseLoginMutationOptions = {
  onSuccess?: () => void
}

export function useLoginMutation(
  setError: UseFormSetError<LoginFormSchema>,
  options?: UseLoginMutationOptions
) {
  const navigate = useNavigate()
  const setSession = useAuthStore((state) => state.setSession)

  // 로그인은 사용자가 로그인 버튼을 눌렀을 때만 실행되는 동작이라 useMutation으로 관리합니다.
  return useMutation<
    LoginResponse,
    AxiosError<FieldErrorResponse | LoginUnauthorizedResponse>,
    LoginRequest
  >({
    mutationFn: authApi.login,
    onSuccess: (data, variables) => {
      // 현재 로그인 응답에는 access_token만 있어서 닉네임/프로필은 임시값으로 표시합니다.
      // 추후 내 정보 API가 붙으면 로그인 직후 사용자 정보를 조회해 이 값을 교체하면 됩니다.
      setSession(data.access_token, {
        nickname: variables.email.split('@')[0],
        profileImageUrl: yellowCharacterImage,
      })

      if (options?.onSuccess) {
        options.onSuccess()
        return
      }

      navigate('/')
    },
    onError: (error) => {
      const errorDetail = error.response?.data?.error_detail

      // 로그인 실패 응답이 문자열이면 이메일/비밀번호 조합 실패로 보고 비밀번호 필드에 표시합니다.
      if (typeof errorDetail === 'string') {
        setError('password', {
          type: 'server',
          message: errorDetail,
        })
        return
      }

      // 서버에서 field error 형태로 내려준 경우 폼 필드 에러로 연결합니다.
      if (errorDetail?.email?.[0]) {
        setError('email', {
          type: 'server',
          message: errorDetail.email[0],
        })
      }

      if (errorDetail?.password?.[0]) {
        setError('password', {
          type: 'server',
          message: errorDetail.password[0],
        })
      }

      if (!errorDetail) {
        setError('password', {
          type: 'server',
          message: '로그인에 실패했습니다.',
        })
      }
    },
  })
}
