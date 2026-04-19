export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
export const MSW_BASE_URL = 'https://msw.local/api/v1'

// MSW handler에서 절대 경로를 일관되게 만들기 위한 헬퍼
export const toMswApiUrl = (path: string) => `${MSW_BASE_URL}${path}`
