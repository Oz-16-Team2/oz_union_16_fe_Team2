import {
  MyPageGoalSection,
  MyPageStatsSummary,
  type MyPageStatsSummaryItem,
} from '@/features/my-page'

const MY_PAGE_STATS_ITEMS = [
  {
    label: '함께한 기간',
    value: '100일',
    tone: 'yellow',
  },
  {
    label: '완료한 일정',
    value: '100개',
    tone: 'blue',
  },
  {
    label: '전체 달성률',
    value: '100%',
    tone: 'mint',
  },
] satisfies MyPageStatsSummaryItem[]

export function MyPage() {
  return (
    <div className="flex w-full flex-col gap-8 ">
      <section className="rounded-lg border border-border-mypage-stats-section bg-mypage-stats-section px-6 py-6 shadow-card-main flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-text-primary">
          나의 활동 요약
        </h2>

        <div className="grid w-full grid-cols-1 items-stretch gap-7 lg:grid-cols-[minmax(0,1fr)_230px]">
          <div className="order-2 flex w-full items-center justify-center rounded-lg border border-border-default bg-background/20 backdrop-blur-2xl text-sm lg:order-1">
            히트맵
          </div>

          <MyPageStatsSummary items={MY_PAGE_STATS_ITEMS} />
        </div>
      </section>

      <MyPageGoalSection />
    </div>
  )
}
