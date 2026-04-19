import axios, { type AxiosError } from 'axios'

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
  // TODO: 로그인 API 연결 후 access token 저장 위치가 확정되면 Authorization 헤더를 추가

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // TODO: refresh token 정책 확정 후 구현
    // const originalRequest = error.config
    // if (error.response?.status === 401 && !originalRequest._retry) {
    //   return handle401Error(originalRequest)
    // }

    // TODO: 권한 모달 정책 확정 후 구현
    // if (error.response?.status === 403) {
    //   useModalStore.getState().openUnauthorized()
    // }

    throw error
  }
)
