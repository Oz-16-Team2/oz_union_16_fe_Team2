import { authApi } from '@/apis/auth'
import { useAuthStore } from '@/store/authStore'

export type AuthSessionUser = {
  id?: number // 로그인 유저 식별용 (댓글 내/타 구분에 사용)
  nickname: string
  profileImageUrl: string
}

export type AuthSession = {
  accessToken: string
  user: AuthSessionUser
}

export const buildAuthSession = async (): Promise<AuthSession> => {
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
    },
  }
}
