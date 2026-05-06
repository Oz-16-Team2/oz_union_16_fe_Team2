import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import {
  authApi,
  type ChangeNicknameRequest,
  type ChangeNicknameResponse,
  type FieldErrorResponse,
} from '@/apis/auth'

export function useChangeNicknameMutation() {
  return useMutation<
    ChangeNicknameResponse,
    AxiosError<FieldErrorResponse>,
    ChangeNicknameRequest
  >({
    mutationFn: authApi.changeNickname,
  })
}
