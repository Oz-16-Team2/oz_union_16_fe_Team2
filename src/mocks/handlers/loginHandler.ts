//login관련 msw 핸들러
import { http, HttpResponse } from 'msw'

import { toMswApiUrl } from '@/apis/apiPath'
import { AUTH_ENDPOINTS } from '@/apis/auth'

export const loginHandler = [
  http.post(toMswApiUrl(AUTH_ENDPOINTS.login), () => {
    return HttpResponse.json({ access_token: 'mock-access-token' })
  }),
]
