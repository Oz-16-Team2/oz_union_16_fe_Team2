import type { LoginResponse, SocialLoginProvider } from '@/apis/auth'

export const mockSocialLoginPayload = {
  // 소셜 로그인 MSW callback 호출을 확인하기 위한 임시 code/state 값입니다.
  // 실제 OAuth 연동 시 provider에서 받은 code/state로 대체되고 이 mock 값들은 삭제됩니다.
  kakao: {
    code: 'mock-kakao-code',
  },
  naver: {
    code: 'mock-naver-code',
    state: 'mock-naver-state',
  },
  google: {
    code: 'mock-google-code',
    state: 'mock-google-state',
  },
} as const

export const getMockSocialLoginResponse = (
  provider: SocialLoginProvider
): LoginResponse => ({
  // provider별 callback endpoint가 정상 연결됐는지 구분하기 위한 MSW 전용 token입니다.
  // 실제 API 연동 후에는 서버에서 받은 응답을 그대로 사용합니다.
  access_token: `mock-${provider}-access-token`,
})
