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

const STATS_CARD_CLASS_NAME =
  'flex w-full min-w-36 flex-1 flex-col items-center justify-center rounded-lg border px-6 py-5 text-center'

const STATS_CARD_TONE_CLASS_NAME: Record<StatsCardTone, string> = {
  yellow: 'border-border-mypage-stats-card-yellow bg-mypage-stats-card-yellow',
  blue: 'border-border-mypage-stats-card-blue bg-mypage-stats-card-blue',
  mint: 'border-border-mypage-stats-card-mint bg-mypage-stats-card-mint',
}

const STATS_VALUE_TONE_CLASS_NAME: Record<StatsCardTone, string> = {
  yellow: 'text-primary-600',
  blue: 'text-text-secondary',
  mint: 'text-green-500',
}

export function MyPageStatsSummary({ items }: MyPageStatsSummaryProps) {
  return (
    <div className="order-1 flex w-full flex-wrap gap-4 lg:order-2">
      {items.map(({ label, value, tone }) => (
        <div
          key={label}
          className={cn(
            STATS_CARD_CLASS_NAME,
            STATS_CARD_TONE_CLASS_NAME[tone]
          )}
        >
          <strong
            className={cn(
              'block text-xl font-bold',
              STATS_VALUE_TONE_CLASS_NAME[tone]
            )}
          >
            {value}
          </strong>
          <span className="mt-2 block text-base text-text-secondary">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
