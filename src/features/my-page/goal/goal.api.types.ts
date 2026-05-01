export type ApiGoalListStatus = 'in_progress' | 'failed' | 'completed'

// GET /api/v1/goals 응답의 개별 목표 타입
export type ApiGoalResponse = {
  goal_id: number
  title: string
  startDate?: string
  start_date?: string
  endDate?: string
  end_date?: string
  status: string
  created_at?: string
  createdAt?: string
  progressRate?: number
  progress_rate?: number
  isCheckedToday?: boolean
  is_checked_today?: boolean
}

// GET /api/v1/goals 응답의 목록 래퍼
export type ApiGoalListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: ApiGoalResponse[]
}

// GET /api/v1/goals 요청 쿼리
export type ApiGoalListParams = {
  status?: ApiGoalListStatus
  page?: number
  size?: number
  start?: string
  end?: string
}

export type ApiGoalHistoryItem = {
  goal_id: number
  title: string
  start_date: string
  end_date: string
  status: string
  created_at: string
  progress_rate: number
  is_checked_today: boolean
}

export type ApiGoalHistoryResponse = {
  count: number
  next: string | null
  previous: string | null
  results: ApiGoalHistoryItem[]
}

export type ApiGoalHistoryParams = {
  date: string
  page?: number
  size?: number
}

// POST /api/v1/goals 요청
export type ApiCreateGoalRequest = {
  title: string
  start_date: string
  end_date: string
}

// POST /api/v1/goals 응답
export type ApiCreateGoalResponse = ApiGoalResponse

// PATCH /api/v1/goals/{goalId} 요청
// 문서상 goal_id가 포함되어 있어 path param과 함께 같이 보냅니다.
export type ApiUpdateGoalRequest = {
  goal_id: number
  title?: string
}

// PATCH /api/v1/goals/{goalId} 응답
export type ApiUpdateGoalResponse = {
  goal_id: number
  title: string
  start_date: string
  end_date: string
}

// DELETE /api/v1/goals/{goalId} 응답
export type ApiDeleteGoalResponse = {
  detail: string
}

// POST /api/v1/goals/{goalId}/check 응답
export type ApiCheckGoalResponse = {
  detail: string
  goal_id: number
  progress_rate: number
}
