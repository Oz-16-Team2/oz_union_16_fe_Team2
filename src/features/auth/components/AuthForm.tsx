import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/utils/cn'

type AuthFormProps = {
  className?: string
  children: ReactNode
} & ComponentProps<'form'>

/**
 * 공통 인증 폼 (로그인 / 회원가입 공통)
 * 내부 필드는 children으로 받아서 유연하게 구성
 */
export function AuthForm({ className, children, ...props }: AuthFormProps) {
  return (
    <form className={cn('space-y-8 gap-4 w-full', className)} {...props}>
      {children}
    </form>
  )
}
