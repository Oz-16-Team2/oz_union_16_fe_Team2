export function GoalCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-2 rounded-2xl border border-border-default p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-3.5 rounded-xs bg-border-default" />
          <div className="h-6 w-20 rounded-md bg-border-default" />
        </div>
        <div className="h-6 w-14 rounded-full bg-border-default" />
      </div>

      <div className="h-4 w-32 rounded bg-border-default" />

      <div className="flex flex-col gap-3 rounded-xl border border-border-default p-3">
        <div className="h-5 w-4/5 rounded bg-border-default" />
        <div className="mx-auto size-35 rounded-full border-[15px] border-border-default" />
      </div>

      <div className="mt-auto flex justify-end gap-2">
        <div className="h-8 w-12 rounded-md bg-border-default" />
        <div className="h-8 w-12 rounded-md bg-border-default" />
      </div>
    </div>
  )
}
