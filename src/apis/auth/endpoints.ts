//auth 관련 endpoint
export const AUTH_ENDPOINTS = {
  signup: '/accounts/signup',
  login: '/accounts/login',
  logout: '/accounts/logout',
  me: '/accounts/me',
  changeNickname: '/accounts/me/change-nickname',
  changePassword: '/accounts/change-password',
  changePasswordCheck: '/accounts/change-password/check',
  profileImages: '/accounts/profile-images',
  sendEmailVerification: '/accounts/verification/send-email',
  verifyEmail: '/accounts/verification/verify-email',
  checkNickname: '/accounts/check-nickname',
  refreshToken: '/accounts/token/refresh',
  socialLoginCallback: (provider: SocialLoginProvider) =>
    `/accounts/social-login/${provider}/callback`,
} as const

export type SocialLoginProvider = 'kakao' | 'naver' | 'google'
