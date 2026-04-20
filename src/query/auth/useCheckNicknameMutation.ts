import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import {
  authApi,
  type CheckNicknameRequest,
  type CheckNicknameResponse,
  type FieldErrorResponse,
} from '@/apis/auth'

export function useCheckNicknameMutation() {
  // 중복확인 버튼 클릭처럼 사용자가 직접 실행하는 요청은 useMutation으로 처리합니다.
  return useMutation<
    CheckNicknameResponse,
    AxiosError<FieldErrorResponse>,
    CheckNicknameRequest
  >({
    mutationFn: authApi.checkNickname,
  })
}
