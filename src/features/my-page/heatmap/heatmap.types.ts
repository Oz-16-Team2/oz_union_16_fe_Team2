export type HeatmapCount = 0 | 1 | 2 | 3

export type HeatmapCell = {
  date: string
  checkCount: number
  count: HeatmapCount
  column: number
  row: number
}

export type HeatmapMonthLabel = {
  label: string
  column: number
}
