import { cn } from '@/utils/cn'

type AuthPageSkeletonProps = {
  variant: 'login' | 'signup'
}

function SkeletonBox({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'animate-pulse rounded-md bg-gray-200 dark:bg-gray-700',
        className
      )}
    />
  )
}

function AuthFieldSkeleton({ hasAction = false }: { hasAction?: boolean }) {
  return (
    <div className="grid grid-cols-[26%_1fr] items-start gap-y-2">
      <SkeletonBox className="mt-3 h-4 w-12" />
      <div className="space-y-2">
        <div className="relative">
          <SkeletonBox className="h-13.5 w-full rounded-xl" />
          {hasAction ? (
            <SkeletonBox className="absolute right-3 top-1/2 h-7 w-17 -translate-y-1/2 rounded-md" />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export function AuthPageSkeleton({ variant }: AuthPageSkeletonProps) {
  const isSignup = variant === 'signup'

  return (
    <div className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/6 to-transparent dark:from-white/4 dark:to-transparent" />

      <div className="relative w-full max-w-[min(100%,32rem)] px-5 py-6 sm:space-y-10 sm:rounded-4xl sm:border sm:border-border-default sm:bg-white/25 sm:px-12 sm:py-12 sm:shadow-2xl sm:dark:bg-neutral-900/30 sm:backdrop-blur-lg">
        <div className="flex flex-col items-center gap-4 sm:gap-2.5">
          <div className="flex items-center gap-3">
            <SkeletonBox className="h-11 w-11 rounded-xl" />
            <SkeletonBox className="h-9 w-28 rounded-lg" />
          </div>
          <SkeletonBox className="h-3 w-56 rounded" />
        </div>

        <div className="mt-8 space-y-4">
          {isSignup ? <AuthFieldSkeleton hasAction /> : null}
          <AuthFieldSkeleton hasAction={isSignup} />
          {isSignup ? <AuthFieldSkeleton hasAction /> : null}
          <AuthFieldSkeleton />
          <AuthFieldSkeleton />

          {isSignup ? (
            <div className="grid grid-cols-[26%_1fr] items-center">
              <SkeletonBox className="h-4 w-16" />
              <div className="flex items-center gap-3">
                <SkeletonBox className="size-16 rounded-full" />
                <div className="space-y-2">
                  <SkeletonBox className="h-3 w-20 rounded" />
                  <SkeletonBox className="h-3 w-28 rounded" />
                </div>
              </div>
            </div>
          ) : null}

          <div className="pt-2">
            <SkeletonBox className="h-13 w-full rounded-xl" />
          </div>

          {variant === 'login' ? (
            <>
              <div className="flex items-center gap-3 py-1">
                <SkeletonBox className="h-px flex-1 rounded-none" />
                <SkeletonBox className="h-3 w-8 rounded" />
                <SkeletonBox className="h-px flex-1 rounded-none" />
              </div>

              <div className="flex items-center justify-center gap-12">
                {Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonBox key={index} className="size-14 rounded-full" />
                ))}
              </div>
            </>
          ) : null}

          <div className="mt-4 flex items-center justify-center gap-3">
            <SkeletonBox className="h-3 w-28 rounded" />
            <SkeletonBox className="h-3 w-12 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

// 라우트나 suspense fallback에서 바로 쓰기 쉽도록 로그인/회원가입용 래퍼를 따로 둡니다.
export function LoginPageSkeleton() {
  return <AuthPageSkeleton variant="login" />
}

export function SignupPageSkeleton() {
  return <AuthPageSkeleton variant="signup" />
}
