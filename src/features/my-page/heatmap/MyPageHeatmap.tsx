type HeatmapCount = 0 | 1 | 2 | 3

const MONTH_LABELS = Array.from({ length: 12 }, (_, index) => `${index + 1}월`)
const WEEKDAY_LABELS = [
  { label: '월', row: 0 },
  { label: '수', row: 2 },
  { label: '금', row: 4 },
] as const

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const TOTAL_DAYS = DAYS_IN_MONTH.reduce((sum, days) => sum + days, 0)
const HEATMAP_DAYS = Array.from({ length: TOTAL_DAYS }, (_, index) => ({
  id: index,
  count: (index % 4) as HeatmapCount,
}))

const monthStartColumns = DAYS_IN_MONTH.reduce<number[]>(
  (columns, _days, index) => {
    if (index === 0) {
      columns.push(0)
      return columns
    }

    const accumulatedDays = DAYS_IN_MONTH.slice(0, index).reduce(
      (sum, value) => sum + value,
      0
    )
    columns.push(Math.floor(accumulatedDays / 7))
    return columns
  },
  []
)

const HEATMAP_TONE_CLASS_NAME: Record<HeatmapCount, string> = {
  0: 'border-slate-200 bg-slate-200 dark:border-[#3a4148] dark:bg-[#31363b]',
  1: 'border-[#b9dca6] bg-[#b9dca6] dark:border-[#1f8f46]/30 dark:bg-[#1f8f46]/30',
  2: 'border-[#79be68] bg-[#79be68] dark:border-[#1f8f46]/60 dark:bg-[#1f8f46]/60',
  3: 'border-[#2f9e44] bg-[#2f9e44] dark:border-[#1f8f46] dark:bg-[#1f8f46]',
}

const HEATMAP_LEGEND_LEVELS: HeatmapCount[] = [0, 1, 2, 3]

export function MyPageHeatmap() {
  return (
    <div className="mt-4 rounded-3xl bg-surface/5 px-5 py-4 backdrop-blur-sm border border-border-default">
      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="text-xs font-medium text-text-muted">
          최근 1년 활동 기록
        </p>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="mb-2.5 grid grid-cols-[28px_repeat(53,minmax(0,1fr))] gap-x-1 lg:min-w-0">
          <div />
          {MONTH_LABELS.map((label, index) => (
            <div
              key={label}
              className="text-xs font-medium leading-none text-text-muted/85"
              style={{ gridColumn: `${monthStartColumns[index] + 2} / span 4` }}
            >
              {label}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[28px_repeat(53,minmax(0,1fr))] grid-rows-7 gap-1 lg:min-w-0">
          {WEEKDAY_LABELS.map(({ label, row }) => (
            <div
              key={label}
              className="flex items-center text-xs font-medium leading-none text-text-muted/80"
              style={{ gridColumn: '1', gridRow: `${row + 1}` }}
            >
              {label}
            </div>
          ))}

          {HEATMAP_DAYS.map(({ id, count }) => (
            <div
              key={id}
              className={`aspect-square w-full rounded-sm border ${HEATMAP_TONE_CLASS_NAME[count]}`}
              style={{
                gridColumn: `${Math.floor(id / 7) + 2}`,
                gridRow: `${(id % 7) + 1}`,
              }}
              aria-label={`${id + 1}일차 활동`}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center justify-end gap-2 text-xs text-text-muted/80 lg:min-w-0">
          <span>활동 적음</span>
          <div className="flex items-center gap-1.5">
            {HEATMAP_LEGEND_LEVELS.map((level) => (
              <span
                key={level}
                className={`h-2.5 w-2.5 rounded-xs border ${HEATMAP_TONE_CLASS_NAME[level]}`}
                aria-hidden="true"
              />
            ))}
          </div>
          <span>활동 많음</span>
        </div>
      </div>
    </div>
  )
}
