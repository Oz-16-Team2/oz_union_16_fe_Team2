import type { ComponentType, SVGProps } from 'react'

import { GoogleLogo, KakaoLogo, NaverLogo } from './socialLoginLogos'

export type SocialLoginProvider = 'naver' | 'kakao' | 'google'

type SocialLoginButton = {
  provider: SocialLoginProvider
  label: string
  className: string
  Logo: ComponentType<SVGProps<SVGSVGElement>>
}

export const socialLoginButtons: SocialLoginButton[] = [
  {
    provider: 'naver',
    label: '네이버 로그인',
    className:
      'border-transparent bg-[#03C75A] text-white hover:bg-[#02b350] focus-visible:ring-[#03C75A]/35',
    Logo: NaverLogo,
  },
  {
    provider: 'kakao',
    label: '카카오 로그인',
    className:
      'border-transparent bg-[#FEE500] text-[#191919] hover:bg-[#f2da00] focus-visible:ring-[#FEE500]/40',
    Logo: KakaoLogo,
  },
  {
    provider: 'google',
    label: '구글 로그인',
    className:
      'border-[#dadce0] bg-white text-[#202124] hover:bg-[#f8f9fa] focus-visible:ring-[#4285F4]/25 dark:border-white/15 dark:bg-white dark:text-[#202124]',
    Logo: GoogleLogo,
  },
]

const OAUTH_AUTHORIZE_URLS: Record<SocialLoginProvider, string> = {
  kakao:
    'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=4d827091fb292df03311f83567f42955&redirect_uri=https://jaksim.duckdns.org/api/v1/accounts/social-login/kakao/callback/',
  google:
    'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=373515699404-tpdvon10es02usahli333soo3nrk7ddh.apps.googleusercontent.com&redirect_uri=https://jaksim.duckdns.org/api/v1/accounts/social-login/google/callback/&scope=openid%20email%20profile',
  naver:
    'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=hLKIkiBmZObuKEZUnBQ6&redirect_uri=https://jaksim.duckdns.org/api/v1/accounts/social-login/naver/callback/&state=__STATE__',
}

export const buildSocialLoginUrl = (provider: SocialLoginProvider) => {
  const baseUrl = OAUTH_AUTHORIZE_URLS[provider]

  if (provider === 'naver') {
    const state = crypto.randomUUID()
    return baseUrl.replace('__STATE__', state)
  }

  return baseUrl
}
