import type { LoginResponse, SocialLoginProvider } from '@/apis/auth'

export const mockLoginUser = {
  // 로그인 MSW에서만 사용하는 임시 계정입니다.
  // 실제 API가 개발되면 이 mock 계정 데이터는 삭제하고 서버 응답을 사용합니다.
  email: 'test@example.com',
  password: 'password123',
} as const

export const mockLoginResponse: LoginResponse = {
  // auth.schema.ts의 loginResponseSchema에 맞춘 mock token입니다.
  // 아직 실제 access token 정책이 없으므로 프론트에서는 이 값을 저장하지 않습니다.
  access_token: 'mock-access-token',
}

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
