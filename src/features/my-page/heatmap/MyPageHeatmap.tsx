import {
  addMonths,
  addWeeks,
  differenceInCalendarWeeks,
  eachDayOfInterval,
  endOfYear,
  format,
  isBefore,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns'

import { useHeatmapQuery } from '@/query/heatmap'
import { toLocalDateString } from '@/utils/date'

import type { HeatmapDay } from './heatmap.api.types'
import type {
  HeatmapCell,
  HeatmapCount,
  HeatmapMonthLabel,
} from './heatmap.types'

type MyPageHeatmapProps = {
  selectedDate?: string | null
  onSelectDate?: (date: string, checkCount: number) => void
}
const WEEKDAY_LABELS = [
  { label: '월', row: 0 },
  { label: '수', row: 2 },
  { label: '금', row: 4 },
] as const

const HEATMAP_TONE_CLASS_NAME: Record<HeatmapCount, string> = {
  0: 'border-slate-200 bg-slate-200 dark:border-[#3a4148] dark:bg-[#31363b]',
  1: 'border-[#b9dca6] bg-[#b9dca6] dark:border-[#1f8f46]/30 dark:bg-[#1f8f46]/30',
  2: 'border-[#79be68] bg-[#79be68] dark:border-[#1f8f46]/60 dark:bg-[#1f8f46]/60',
  3: 'border-[#2f9e44] bg-[#2f9e44] dark:border-[#1f8f46] dark:bg-[#1f8f46]',
}

const HEATMAP_LEGEND_LEVELS: HeatmapCount[] = [0, 1, 2, 3]
const WEEK_STARTS_ON = 1

function getCurrentYearRange(today = new Date()) {
  return {
    start: startOfYear(today),
    end: endOfYear(today),
  }
}

function toHeatmapCount(checkCount: number): HeatmapCount {
  if (checkCount <= 0) return 0
  if (checkCount === 1) return 1
  if (checkCount === 2) return 2
  return 3
}

function toHeatmapRow(date: Date) {
  return ((date.getDay() + 6) % 7) + 1
}

// buildMonthLabels
// - 월 라벨을 주 단위 grid 기준으로 계산
// - 월 시작 위치를 주 기준 column으로 변환해서 상단에 표시
function buildMonthLabels(start: Date, end: Date): HeatmapMonthLabel[] {
  const firstWeekStart = startOfWeek(start, { weekStartsOn: WEEK_STARTS_ON })
  const labels: HeatmapMonthLabel[] = []
  let cursor = startOfMonth(start)

  while (cursor <= end) {
    let labelAnchor = startOfWeek(cursor, { weekStartsOn: WEEK_STARTS_ON })

    // 월 초가 이전 달과 같은 주에 걸치면 라벨을 다음 주로 미뤄
    // 이전 달 마지막 며칠이 다음 달 라벨 아래로 보이는 혼동을 줄입니다.
    if (isBefore(labelAnchor, cursor)) {
      labelAnchor = addWeeks(labelAnchor, 1)
    }

    labels.push({
      label: format(cursor, 'M월'),
      column:
        differenceInCalendarWeeks(labelAnchor, firstWeekStart, {
          weekStartsOn: WEEK_STARTS_ON,
        }) + 2,
    })
    cursor = addMonths(cursor, 1)
  }

  return labels
}

// buildHeatmapCells
// - API로 받은 날짜별 데이터를 실제 grid 위치(row, column)로 변환
// - 날짜 → (주 index, 요일 index) 계산해서 히트맵에 배치
function buildHeatmapCells(
  days: HeatmapDay[],
  start: Date,
  end: Date
): HeatmapCell[] {
  const firstWeekStart = startOfWeek(start, { weekStartsOn: WEEK_STARTS_ON })
  const dayCountMap = new Map(days.map((day) => [day.date, day.check_count]))

  return eachDayOfInterval({ start, end }).map((date) => {
    const dateKey = toLocalDateString(date)
    const checkCount = dayCountMap.get(dateKey) ?? 0

    return {
      date: dateKey,
      checkCount,
      count: toHeatmapCount(checkCount),
      column:
        differenceInCalendarWeeks(date, firstWeekStart, {
          weekStartsOn: WEEK_STARTS_ON,
        }) + 2,
      row: toHeatmapRow(date),
    }
  })
}

// MyPageHeatmap (잔디 컴포넌트)
// - 1년 데이터를 주(week) 단위 grid로 렌더링
// - 각 날짜를 셀로 변환해서 색상(활동량)에 따라 표시
export function MyPageHeatmap({
  selectedDate,
  onSelectDate,
}: MyPageHeatmapProps) {
  const { start, end } = getCurrentYearRange()
  const params = {
    start: toLocalDateString(start),
    end: toLocalDateString(end),
  }
  const { data } = useHeatmapQuery(params)
  // 월 라벨 계산 (grid column 기준)
  const monthLabels = buildMonthLabels(start, end)
  // 날짜 데이터를 grid 셀로 변환 (핵심 로직)
  const cells = buildHeatmapCells(data?.days ?? [], start, end)

  return (
    <div className="mt-4 rounded-3xl border border-border-default bg-surface/5 px-5 py-4 backdrop-blur-sm">
      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="text-xs font-medium text-text-muted">올해 활동 기록</p>
      </div>

      <div className="w-full overflow-x-auto pb-1">
        <div className="mb-2.5 grid w-full min-w-max grid-cols-[28px_repeat(53,minmax(14px,1fr))] gap-x-1">
          <div />
          {monthLabels.map(({ label, column }) => (
            <div
              key={`${label}-${column}`}
              className="text-xs font-medium leading-none text-text-muted/85"
              style={{ gridColumn: `${column} / span 4` }}
            >
              {label}
            </div>
          ))}
        </div>

        <div className="grid w-full min-w-max grid-cols-[28px_repeat(53,minmax(14px,1fr))] grid-rows-7 gap-1">
          {WEEKDAY_LABELS.map(({ label, row }) => (
            <div
              key={label}
              className="flex items-center text-xs font-medium leading-none text-text-muted/80"
              style={{ gridColumn: '1', gridRow: `${row + 1}` }}
            >
              {label}
            </div>
          ))}

          {/* 히트맵 셀 렌더링
             - 1년치 날짜를 순회하면서 각 셀을 그림
             - 현재 구조는 전체 셀이 한 번에 렌더됨 (최적화 포인트)
          */}
          {cells.map(({ date, checkCount, count, column, row }) => (
            <button
              key={date}
              type="button"
              className="group relative disabled:cursor-default"
              style={{
                gridColumn: `${column}`,
                gridRow: `${row}`,
              }}
              aria-label={`${date} 완료 ${checkCount}회`}
              disabled={checkCount === 0}
              onClick={() => onSelectDate?.(date, checkCount)}
            >
              <div
                className={`aspect-square w-full rounded-sm border ${HEATMAP_TONE_CLASS_NAME[count]} ${
                  selectedDate === date
                    ? 'ring-2 ring-offset-1 ring-offset-surface ring-white/70'
                    : ''
                }`}
              />
              <span className="pointer-events-none absolute left-full top-1/2 z-10 ml-2 hidden -translate-y-1/2 whitespace-nowrap rounded-md border border-white/15 bg-black/85 px-2 py-1 text-[11px] font-medium text-white shadow-md group-hover:block">
                {date} 완료 {checkCount}회
              </span>
              <span className="pointer-events-none absolute left-full top-1/2 z-10 ml-1 hidden h-2 w-2 -translate-y-1/2 rotate-45 border-b border-r border-white/15 bg-black/85 group-hover:block" />
            </button>
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
