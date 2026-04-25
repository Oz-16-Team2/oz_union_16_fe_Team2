import axios, { type AxiosError } from 'axios'

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

    // 401: 토큰 만료 or 인증 실패
    if (status === 401) {
      const { clearSession } = useAuthStore.getState()

      // 1. 세션 초기화 (토큰 제거)
      clearSession()

      // 2. 로그인 페이지로 이동
      window.location.href = '/login'
    }

    // 403: 권한 없음
    if (status === 403) {
      console.warn('권한이 없습니다.')
    }

    return Promise.reject(error)
  }
)
