import {
  MyPageGoalSection,
  MyPageHeatmap,
  MyPageStatsSummary,
  type MyPageStatsSummaryItem,
} from '@/features/my-page/components'

const MY_PAGE_STATS_ITEMS = [
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
  {
    label: '함께한 기간',
    value: '100일',
    tone: 'yellow',
  },
] satisfies MyPageStatsSummaryItem[]

export function MyPage() {
  return (
    <div className="flex w-full flex-col gap-8">
      <section className="flex flex-col gap-2.5 rounded-3xl border border-border-mypage-stats-section bg-mypage-stats-section px-4 py-6 shadow-card-main">
        <h2 className="text-xl font-semibold text-text-primary">나의 활동</h2>

        <MyPageStatsSummary items={MY_PAGE_STATS_ITEMS} />

        <MyPageHeatmap />
      </section>
      <MyPageGoalSection />
    </div>
  )
}
