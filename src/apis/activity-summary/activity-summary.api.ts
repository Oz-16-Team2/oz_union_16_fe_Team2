import { apiClient } from '@/apis/apiClient'

import { ACTIVITY_SUMMARY_ENDPOINTS } from './endpoints'

export type ActivitySummaryDaysResponse = {
  detail: {
    days_together: number
  }
}

export type ActivitySummaryAchievementRateResponse = {
  detail: {
    total_goals_count: number
    completed_goals_count: number
    total_achievement_rate: number
  }
}

export type ActivitySummaryCompletedGoalsResponse = {
  detail: {
    completed_goals_count: number
  }
}

export const activitySummaryApi = {
  getDays: () =>
    apiClient.get<ActivitySummaryDaysResponse>(ACTIVITY_SUMMARY_ENDPOINTS.days),
  getAchievementRate: () =>
    apiClient.get<ActivitySummaryAchievementRateResponse>(
      ACTIVITY_SUMMARY_ENDPOINTS.achievementRate
    ),
  getCompletedGoals: () =>
    apiClient.get<ActivitySummaryCompletedGoalsResponse>(
      ACTIVITY_SUMMARY_ENDPOINTS.completedGoals
    ),
} as const
