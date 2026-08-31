# Implementation Plan: Vite & Ant Design Version Upgrade

**Branch**: `007-vite-antd-update` | **Date**: 2026-08-31 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/007-vite-antd-update/spec.md`

## Summary

Update the core build toolchain (Vite `^7.2.4` → `^8.2.2` with `@vitejs/plugin-react` `^5.1.1` → `^6.1.1`) and UI library (Ant Design `^6.1.2` → `^6.6.2` + `@ant-design/icons` caret update) to their latest stable releases. Approach is a strictly scoped, caret-range `package.json` bump with committed `package-lock.json`, minimal `vite.config.ts` migration only if Vite 8 requires it, and verification via `npm install` → `npm run lint` → `npm run build` → `npm run dev`/`preview` plus manual route smoke test. No fallback to Vite 7, no unrelated dependency updates, no `engines` field change — Node requirement documented only.

## Technical Context

**Language/Version**: TypeScript `~5.9.3` (strict), React `19.2.0`, React DOM `19.2.0`  
**Primary Dependencies**: Vite `^7.2.4` → `^8.2.2`, `@vitejs/plugin-react` `^5.1.1` → `^6.1.1`, `antd` `^6.1.2` → `^6.6.2`, `@ant-design/icons` `^6.1.0` → latest `^6.x`, `react-router-dom` `^7.11.0`, `@tanstack/react-query` `^5.90.12`, `axios` `^1.13.2`, `yup` `^1.7.1`  
**Storage**: N/A — client-only SPA using JSONPlaceholder REST API (no persistence layer)  
**Testing**: NO TESTING (per constitution — supersedes spec). Verification via `lint` + `build` + manual smoke, no test frameworks/files.  
**Target Platform**: Web SPA — modern evergreen browsers, Vite dev server (`vite`), production static bundle (`vite build` → `dist/`), `vite preview`  
**Project Type**: Web application — single frontend project (Vite + React SPA)  
**Performance Goals**: Constitution: load <3s, interactive <100ms. Spec SC-001: `npm run build` within ±20% of baseline; SC-002: dev server ready <10s; theme/UX consistency preserved.  
**Constraints**: Constitution NON-NEGOTIABLE: minimal dependencies (strict scope FR-008), no testing, clean code, responsive-consistent UX. Clarifications: caret ranges only, document Node requirement without `engines`/`.nvmrc`, must achieve Vite 8 no fallback, `package-lock.json` committed, git diff limited to manifests + minimal config.  
**Scale/Scope**: Single Vite project — `src/` with ~5 pages (Home/Create/Edit/Detail), ~8 components (layout, common, posts), 1 API module, 1 hook, 1 schema; ~15 source files. No API/backend scope.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- [x] **I. Clean Code (NON-NEGOTIABLE)** — PASS. Change is declarative manifest bump + at most trivial `vite.config.ts` compatibility fix. No dead code, hack, or complexity introduced. `npm run lint` + `tsc -b` enforced.
- [x] **II. Simple UX** — PASS. No user-facing UX change intended; upgrade must preserve existing flows (FR-010). Smoke test guards against accidental UX complexity.
- [x] **III. Responsive Design (NON-NEGOTIABLE)** — PASS. No layout changes; Ant Design responsive primitives remain, theme fixes 005/006 preserved.
- [x] **IV. User Experience Consistency** — PASS. Ant Design stays within v6 (no major token rewrite). Design tokens/component library usage unchanged.
- [x] **V. Performance Requirements (NON-NEGOTIABLE)** — PASS. Vite 8 improves HMR/build performance; SC-001/SC-002 enforce no regression. Build output monitoring via `vite build` size.
- [x] **VI. Minimal Dependencies** — PASS. Strictly scoped update (FR-008) — only Vite/antd/plugin-react/icons; any extra dep bump requires documented justification. No new dependencies added.
- [x] **No Testing Policy (NON-NEGOTIABLE)** — PASS. Plan creates NO test files/frameworks. `quickstart.md` and `research.md` prescribe manual verification (`lint`/`build`/`dev`/`preview`/smoke), not automated tests. `data-model.md`/`contracts/` are design docs, not test suites.

**Gate Result**: ✅ PASS — No violations to justify. Proceed to Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/007-vite-antd-update/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output — Vite 8 / antd 6.6.2 decisions
├── data-model.md        # Phase 1 output — entities & validation rules
├── quickstart.md        # Phase 1 output — reproduction & verification steps
├── contracts/           # Phase 1 output — upgrade verification contracts
│   └── verification-contract.md
└── tasks.md             # Phase 2 output (/speckit.tasks — NOT created by /speckit.plan)
```

### Source Code (repository root — single Vite project)

```text
/
├── src/
│   ├── api/              # postsApi.ts (JSONPlaceholder)
│   ├── components/
│   │   ├── common/       # ErrorBoundary, PageHeader
│   │   ├── layout/       # AppLayout
│   │   └── posts/        # PostCard, PostForm, PostList, etc.
│   ├── contexts/         # ThemeContext, themeConstants
│   ├── hooks/            # usePosts
│   ├── pages/            # HomePage, CreatePage, EditPage, DetailPage
│   ├── schemas/          # postSchema (Yup)
│   ├── types/            # post.ts
│   ├── App.tsx
│   └── main.tsx
├── vite.config.ts        # May receive minimal Vite 8 compat adjustment (FR-007)
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── eslint.config.js
├── package.json          # Target: vite ^8.2.2, antd ^6.6.2, @vitejs/plugin-react ^6.1.1
├── package-lock.json     # Committed, regenerated after bump
├── index.html
└── public/
```

**Structure Decision**: Single project (Vite SPA) — no backend/frontend split, no mobile. Documentation co-located under `specs/007-vite-antd-update/`. All source changes confined to manifests, lockfile, and at most `vite.config.ts`.

## Complexity Tracking

> No constitution violations require justification. Table intentionally empty.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|--------------------------------------|
| — | — | — |
