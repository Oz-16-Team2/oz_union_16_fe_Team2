import { Navigate, Outlet, useLocation } from 'react-router'

import { Loading } from '@/components/common/ui'
import { useAuthStore } from '@/store/authStore'

export function ProtectedRoute() {
  const location = useLocation()
  const accessToken = useAuthStore((state) => state.accessToken)
  const user = useAuthStore((state) => state.user)
  const authStatus = useAuthStore((state) => state.authStatus)
  const isAuthenticated = Boolean(accessToken && user)

  if (isAuthenticated) {
    return <Outlet />
  }

  if (authStatus !== 'restored') {
    return (
      <Loading fullScreen showLabel label="로그인 상태를 확인하고 있어요" />
    )
  }

  return <Navigate to="/login" replace state={{ from: location }} />
}
