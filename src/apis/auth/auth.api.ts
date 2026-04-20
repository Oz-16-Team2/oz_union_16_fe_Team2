import { apiClient } from '@/apis/apiClient'

import type {
  CheckNicknameRequest,
  CheckNicknameResponse,
  SendEmailVerificationRequest,
  SendEmailVerificationResponse,
  SignupRequest,
  SignupResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from './auth.schema'
import { AUTH_ENDPOINTS } from './endpoints'

export const authApi = {
  signup: async (payload: SignupRequest) => {
    const { data } = await apiClient.post<SignupResponse>(
      AUTH_ENDPOINTS.signup,
      payload
    )

    return data
  },

  sendEmailVerification: async ({ email }: SendEmailVerificationRequest) => {
    const { data } = await apiClient.post<SendEmailVerificationResponse>(
      AUTH_ENDPOINTS.sendEmailVerification,
      { email }
    )

    return data
  },

  verifyEmail: async ({ email, code }: VerifyEmailRequest) => {
    const { data } = await apiClient.get<VerifyEmailResponse>(
      AUTH_ENDPOINTS.verifyEmail,
      {
        params: { email, code },
      }
    )

    return data
  },

  checkNickname: async ({ nickname }: CheckNicknameRequest) => {
    const { data } = await apiClient.get<CheckNicknameResponse>(
      AUTH_ENDPOINTS.checkNickname,
      {
        params: { nickname },
      }
    )

    return data
  },
} as const
