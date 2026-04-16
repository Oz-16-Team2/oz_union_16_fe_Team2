import type { ReactNode } from 'react'

import { cn } from '@/utils/cn'

/*
 * 로그인 / 회원가입 공통 레이아웃
 */

type AuthPageLayoutProps = {
  title: string
  subTitle: string
  children: ReactNode
  className?: string
}

export function AuthPageLayout({
  title,
  subTitle,
  children,
  className,
}: AuthPageLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div
        className={cn('w-full max-w-sm flex flex-col px-3 gap-8', className)}
      >
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-center text-2xl font-semibold">{title}</h1>
          <span className="text-sm text-text-muted">{subTitle}</span>
        </div>
        {children}
      </div>
    </div>
  )
}
