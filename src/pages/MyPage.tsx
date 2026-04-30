import {
  MyPageStatsSummary,
  type MyPageStatsSummaryItem,
} from '@/features/my-page/activity-summary/MyPageStatsSummary'
import { MyPageGoalSection } from '@/features/my-page/goal'
import { MyPageHeatmap } from '@/features/my-page/heatmap'
import { useActivitySummaryQuery } from '@/query/activity-summary/useActivitySummaryQuery'

const numberFormatter = new Intl.NumberFormat('ko-KR')

export function MyPage() {
  const { data } = useActivitySummaryQuery()

  const statsItems = [
    {
      label: '완료한 일정',
      value:
        data === undefined
          ? '--개'
          : `${numberFormatter.format(data.completedGoalsCount)}개`,
      tone: 'blue',
    },
    {
      label: '전체 달성률',
      value:
        data === undefined
          ? '--%'
          : `${numberFormatter.format(data.totalAchievementRate)}%`,
      tone: 'mint',
    },
    {
      label: '함께한 기간',
      value:
        data === undefined
          ? '--일'
          : `${numberFormatter.format(data.daysTogether)}일`,
      tone: 'yellow',
    },
  ] satisfies MyPageStatsSummaryItem[]

  return (
    <div className="flex w-full flex-col gap-8">
      <section className="flex flex-col gap-2.5 rounded-3xl border border-border-mypage-stats-section bg-mypage-stats-section px-4 py-6 shadow-card-main">
        <h2 className="text-xl font-semibold text-text-primary">나의 활동</h2>

        <MyPageStatsSummary items={statsItems} />

        <MyPageHeatmap />
      </section>
      <MyPageGoalSection />
    </div>
  )
}
