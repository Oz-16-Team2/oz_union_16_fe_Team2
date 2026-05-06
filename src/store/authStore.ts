import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AuthUser = {
  id?: number // 로그인 유저 식별용 (댓글 내/타 구분)
  nickname: string
  profileImageUrl: string
  authProvider?: string
  isSocial?: boolean
}

// 라우터 가드가 세션 복구 여부를 판단하기 위한 상태입니다.
// checking 중에는 보호 페이지를 렌더링하지 않고 로딩만 보여줍니다.
type AuthStatus = 'idle' | 'checking' | 'restored'

type AuthState = {
  accessToken: string | null
  user: AuthUser | null
  // 앱 시작 시 저장된 토큰/쿠키로 로그인 상태를 확인하는 진행 상태
  authStatus: AuthStatus
  setSession: (accessToken: string, user: AuthUser) => void
  setAccessToken: (accessToken: string) => void
  // 세션 복구 훅에서 checking/restored 상태를 업데이트할 때 사용합니다.
  setAuthStatus: (status: AuthStatus) => void
  updateUser: (user: Partial<AuthUser>) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      // idle: 아직 확인 전, checking: 확인 중, restored: 확인 완료
      authStatus: 'idle',
      //로그인 성공했을때
      setSession: (accessToken, user) =>
        set({ accessToken, user, authStatus: 'restored' }),
      //토큰 갱신할때 (reFresh)
      setAccessToken: (accessToken) =>
        set((state) => ({
          ...state,
          accessToken,
        })),
      setAuthStatus: (authStatus) => set({ authStatus }),
      updateUser: (user) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...user } : null,
        })),

      //로그아웃시
      clearSession: () =>
        set({ accessToken: null, user: null, authStatus: 'restored' }),
    }),
    {
      name: 'auth-session',
      // localStorage에는 실제 세션 정보만 저장합니다.
      // authStatus는 앱 실행 때마다 다시 확인해야 하는 임시 상태라 저장하지 않습니다.
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
      }),
    }
  )
)
