import { useState } from 'react'

import { MyPageStatsSummary } from '@/features/my-page/activity-summary/MyPageStatsSummary'
import { MyPageGoalSection } from '@/features/my-page/goal'
import { MyPageHeatmap } from '@/features/my-page/heatmap'
import { useActivitySummaryQuery } from '@/query/activity-summary/useActivitySummaryQuery'

type SelectedHeatmapEntry = {
  date: string
  checkCount: number
}

export function MyPage() {
  const { data } = useActivitySummaryQuery()
  const [selectedHeatmapEntry, setSelectedHeatmapEntry] =
    useState<SelectedHeatmapEntry | null>(null)

  return (
    <div className="flex w-full flex-col gap-8">
      <section className="flex flex-col gap-2.5 rounded-3xl border border-border-mypage-stats-section bg-mypage-stats-section px-4 py-6 shadow-card-main">
        <h2 className="text-xl font-semibold text-text-primary">나의 활동</h2>

        <MyPageStatsSummary data={data} />

        <MyPageHeatmap
          selectedDate={selectedHeatmapEntry?.date ?? null}
          onSelectDate={(date, checkCount) =>
            setSelectedHeatmapEntry((prevEntry) =>
              prevEntry?.date === date ? null : { date, checkCount }
            )
          }
        />
      </section>
      <MyPageGoalSection
        selectedDate={selectedHeatmapEntry?.date ?? null}
        selectedDateCheckCount={selectedHeatmapEntry?.checkCount ?? 0}
        onClearSelectedDate={() => setSelectedHeatmapEntry(null)}
      />
    </div>
  )
}
