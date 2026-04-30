import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { activitySummaryApi } from '@/apis/activity-summary'
import type { ApiErrorResponse } from '@/apis/api.types'

export type ActivitySummaryData = {
  completedGoalsCount: number
  totalGoalsCount: number
  totalAchievementRate: number
  daysTogether: number
}

async function fetchActivitySummary(): Promise<ActivitySummaryData> {
  const [daysResponse, achievementRateResponse, completedGoalsResponse] =
    await Promise.all([
      activitySummaryApi.getDays(),
      activitySummaryApi.getAchievementRate(),
      activitySummaryApi.getCompletedGoals(),
    ])

  return {
    completedGoalsCount:
      completedGoalsResponse.data.detail.completed_goals_count,
    totalGoalsCount: achievementRateResponse.data.detail.total_goals_count,
    totalAchievementRate:
      achievementRateResponse.data.detail.total_achievement_rate,
    daysTogether: daysResponse.data.detail.days_together,
  }
}

export function useActivitySummaryQuery() {
  return useQuery<ActivitySummaryData, AxiosError<ApiErrorResponse>>({
    queryKey: ['activitySummary'],
    queryFn: fetchActivitySummary,
  })
}
