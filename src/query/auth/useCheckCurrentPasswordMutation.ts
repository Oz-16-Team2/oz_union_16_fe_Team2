import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import {
  authApi,
  type CheckCurrentPasswordRequest,
  type CheckCurrentPasswordResponse,
  type FieldErrorResponse,
} from '@/apis/auth'

type CheckCurrentPasswordAuthError = {
  error_detail: string
}

export function useCheckCurrentPasswordMutation() {
  return useMutation<
    CheckCurrentPasswordResponse,
    AxiosError<FieldErrorResponse | CheckCurrentPasswordAuthError>,
    CheckCurrentPasswordRequest
  >({
    mutationFn: authApi.checkCurrentPassword,
  })
}
