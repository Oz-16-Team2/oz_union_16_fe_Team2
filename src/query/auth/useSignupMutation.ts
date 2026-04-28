import type { UseFormSetError } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { useMutation } from '@tanstack/react-query'
import { type AxiosError, isAxiosError } from 'axios'

import {
  authApi,
  type FieldErrorResponse,
  type LoginUnauthorizedResponse,
  type SignupRequest,
} from '@/apis/auth'
import {
  type AuthSession,
  buildAuthSession,
} from '@/features/auth/utils/buildAuthSession'
import type { SignupFormSchema } from '@/schemas/auth/authForm.schema'
import { useAuthStore } from '@/store/authStore'

type UseSignupMutationOptions = {
  onSuccess?: () => void
}

export function useSignupMutation(
  setError: UseFormSetError<SignupFormSchema>,
  options?: UseSignupMutationOptions
) {
  const navigate = useNavigate()
  const setSession = useAuthStore((state) => state.setSession)

  // 회원가입은 성공 직후 로그인과 /me 조회까지 끝내서 세션을 완성합니다.
  return useMutation<
    AuthSession,
    AxiosError<FieldErrorResponse | LoginUnauthorizedResponse> | Error,
    SignupRequest
  >({
    mutationFn: async (payload) => {
      // 회원가입이 먼저 성공해야 다음 로그인 단계로 넘어갈 수 있습니다.
      await authApi.signup(payload)

      const loginResponse = await authApi.login({
        email: payload.email,
        password: payload.password,
      })

      const { setAccessToken } = useAuthStore.getState()
      setAccessToken(loginResponse.access_token)
      return buildAuthSession()
    },
    onSuccess: (data) => {
      setSession(data.accessToken, data.user)

      if (options?.onSuccess) {
        options.onSuccess()
        return
      }

      navigate('/')
    },
    onError: (error) => {
      if (!isAxiosError(error)) {
        setError('root', {
          type: 'server',
          message: '회원가입 후 로그인 처리에 실패했습니다.',
        })
        return
      }

      const errorDetail = error.response?.data?.error_detail

      if (typeof errorDetail === 'string') {
        setError('password', {
          type: 'server',
          message: errorDetail,
        })
        return
      }

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
    },
  })
}
