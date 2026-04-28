import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthUser = {
  nickname: string
  profileImageUrl: string
}

type AuthState = {
  accessToken: string | null
  user: AuthUser | null
  setSession: (accessToken: string, user: AuthUser) => void
  setAccessToken: (accessToken: string) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      //로그인 성공했을때
      setSession: (accessToken, user) => set({ accessToken, user }),
      //토큰 갱신할때 (reFresh)
      setAccessToken: (accessToken) =>
        set((state) => ({
          ...state,
          accessToken,
        })),
      //로그아웃시
      clearSession: () => set({ accessToken: null, user: null }),
    }),
    {
      name: 'auth-session',
    }
  )
)
