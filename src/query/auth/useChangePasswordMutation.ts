import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import {
  authApi,
  type ChangePasswordRequest,
  type ChangePasswordResponse,
  type FieldErrorResponse,
} from '@/apis/auth'

type ChangePasswordAuthError = {
  error_detail: string
}

export function useChangePasswordMutation() {
  return useMutation<
    ChangePasswordResponse,
    AxiosError<FieldErrorResponse | ChangePasswordAuthError>,
    ChangePasswordRequest
  >({
    // 비밀번호 변경 버튼 클릭 이후에만 실행되는 사용자 액션성 요청입니다.
    mutationFn: authApi.changePassword,
  })
}
