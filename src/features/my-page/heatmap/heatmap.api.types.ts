export type HeatmapDay = {
  date: string
  check_count: number
}

/** 히트맵 상세 데이터 */
export type HeatmapDetail = {
  year: number
  days: HeatmapDay[]
}

/** 히트맵 응답 */
export type HeatmapResponse = {
  detail: HeatmapDetail
}

/** 히트맵 요청 파라미터 */
export type HeatmapRequestParams = {
  start: string
  end: string
}

/** 히트맵 에러 응답 */
export type HeatmapErrorResponse = {
  error_detail: string
}
