# Project Structure

현재 프로젝트는 Vite 기반 React + TypeScript 구조입니다.

## 루트 구조

```text
.
├── docs
├── public
├── src
├── .github
├── .husky
├── .storybook
├── commitlint.config.js
├── eslint.config.js
├── package.json
└── vite.config.ts
```

## src 구조

```text
src
├── apis
├── assets
│   └── images
├── components
│   └── common
├── constants
├── features
├── hooks
│   └── queries
├── mocks
├── pages
├── router
├── schemas
└── utils
```

## 폴더 설명

- `src/apis`: axios client, API endpoint, 도메인별 API 호출 함수와 API 요청/응답 스키마 또는 타입
- `src/assets/images`: 이미지 리소스
- `src/components/common`: 여러 곳에서 재사용하는 공통 UI, 오버레이, 레이아웃
- `src/constants`: 여러 곳에서 공유하는 상수
- `src/features`: 기능 단위 코드
- `src/hooks`: 여러 곳에서 재사용하는 커스텀 훅
- `src/hooks/queries`: 서버 상태, API 요청 관련 훅
- `src/mocks`: MSW mock handler와 설정
- `src/pages`: 라우트 단위 화면 컴포넌트
- `src/router`: 라우팅 설정
- `src/schemas`: 화면 폼 검증용 Zod 스키마
- `src/utils`: 공통 유틸 함수

## API / MSW 구조

API와 MSW 작성 방식은 `docs/API_MSW.md`를 기준으로 합니다.

```text
src/apis/
├── apiPath.ts
├── apiClient.ts
└── {domain}/
    ├── {domain}.api.ts
    ├── {domain}.schema.ts or {domain}.types.ts
    ├── endpoints.ts
    └── index.ts
```

```text
src/mocks/
├── browser.ts
├── handlers.ts
├── data/
│   └── {domain}.ts
└── handlers/
    └── {domain}Handler.ts
```

## feature 구조 예시

```text
src/features/post-create/
├── components
├── hooks
├── types
└── utils
```

## 공통 컴포넌트 구조 예시

```text
src/components/common/
├── ui/                     # Badge, Input, Textarea 등 기본 UI
│   ├── badge/
│   ├── field/              # Input, Textarea
│   └── index.ts
├── overlay/                # Modal, Dropdown 등 화면 위에 뜨는 UI
│   ├── modal/
│   ├── dropdown/
│   └── index.ts
├── layout/                 # Header, Footer, RootLayout
│   ├── constants/
│   └── index.ts
└── feedback/               # Toast, Loading 등 사용자 피드백 UI
    ├── toast/
    ├── loading/
    └── index.ts
```

## 공통 컴포넌트 export

- 각 영역의 `index.ts`는 해당 영역에 속한 컴포넌트만 export합니다.
- `ui/index.ts`는 기본 UI 컴포넌트를 export합니다. 현재 `Badge`, `Input`, `Textarea` , `Button` , `TabButton` , `SearchBar` , `Card` 를 export하며, `Input`과 `Textarea`는 입력 필드 성격이므로 `field` 폴더 아래에서 가져옵니다.
- `overlay/index.ts`는 화면 위에 뜨는 UI를 export합니다. 현재 `Dropdown`, `ActionMenu`를 직접 export하고, modal 관련 컴포넌트는 `modal/index.ts`에서 모아 다시 export합니다.
- `overlay/modal/index.ts`는 modal에 속한 컴포넌트를 export합니다. 기본 구성 요소인 `Modal`, `ModalHeader`, `ModalContent`, `ModalFooter`와 목적별 modal인 `CharacterSelectModal`, `ConfirmModal`, `ReportFormModal`을 포함합니다.
- `layout/index.ts`는 페이지 공통 레이아웃 컴포넌트를 export합니다. 현재 `Header`, `Footer`, `RootLayout`을 포함합니다.
- `feedback/index.ts`는 사용자 상태나 결과를 알려주는 피드백 UI를 export합니다. `Toast`, `Loading`처럼 화면 상태를 전달하는 컴포넌트를 포함합니다.
- 새로운 공통 컴포넌트를 추가할 때는 해당 영역의 폴더에 컴포넌트와 story를 함께 두고, 외부에서 사용할 컴포넌트만 해당 영역의 `index.ts`에 추가합니다.

## 사용 예시

```ts
import { Button } from '@/components/common/button'
import { Badge, Input, Textarea } from '@/components/common/ui'
import { ActionMenu, Dropdown, Modal } from '@/components/common/overlay'
import { Footer, Header } from '@/components/common/layout'
import { Loading, Toast } from '@/components/common/feedback'
```
