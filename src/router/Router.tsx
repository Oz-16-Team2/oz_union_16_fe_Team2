import { createBrowserRouter } from 'react-router'

import { RootLayout } from '@/components/common/layout'
import { Main, NotFoundPage } from '@/pages'

/*
 * 라우터 설정 파일
 * - 애플리케이션의 전체 페이지 경로를 정의하는 곳
 * - 각 path에 어떤 레이아웃/페이지 컴포넌트를 연결할지 관리
 * - 공통 Layout을 기준으로 하위 페이지(Main 등)를 children으로 구성
 */

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
