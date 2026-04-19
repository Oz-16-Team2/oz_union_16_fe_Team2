# API / MSW Structure

API 호출과 MSW mock은 도메인 단위로 관리합니다.

## 폴더 구조

```text
src
├── apis
│   ├── apiPath.ts            # API/MSW base URL, MSW URL helper
│   ├── apiClient.ts          # axios 공통 인스턴스
│   └── {domain}
│       ├── {domain}.api.ts   # API 호출 함수
│       ├── {domain}.schema.ts or {domain}.types.ts
│       ├── endpoints.ts      # endpoint 경로
│       └── index.ts          # domain export
└── mocks
    ├── browser.ts            # MSW worker 설정
    ├── handlers.ts           # 전체 handler 모음
    ├── data
    │   └── {domain}.ts       # mock 데이터
    └── handlers
        └── {domain}Handler.ts
```

## 파일 역할

- `apis/apiClient.ts`: axios 인스턴스, timeout, credentials, interceptor 기본 구조를 관리합니다.
- `apis/apiPath.ts`: `API_BASE_URL`, `MSW_BASE_URL`, `toMswApiUrl`을 관리합니다.
- `apis/{domain}/endpoints.ts`: 도메인별 endpoint 문자열을 관리합니다.
- `apis/{domain}/{domain}.api.ts`: 실제 API 호출 함수를 관리합니다.
- `apis/{domain}/{domain}.schema.ts`: Zod 요청/응답 스키마가 필요한 도메인에서 사용합니다.
- `apis/{domain}/{domain}.types.ts`: Zod 검증 없이 TypeScript 타입만 필요한 도메인에서 사용합니다.
- `mocks/data/{domain}.ts`: MSW 응답에 사용할 mock 데이터를 관리합니다.
- `mocks/handlers/{domain}Handler.ts`: 도메인별 MSW handler를 관리합니다.
- `mocks/handlers.ts`: 도메인별 handler 배열을 모아 `setupWorker`에 전달합니다.
- 도메인별 외부 export는 `apis/{domain}/index.ts`에서만 관리합니다.

## 예시

```ts
// src/apis/auth/endpoints.ts
export const AUTH_ENDPOINTS = {
  login: '/accounts/login',
  signup: '/accounts/signup',
} as const
```

```ts
// src/mocks/handlers/loginHandler.ts
import { http, HttpResponse } from 'msw'

import { toMswApiUrl } from '@/apis/apiPath'
import { AUTH_ENDPOINTS } from '@/apis/auth'

export const loginHandler = [
  http.post(toMswApiUrl(AUTH_ENDPOINTS.login), () => {
    return HttpResponse.json({ access_token: 'mock-access-token' })
  }),
]
```

```ts
// src/mocks/handlers.ts
import { loginHandler } from './handlers/loginHandler'

export const handlers = [...loginHandler]
```

## 스키마 / 타입 기준

- 로그인, 회원가입처럼 폼 검증이나 API 응답 검증이 필요한 경우 `schema.ts`를 사용합니다.
- 단순 조회 API처럼 런타임 검증이 필요 없고 타입만 필요한 경우 `types.ts`를 사용합니다.
- 한 도메인 안에서 `schema.ts`와 `types.ts`를 동시에 둘 수도 있지만, 중복 타입 정의는 피합니다.
