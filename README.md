# React 모노레포 프로젝트

Turborepo을 사용한 React 모노레포 구조로, 여러 React 애플리케이션과 공유 패키지들을 효율적으로 관리합니다.

## 프로젝트 구조

### Apps (애플리케이션)

- `lean-canvas`: 린 캔버스 관리 애플리케이션
  - React 18 + TailwindCSS
  - React Query를 활용한 서버 상태 관리
  - React Router를 통한 SPA 라우팅
  - JSON Server를 활용한 목업 API

### Packages (공유 패키지)

- `@repo/ui`: 공유 React 컴포넌트 라이브러리
  - TypeScript 기반 컴포넌트
  - Button, Card, Code 등 기본 UI 컴포넌트

- `@repo/eslint-config`: ESLint 설정 공유 패키지
- `@repo/typescript-config`: TypeScript 설정 공유 패키지
- `@repo/tailwind-config`: Tailwind CSS 설정 공유 패키지
- `@repo/postcss-config`: PostCSS 설정 공유 패키지
- `@repo/vite-config`: Vite 설정 공유 패키지

## 기술 스택

- **모노레포 관리**: Turborepo
- **프론트엔드**: React 18/19, Vite
- **스타일링**: TailwindCSS, CSS Modules
- **상태 관리**: React Query, Context API, use-immer
- **라우팅**: React Router
- **개발 도구**: ESLint, Prettier, TypeScript
- **목업 서버**: JSON Server
