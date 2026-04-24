import { cn } from '@/utils/cn'

type StatsCardTone = 'yellow' | 'blue' | 'mint'

export type MyPageStatsSummaryItem = {
  label: string
  value: string
  tone: StatsCardTone
}

type MyPageStatsSummaryProps = {
  items: MyPageStatsSummaryItem[]
}

const STATS_ROW_CLASS_NAME = 'flex items-center gap-2 text-xs'

const STATS_CARD_TONE_CLASS_NAME = {
  yellow: 'bg-blue-400',
  blue: 'bg-yellow-400',
  mint: 'bg-emerald-400',
}

export function MyPageStatsSummary({ items }: MyPageStatsSummaryProps) {
  return (
    <div className="flex w-full items-center gap-x-5">
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
