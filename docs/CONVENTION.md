# Development Convention

## 목적

프로젝트의 폴더 구조, 네이밍, 작성 방식을 통일해 협업 시 혼선을 줄입니다.

## 기본 구조

현재 프로젝트는 Vite 기반 React + TypeScript 구조입니다.

```text
src
├── assets/images
├── components/common
├── constants
├── features
├── hooks
│   └── queries
├── mocks
├── pages
├── router
└── utils
```

## 기본 원칙

- 기능은 `features` 단위로 분리합니다.
- `pages`는 라우트 진입점만 담당합니다.
- 공통 UI는 `components/common`에 둡니다.
- 레이아웃 컴포넌트는 `components/common/layout`에 둡니다.
- `features`끼리는 직접 참조하지 않습니다.
- 여러 곳에서 재사용되는 로직만 전역 폴더로 분리합니다.

## 폴더 규칙

- `pages`: 라우트 단위 화면 컴포넌트
- `router`: 라우팅 설정
- `features`: 기능 단위 코드
- `components/common`: 여러 곳에서 재사용하는 공통 UI, 오버레이, 레이아웃
- `components/common/ui`: Badge, Input, Textarea ,Button 등 같은 기본 UI
- `components/common/ui/field`: Input, Textarea 같은 입력 필드 UI
- `components/common/overlay`: Modal, Dropdown 같은 화면 위에 뜨는 UI
- `components/common/layout`: Header, Footer, RootLayout 같은 공통 레이아웃
- `hooks`: 여러 곳에서 재사용하는 커스텀 훅
- `hooks/queries`: 서버 상태, API 요청 관련 훅
- `constants`: 여러 곳에서 공유하는 상수
- `utils`: 여러 곳에서 사용하는 공통 유틸 함수
- `assets/images`: 이미지 리소스
- `mocks`: MSW mock handler와 설정

## 네이밍 규칙

- 컴포넌트: `PascalCase.tsx`
- 훅: `use*.ts`
- 스토리북 파일: `*.stories.tsx`
- 유틸 함수: `camelCase.ts`
- 배럴 파일: `index.ts`
- 폴더명: `kebab-case`

## 작성 규칙

- 하나의 컴포넌트는 하나의 책임만 가지도록 작성합니다.
- 여러 곳에서 재사용되는 UI만 `components/common`으로 분리합니다.
- 특정 페이지에서만 쓰는 로직은 해당 페이지 가까이에 둡니다.
- 특정 기능에서만 쓰는 코드는 해당 `features` 내부에 둡니다.
- 공통으로 필요해진 로직만 `hooks`, `utils`, `constants`로 분리합니다.
- 프로젝트 내부 import는 `@/*` alias를 우선 사용합니다.
- 공통 컴포넌트는 필요한 경우 같은 폴더에 `index.ts`를 두어 export합니다.
- `Input`, `Textarea`처럼 입력 필드 성격의 UI는 `components/common/ui/field` 아래에 둡니다.
- 공통 컴포넌트의 배럴 export는 각 영역의 `index.ts`에서만 관리합니다.

## features 작성 기준

- 특정 기능에만 필요한 컴포넌트, 훅, 타입, 유틸은 `features/<feature-name>` 내부에 둡니다.
- 여러 기능에서 함께 쓰이면 `components/common`, `hooks`, `utils`, `constants`로 분리합니다.
- `features`끼리는 직접 import 하지 않습니다.
- feature 내부 구조는 필요한 폴더만 만듭니다.

예시

```text
src/features/post-create/
├── components
├── hooks
├── types
└── utils
```

현재 화면 기준 feature 예시

- `main`
- `post-create`
- `post-detail`
- `post-edit`
- `my-page`

## 스토리북 규칙

- 공통 UI 컴포넌트는 가능하면 같은 폴더에 story를 작성합니다.
- 스토리 파일명은 `*.stories.tsx` 형식을 사용합니다.

## 커밋 전 체크

- 불필요한 콘솔 로그 제거
- 사용하지 않는 import 제거
- 네이밍 규칙 확인
- 공통 컴포넌트 분리 필요 여부 확인
- `@/*` alias 사용 일관성 확인
