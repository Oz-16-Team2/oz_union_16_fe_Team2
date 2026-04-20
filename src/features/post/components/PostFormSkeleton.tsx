function SkeletonBox({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ''}`}
    />
  )
}

export function PostFormSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* 이미지 선택 */}
      <div className="flex flex-col gap-2">
        <SkeletonBox className="h-5 w-24" />
        <SkeletonBox className="h-40 w-full rounded-2xl" />
      </div>

      {/* 제목 */}
      <div className="flex flex-col gap-2">
        <SkeletonBox className="h-5 w-16" />
        <SkeletonBox className="h-13.5 w-full rounded-xl" />
        <SkeletonBox className="h-4 w-12 self-end" />
      </div>

      {/* 내용 */}
      <div className="flex flex-col gap-2">
        <SkeletonBox className="h-5 w-12" />
        <SkeletonBox className="h-58 w-full rounded-xl" />
        <SkeletonBox className="h-4 w-12 self-end" />
      </div>

      {/* 태그 선택 */}
      <div className="flex flex-wrap items-center gap-2">
        <SkeletonBox className="h-5 w-20" />
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonBox
            key={i}
            className={`h-8 rounded-full ${i % 2 === 0 ? 'w-16' : 'w-20'}`}
          />
        ))}
      </div>

      {/* 투표 생성 */}
      <div className="flex flex-col gap-3">
        <SkeletonBox className="h-5 w-20" />
        <div className="rounded-2xl border border-border-default p-4">
          <SkeletonBox className="h-62.5 w-full rounded-xl" />
        </div>
      </div>

      {/* 목표 선택 */}
      <div className="flex flex-col gap-3">
        <SkeletonBox className="h-5 w-20" />
        <SkeletonBox className="h-19 w-full rounded-2xl" />
      </div>

      {/* 버튼 */}
      <div className="flex justify-end gap-2 pt-2">
        <SkeletonBox className="h-8 w-14 rounded-md" />
        <SkeletonBox className="h-8 w-24 rounded-md" />
      </div>
    </div>
  )
}
