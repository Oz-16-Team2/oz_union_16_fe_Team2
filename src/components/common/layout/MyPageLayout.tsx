import { Outlet } from 'react-router'

import { Bookmark, NotebookText } from 'lucide-react'

import { Footer, Header } from '@/components/common/layout'
import { cn } from '@/utils/cn'

import { Button } from '../ui'

const SIDEBAR_ITEMS = [
  { label: '저장한 목표', Icon: Bookmark, isActive: false },
  { label: '내가 쓴 게시글', Icon: NotebookText, isActive: false },
] as const

function MyPageSidebar() {
  return (
    <aside className="fixed inset-x-0 bottom-0 border-t border-border-default bg-surface md:static md:inset-auto md:min-h-dvh md:border-r md:border-t-0">
      <nav
        className="flex items-center flex-col justify-cneter mt-24 gap-4"
        aria-label="마이페이지 메뉴"
      >
        {SIDEBAR_ITEMS.map(({ label, Icon, isActive }) => (
          <Button
            key={label}
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'text-text-primary bg-transparent hover:bg-transparent transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-primary-600',
              isActive && 'text-primary-600'
            )}
          >
            <Icon className="size-7" strokeWidth={2} aria-hidden="true" />
          </Button>
        ))}
      </nav>
    </aside>
  )
}

export function MyPageLayout() {
  return (
    <div className="grid min-h-dvh bg-background md:grid-cols-[80px_1fr]">
      <MyPageSidebar />

      <div className="flex min-h-dvh min-w-0 flex-col pb-16 md:pb-0">
        <Header />

        <main className="mx-auto py-7.5 w-full max-w-7xl flex-1 px-8">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  )
}
