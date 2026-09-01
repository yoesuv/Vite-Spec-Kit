# vite-spec-kit Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-01-07

## Current Stack (as of 007-vite-antd-update, merged)
- TypeScript `~5.9.3` (strict), React `19.2.0`, React DOM `19.2.0`
- Vite `^8.2.2` + `@vitejs/plugin-react` `^6.1.1`, `babel-plugin-react-compiler` `^1.0.0`
- antd `^6.6.2`, `@ant-design/icons` `^6.3.2`
- react-router-dom `^7.11.0`, @tanstack/react-query `^5.90.12`, axios `^1.13.2`, yup `^1.7.1`
- ESLint `^9.39.1` (flat config, typescript-eslint `^8.46.4`, eslint-plugin-react-hooks `^7.0.1`)
- Client-only SPA using JSONPlaceholder REST API (no persistence layer)

## Active Technologies (per feature plan)
- 007-vite-antd-update: TypeScript `~5.9.3` (strict), React `19.2.0` + Vite `^7.2.4` → `^8.2.2`, `@vitejs/plugin-react` `^5.1.1` → `^6.1.1`, `antd` `^6.1.2` → `^6.6.2`, `@ant-design/icons` `^6.1.0` → `^6.3.2`, react-router-dom `^7.11.0`, @tanstack/react-query `^5.90.12`, axios `^1.13.2`, yup `^1.7.1`; client-only SPA using JSONPlaceholder REST API (no persistence layer)

- TypeScript ~5.9.3 + React 19.2.0, Ant Design 6.1.2, React Router DOM 7.11.0, TanStack Query 5.90.12 (006-message-theme-fix)
- N/A (stateless notifications) (006-message-theme-fix)

- TypeScript 5.9.3, React 19.2.0 + Ant Design 6.1.2, React Router DOM 7.11.0, TanStack React Query 5.90.12 (005-modal-theme-fix)
- N/A (UI-only fix) (005-modal-theme-fix)

- TypeScript 5.9.3, React 19.2.0 + Yup 1.7.1 (validation), Ant Design 6.1.2 (UI components), React Hook Form integration via Ant Design Form (001-form-validation)
- N/A (client-side validation only) (001-form-validation)
- TypeScript 5.9.3, React 19.2.0 + Vite 7.2.4, Ant Design 6.1.2, React Router 7.11.0, TanStack Query 5.90.12, Yup 1.7.1, Axios 1.13.2 (004-fix-post-edit-validation)
- N/A (uses JSONPlaceholder API for posts) (004-fix-post-edit-validation)

- TypeScript 5.x, React 18.x, Vite 5.x + Ant Design 5.x, Yup 1.x, TanStack Query 5.x, Axios 1.x, React Router 6.x (001-initial-page-setup)

## Project Structure

```text
src/
  api/          # axios client + JSONPlaceholder API calls
  components/
  contexts/     # theme provider (AntD App/ConfigProvider)
  hooks/
  pages/
  schemas/      # yup validation schemas
  types/
specs/          # speckit feature plans (001–007)
```

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — `tsc -b && vite build`
- `npm run lint` — ESLint (flat config)
- `npm run preview` — preview production build

## Code Style

TypeScript 5.9 (strict), React 19, Ant Design 6, ESLint 9 flat config: follow standard conventions

## Recent Changes
- 007-vite-antd-update: Added TypeScript `~5.9.3` (strict), React `19.2.0`, React DOM `19.2.0` + Vite `^7.2.4` → `^8.2.2`, `@vitejs/plugin-react` `^5.1.1` → `^6.1.1`, `antd` `^6.1.2` → `^6.6.2`, `@ant-design/icons` `^6.1.0` → latest `^6.x`, `react-router-dom` `^7.11.0`, `@tanstack/react-query` `^5.90.12`, `axios` `^1.13.2`, `yup` `^1.7.1`
- 006-message-theme-fix: Added TypeScript ~5.9.3 + React 19.2.0, Ant Design 6.1.2, React Router DOM 7.11.0, TanStack Query 5.90.12
- 005-modal-theme-fix: Added TypeScript 5.9.3, React 19.2.0 + Ant Design 6.1.2, React Router DOM 7.11.0, TanStack React Query 5.90.12

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
