import type { UseFormSetError } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError, isAxiosError } from 'axios'

import {
  authApi,
  type FieldErrorResponse,
  type LoginRequest,
  type LoginUnauthorizedResponse,
} from '@/apis/auth'
import {
  type AuthSession,
  buildAuthSession,
} from '@/features/auth/utils/buildAuthSession'
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
  const queryClient = useQueryClient()
  const setSession = useAuthStore((state) => state.setSession)

  // 로그인은 성공 직후 /me 조회까지 끝내서 세션을 완성합니다.
  return useMutation<
    AuthSession,
    AxiosError<FieldErrorResponse | LoginUnauthorizedResponse> | Error,
    LoginRequest
  >({
    mutationFn: async (payload) => {
      const loginResponse = await authApi.login(payload)
      // 먼저 accessToken을 store에 저장 (interceptor가 사용)
      const { setAccessToken } = useAuthStore.getState()
      setAccessToken(loginResponse.access_token)
      // 그 다음 /me 호출 포함된 세션 생성
      return buildAuthSession({ authProvider: 'email', isSocial: false })
    },
    onSuccess: (data) => {
      setSession(data.accessToken, data.user)
      queryClient.removeQueries()

      if (options?.onSuccess) {
        options.onSuccess()
        return
      }

      navigate('/')
    },
    onError: (error) => {
      if (!isAxiosError(error)) {
        setError('password', {
          type: 'server',
          message: '유저 정보를 불러오지 못했습니다. 다시 시도해주세요.',
        })
        return
      }

      const errorDetail = error.response?.data?.error_detail

      // 로그인 실패 응답이 문자열이면 이메일/비밀번호 조합 실패로 봅니다.
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
