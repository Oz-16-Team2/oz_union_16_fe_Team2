export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
export const MSW_BASE_URL = '/api/v1'

// .env의 API_BASE_URL이 있으면 요청 도메인이 달라질 수 있어서,
// MSW handler는 어떤 도메인이든 /api/v1 경로만 맞으면 잡도록 wildcard를 씁니다.
export const toMswApiUrl = (path: string) => `*${MSW_BASE_URL}${path}`
