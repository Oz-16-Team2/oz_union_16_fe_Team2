export const GOAL_ENDPOINTS = {
  goals: '/goals/',
  goal: (goalId: number | string) => `/goals/${goalId}/`,
  goalCheck: (goalId: number | string) => `/goals/${goalId}/check/`,
} as const
