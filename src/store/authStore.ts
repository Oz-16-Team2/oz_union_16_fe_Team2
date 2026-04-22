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
  clearSession: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      setSession: (accessToken, user) => set({ accessToken, user }),
      clearSession: () => set({ accessToken: null, user: null }),
    }),
    {
      name: 'auth-session',
    }
  )
)
