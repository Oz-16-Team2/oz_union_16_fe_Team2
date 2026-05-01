export const GOAL_ENDPOINTS = {
  goals: '/goals/',
  goalsHistory: '/goals/history/',
  goal: (goalId: number | string) => `/goals/${goalId}/`,
  goalCheck: (goalId: number | string) => `/goals/${goalId}/check/`,
} as const
