# vite-spec-kit Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-12-23

## Active Technologies
- TypeScript `~5.9.3` (strict), React `19.2.0`, React DOM `19.2.0` + Vite `^7.2.4` → `^8.2.2`, `@vitejs/plugin-react` `^5.1.1` → `^6.1.1`, `antd` `^6.1.2` → `^6.6.2`, `@ant-design/icons` `^6.1.0` → latest `^6.x`, `react-router-dom` `^7.11.0`, `@tanstack/react-query` `^5.90.12`, `axios` `^1.13.2`, `yup` `^1.7.1` (007-vite-antd-update)
- N/A — client-only SPA using JSONPlaceholder REST API (no persistence layer) (007-vite-antd-update)

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
tests/
```

## Commands

npm run lint && npm run build

## Code Style

TypeScript 5.x, React 18.x, Vite 5.x: Follow standard conventions

## Recent Changes
- 007-vite-antd-update: Added TypeScript `~5.9.3` (strict), React `19.2.0`, React DOM `19.2.0` + Vite `^7.2.4` → `^8.2.2`, `@vitejs/plugin-react` `^5.1.1` → `^6.1.1`, `antd` `^6.1.2` → `^6.6.2`, `@ant-design/icons` `^6.1.0` → latest `^6.x`, `react-router-dom` `^7.11.0`, `@tanstack/react-query` `^5.90.12`, `axios` `^1.13.2`, `yup` `^1.7.1`

- 006-message-theme-fix: Added TypeScript ~5.9.3 + React 19.2.0, Ant Design 6.1.2, React Router DOM 7.11.0, TanStack Query 5.90.12
- 005-modal-theme-fix: Added TypeScript 5.9.3, React 19.2.0 + Ant Design 6.1.2, React Router DOM 7.11.0, TanStack React Query 5.90.12

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
