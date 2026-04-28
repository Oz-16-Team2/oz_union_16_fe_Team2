import axios, { type AxiosError, type AxiosRequestConfig } from 'axios'

import { AUTH_ENDPOINTS } from '@/apis/auth/endpoints'
import { useAuthStore } from '@/store/authStore'

import { API_BASE_URL, MSW_BASE_URL } from './apiPath'

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
  // Zustand에 저장된 accessToken을 가져옴
  const accessToken = useAuthStore.getState().accessToken

  // accessToken이 존재할 경우에만 Authorization 헤더에 Bearer 토큰을 추가
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  // 수정된 config를 반환하여 요청에 반영
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status
    const requestUrl = error.config?.url ?? ''
    const isLogoutRequest = requestUrl.includes(AUTH_ENDPOINTS.logout)

    // 401: 인증 실패 (accessToken 만료 or 유효하지 않음)
    // → refresh token으로 accessToken 재발급 시도
    if (status === 401 && !isLogoutRequest) {
      //무한루프 방지용
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean
      }
      if (originalRequest?._retry) {
        return Promise.reject(error)
      }
      originalRequest._retry = true

      try {
        // 1. refresh token을 이용해 새로운 accessToken 요청 (쿠키 기반)
        await apiClient.post(
          AUTH_ENDPOINTS.refreshToken,
          {},
          {
            withCredentials: true,
          }
        )
        // 2. refresh 성공 시, 원래 요청을 다시 실행
        return apiClient.request(error.config!)
      } catch {
        // 3. refresh 실패 시 (세션 만료 등), 로그아웃 처리
        const { clearSession } = useAuthStore.getState()
        clearSession()
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)
