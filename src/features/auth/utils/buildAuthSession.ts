import { authApi } from '@/apis/auth'
import { useAuthStore } from '@/store/authStore'

export type AuthSessionUser = {
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
      nickname: meResponse.nickname,
      profileImageUrl: meResponse.profile_image_url,
    },
  }
}
