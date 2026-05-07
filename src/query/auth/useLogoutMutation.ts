import { useNavigate } from 'react-router'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import {
  authApi,
  type FieldErrorResponse,
  type LogoutResponse,
} from '@/apis/auth'
import { useToast } from '@/components/common/ui'
import { useAuthStore } from '@/store/authStore'

/**
 * 로그아웃 mutation 훅
 *
 * - 로그아웃 API 호출
 * - 성공 시 세션 초기화 및 홈으로 리다이렉트
 * - 토큰 만료(401) 상황에서도 강제 로그아웃 처리
 * - 그 외 에러는 토스트로 안내
 */

// 로그아웃 관련 로직을 캡슐화한 커스텀 훅
export function useLogoutMutation() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const toast = useToast()
  const clearSession = useAuthStore((state) => state.clearSession)

  // 공통 로그아웃 처리
  // - store 초기화
  // - 로그인 페이지로 이동
  const finishLogout = () => {
    clearSession()
    queryClient.removeQueries()
    navigate('/')
  }

  return useMutation<LogoutResponse, AxiosError<FieldErrorResponse>, void>({
    // 로그아웃 API 호출
    mutationFn: authApi.logout,
    // 로그아웃 성공 시
    onSuccess: () => {
      finishLogout()
    },
    // 로그아웃 실패 시
    onError: (error) => {
      // 이미 인증이 만료된 상태(401)라면
      // 서버 로그아웃과 관계없이 클라이언트 세션만 정리
      if (error.response?.status === 401) {
        finishLogout()
        return
      }
      // 기타 에러는 사용자에게 안내
      toast.error('로그아웃에 실패했습니다.')
    },
  })
}
