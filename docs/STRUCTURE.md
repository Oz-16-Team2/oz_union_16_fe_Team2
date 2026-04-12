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
├── assets
│   └── images
├── components
│   ├── common
│   └── layouts
├── constants
├── features
├── hooks
│   └── queries
├── mocks
├── pages
├── router
└── utils
```

`features`는 도입 예정 폴더입니다.

## 폴더 설명

- `src/assets/images`: 이미지 리소스
- `src/components/common`: 여러 곳에서 재사용하는 공통 UI
- `src/components/layouts`: Header, Footer, RootLayout 같은 공통 레이아웃
- `src/constants`: 여러 곳에서 공유하는 상수
- `src/features`: 기능 단위 코드
- `src/hooks`: 여러 곳에서 재사용하는 커스텀 훅
- `src/hooks/queries`: 서버 상태, API 요청 관련 훅
- `src/mocks`: MSW mock handler와 설정
- `src/pages`: 라우트 단위 화면 컴포넌트
- `src/router`: 라우팅 설정
- `src/utils`: 공통 유틸 함수

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
src/components/common/badge/
├── Badge.tsx
├── Badge.stories.tsx
└── index.ts
```
