import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router'

import { RootLayout } from '@/components/common/layout'
import { LoginPageSkeleton, SignupPageSkeleton } from '@/features/auth'
import {
  BookmarkedGoalsPage,
  MainPage,
  MyPage,
  MyPostsPage,
  NotFoundPage,
  PostCreatePage,
  PostEditPage,
} from '@/pages'
import { PostDetailPage } from '@/pages/PostDetailPage'
import { LoginPage, SignupPage } from '@/router/route.lazy'

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
        element: <MainPage />,
      },
      {
        path: 'post/create',
        element: <PostCreatePage />,
      },
      {
        path: 'post/:id/edit',
        element: <PostEditPage />,
      },
      {
        path: 'mypage',
        element: <MyPage />,
      },
      {
        path: 'mypage/bookmarks',
        element: <BookmarkedGoalsPage />,
      },
      {
        path: 'mypage/posts',
        element: <MyPostsPage />,
      },

      {
        path: 'post/:postId',
        element: <PostDetailPage />,
      },
    ],
  },
  {
    path: '/login',
    // 로그인 페이지는 lazy 로딩으로 분리하고
    // 로딩 중에는 auth 전용 스켈레톤을 보여줍니다.
    element: (
      <Suspense fallback={<LoginPageSkeleton />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: '/signup',
    element: (
      <Suspense fallback={<SignupPageSkeleton />}>
        <SignupPage />
      </Suspense>
    ),
  },
  {
    path: '/not-found',
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
