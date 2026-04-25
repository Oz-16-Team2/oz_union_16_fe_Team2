import { useNavigate } from 'react-router'

import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import {
  authApi,
  type FieldErrorResponse,
  type LogoutResponse,
} from '@/apis/auth'
import { useToast } from '@/components/common/ui'
import { useAuthStore } from '@/store/authStore'

export function useLogoutMutation() {
  const navigate = useNavigate()
  const toast = useToast()
  const clearSession = useAuthStore((state) => state.clearSession)

  return useMutation<LogoutResponse, AxiosError<FieldErrorResponse>, void>({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // 서버 로그아웃이 끝난 뒤에만 로컬 세션을 정리해서
      // refresh token 쿠키와 프론트 상태가 서로 다른 상태로 남지 않게 맞춥니다.
      clearSession()
      navigate('/')
    },
    onError: () => {
      toast.error('로그아웃에 실패했습니다.')
    },
  })
}
