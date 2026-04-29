// Axios 인스턴스 및 인증(interceptor) 설정 파일
import axios, { type AxiosError, type AxiosRequestConfig } from 'axios'

import type { RefreshTokenResponse } from '@/apis/auth/auth.schema'
import { AUTH_ENDPOINTS } from '@/apis/auth/endpoints'
import { useAuthStore } from '@/store/authStore'

import { API_BASE_URL, MSW_BASE_URL } from './apiPath'

// 공통 API 클라이언트 생성
// - baseURL: 실제 서버 또는 MSW
// - withCredentials: refresh token 쿠키 전송을 위해 필요
export const apiClient = axios.create({
  // .env에 VITE_API_BASE_URL이 있으면 실제 API 서버를 사용하고, 없으면 MSW가 잡을 상대 경로를 사용
  baseURL: API_BASE_URL || MSW_BASE_URL,
  // 서버가 10초 안에 응답하지 않으면 요청을 실패 처리
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // refresh token을 httpOnly cookie로 주고받을 경우 쿠키를 요청에 포함
  withCredentials: true,
})

apiClient.interceptors.request.use((config) => {
  // 요청 인터셉터
  // - Zustand에 저장된 accessToken을 가져와서
  // - 모든 요청 헤더에 Authorization을 자동으로 붙여줌
  const accessToken = useAuthStore.getState().accessToken

  // accessToken이 존재할 경우에만 Authorization 헤더에 Bearer 토큰을 추가
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  // 수정된 config를 반환하여 요청에 반영
  return config
})

// 응답 인터셉터
// - 401 에러 발생 시 accessToken이 만료된 것으로 판단
// - refresh token으로 새로운 accessToken을 재발급 시도
// - 성공 시 원래 요청을 다시 실행
// - 실패 시 세션을 초기화하고 로그인 페이지로 이동
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status

    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean
    }

    // 401 처리
    if (status === 401) {
      // 이미 한 번 재시도한 요청이면 무한루프 방지
      if (originalRequest?._retry) {
        const { clearSession } = useAuthStore.getState()
        clearSession()
        window.location.href = '/login'
        return Promise.reject(error)
      }

      // 재시도 플래그 설정
      originalRequest._retry = true

      try {
        // refresh token으로 새로운 accessToken 요청
        // (axios 기본 인스턴스를 사용하여 interceptor 영향 받지 않도록 함)
        const refreshResponse = await axios.post<RefreshTokenResponse>(
          (API_BASE_URL || MSW_BASE_URL) + AUTH_ENDPOINTS.refreshToken,
          {},
          { withCredentials: true }
        )

        const newAccessToken = refreshResponse.data.access_token

        // 새 accessToken을 전역 상태(Zustand)에 저장
        const { setAccessToken } = useAuthStore.getState()
        setAccessToken(newAccessToken)

        // 실패했던 요청에 새로운 토큰을 다시 주입
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        }

        // 원래 요청을 새로운 토큰으로 재시도
        return apiClient.request(originalRequest)
      } catch (refreshError) {
        // refresh도 실패한 경우 (refresh token 만료 등)
        const { clearSession } = useAuthStore.getState()
        // 세션 초기화 (로그아웃 처리)
        clearSession()
        // 로그인 페이지로 이동
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    // 401이 아닌 에러는 그대로 반환
    return Promise.reject(error)
  }
)
