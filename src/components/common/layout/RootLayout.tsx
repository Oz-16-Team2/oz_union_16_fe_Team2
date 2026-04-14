/*
 * TODO: 페이지 구조 확정 후 헤더/푸터 노출 조건과 공통 레이아웃 범위 정리
 */

import { Outlet } from 'react-router'

import { Footer, Header } from '@/components/common/layout'
import { GlobalToast } from '@/components/common/ui'

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="max-w-300 mx-auto mt-7.5 w-full flex-1 px-8">
        <Outlet />
      </div>
      <Footer />
      <GlobalToast />
    </div>
  )
}
