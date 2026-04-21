import { useNavigate } from 'react-router'

import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import {
  authApi,
  type FieldErrorResponse,
  type GoogleLoginCallbackRequest,
  type KakaoLoginCallbackRequest,
  type LoginResponse,
  type LoginUnauthorizedResponse,
  type NaverLoginCallbackRequest,
} from '@/apis/auth'
import { yellowCharacterImage } from '@/assets/images'
import { useToast } from '@/components/common/ui'
import { useAuthStore } from '@/store/authStore'

type SocialLoginVariables =
  | {
      provider: 'kakao'
      payload: KakaoLoginCallbackRequest
    }
  | {
      provider: 'naver'
      payload: NaverLoginCallbackRequest
    }
  | {
      provider: 'google'
      payload: GoogleLoginCallbackRequest
    }

export function useSocialLoginMutation() {
  const toast = useToast()
  const navigate = useNavigate()
  const setSession = useAuthStore((state) => state.setSession)

  // 현재는 OAuth redirect가 아니라 MSW callback endpoint를 직접 호출하는 임시 흐름입니다.
  // 추후 실제 소셜 로그인 API가 붙으면 로그인 시작 URL 이동 또는 callback 페이지 처리로 교체될 자리입니다.
  return useMutation<
    LoginResponse,
    AxiosError<FieldErrorResponse | LoginUnauthorizedResponse>,
    SocialLoginVariables
  >({
    mutationFn: ({ provider, payload }) =>
      authApi.socialLoginCallback(provider, payload),
    onSuccess: (data, variables) => {
      // 현재 소셜 로그인 응답에는 access_token만 있어서 닉네임/프로필은 임시값으로 표시합니다.
      // 추후 내 정보 API가 붙으면 로그인 직후 사용자 정보를 조회해 이 값을 교체하면 됩니다.
      setSession(data.access_token, {
        nickname: `${variables.provider} 사용자`,
        profileImageUrl: yellowCharacterImage,
      })
      navigate('/')
    },
    onError: () => {
      toast.error('소셜 로그인에 실패했습니다.')
    },
  })
}
