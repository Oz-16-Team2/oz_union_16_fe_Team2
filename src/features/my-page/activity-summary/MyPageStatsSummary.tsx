import type { ActivitySummaryData } from '@/query/activity-summary/useActivitySummaryQuery'
import { cn } from '@/utils/cn'

type StatsCardTone = 'yellow' | 'blue' | 'mint'

type MyPageStatsSummaryItem = {
  label: string
  value: string
  tone: StatsCardTone
}

type MyPageStatsSummaryProps = {
  data?: ActivitySummaryData
}

const STATS_ROW_CLASS_NAME = 'flex items-center gap-2 text-xs'
const numberFormatter = new Intl.NumberFormat('ko-KR')

const STATS_CARD_TONE_CLASS_NAME = {
  yellow: 'bg-blue-400',
  blue: 'bg-yellow-400',
  mint: 'bg-emerald-400',
}

function buildStatsItems(data?: ActivitySummaryData): MyPageStatsSummaryItem[] {
  return [
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
  ]
}

export function MyPageStatsSummary({ data }: MyPageStatsSummaryProps) {
  const items = buildStatsItems(data)

  return (
    <div className="flex w-full gap-4 [@media(max-width:482px)]:flex-col">
      {items.map(({ label, value, tone }) => (
        <div key={label} className={cn(STATS_ROW_CLASS_NAME)}>
          <span
            className={cn(
              'inline-block h-2 w-2 shrink-0 rounded-full',
              STATS_CARD_TONE_CLASS_NAME[tone]
            )}
            aria-hidden="true"
          />
          <span className="text-xs font-medium">{label}</span>
          <span className="opacity-70">:</span>
          <strong className="text-xs font-semibold tracking-tight">
            {value}
          </strong>
        </div>
      ))}
    </div>
  )
}
