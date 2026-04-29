/*
 * TODO: 페이지 구조 확정 후 헤더/푸터 노출 조건과 공통 레이아웃 범위 정리
 */

import { Outlet } from 'react-router'

import { Footer, Header } from '@/components/common/layout'

export function RootLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />

      <div className="max-w-300 mx-auto w-full flex-1 p-8">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
