import { authApi } from '@/apis/auth'
import { useAuthStore } from '@/store/authStore'

export type AuthSessionUser = {
  id?: number // 로그인 유저 식별용 (댓글 내/타 구분에 사용)
  nickname: string
  profileImageUrl: string
  authProvider?: string
  isSocial?: boolean
}

export type AuthSession = {
  accessToken: string
  user: AuthSessionUser
}

type BuildAuthSessionOptions = {
  authProvider?: string
  isSocial?: boolean
}

export const buildAuthSession = async (
  options: BuildAuthSessionOptions = {}
): Promise<AuthSession> => {
  const meResponse = await authApi.me()
  const accessToken = useAuthStore.getState().accessToken

  if (!accessToken) {
    throw new Error('accessToken이 없습니다.')
  }

  return {
    accessToken,
    user: {
      id: meResponse.id, // /accounts/me 응답의 id를 세션에 저장
      nickname: meResponse.nickname,
      profileImageUrl: meResponse.profile_image_url,
      authProvider:
        meResponse.provider ??
        meResponse.login_type ??
        meResponse.auth_provider ??
        options.authProvider,
      isSocial: meResponse.is_social ?? options.isSocial,
    },
  }
}
