# Data Model — 007-vite-antd-update

**Branch**: `007-vite-antd-update` | **Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

> Phase 1 output — entities extracted from functional requirements. No persistence layer; entities are configuration/manifest artifacts.

## Entity 1: Package Manifest

**Description**: Declares direct dependencies and locked transitive versions. Comprises `package.json` (authoritative range declaration) and `package-lock.json` (deterministic lock).

| Field | Type | Validation Rule (from FR) | Notes |
|-------|------|---------------------------|-------|
| `vite` | string (semver caret range) | MUST be `^8.2.2` (or newer patch `^8.2.x` within 8.x) — FR-001 | Updated from `^7.2.4` |
| `@vitejs/plugin-react` | string (semver caret range) | MUST be `^6.1.1` (or newer patch `^6.x`) — FR-002 | Paired with Vite 8 |
| `antd` | string (semver caret range) | MUST be `^6.6.2` (or newer patch `^6.6.x`) — FR-003 | Updated from `^6.1.2` |
| `@ant-design/icons` | string (semver caret range) | MUST be latest caret `^6.x` compatible with `antd` 6.6.2 — FR-004 | Update if newer exists |
| Other deps (`react`, `react-dom`, `react-router-dom`, `@tanstack/react-query`, `axios`, `yup`, `typescript`, `eslint`, etc.) | string | MUST remain unchanged unless incompatibility proven — FR-008 | Any extra bump requires justification in PR |
| `scripts` (`dev`, `build`, `preview`, `lint`) | string | MUST be preserved and succeed — FR-006, FR-011 | No script changes expected |
| `engines` | absent | MUST NOT be added/modified (Q3) | Node requirement documented only |
| `package-lock.json` | lockfile | MUST be regenerated and committed, consistent with `package.json` — FR-009 | `npm install` derived |

**Relationships**:
- References `Build Configuration` (Vite version dictates compatible plugin and Node requirement).
- References `UI Component Library Instance` (antd version dictates icons peer).

**Lifecycle / State Transitions**:
```
[Baseline: vite ^7.2.4, antd ^6.1.2] --(npm install after package.json edit)--> [Upgraded: vite ^8.2.2, antd ^6.6.2, lockfile regenerated] --(npm run lint/build/dev)--> [Verified]
```
Invalid transition if `npm install` reports peer conflict → must correct before committing.

**Identity & Uniqueness**: Single manifest per repo root; uniqueness by `name: vite-spec-kit`.

---

## Entity 2: Build Configuration

**Description**: Tooling config that drives dev server, type-checking, and production bundling.

| Field | Type | Validation Rule | Notes |
|-------|------|-----------------|-------|
| `vite.config.ts` | file (TypeScript) | MUST remain valid for Vite 8; no deprecated options — FR-007, Spec Story 1 Scenario 4 | Currently: `defineConfig({ plugins: [react({ babel: { plugins: [['babel-plugin-react-compiler']] } })] })` |
| `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` | file | MUST remain compatible; `tsc -b` must pass | No changes expected unless Vite 8 needs `moduleResolution` tweak (unlikely) |
| `eslint.config.js` | file | MUST still pass `npm run lint` with updated Vite 8 | No config change expected |
| `index.html` | file | Unchanged | Entry for Vite build |
| Node.js runtime | external | Documented minimum `20.19+` (Vite 8) — not enforced via `engines` | Assumption: developer upgrades Node if needed |

**Relationships**:
- Depends on `Package Manifest` Vite version.

**Lifecycle**:
```
[Current vite.config.ts] --(if Vite 8 breaking change)--> [Migrated vite.config.ts (minimal, semantics-preserving)] --(vite build/dev succeeds)--> [Verified]
```
If no breaking change, lifecycle is identity (no transition).

---

## Entity 3: UI Component Library Instance

**Description**: Installed runtime of Ant Design that provides design tokens, theming, and components.

| Field | Type | Validation Rule | Notes |
|-------|------|-----------------|-------|
| `antd` runtime | npm package `^6.6.2` | MUST render without console errors / deprecated warnings — FR-010, Story 2 Scenario 2 | Covers Button, Form, Input, Modal, message, Table, etc. |
| `@ant-design/icons` runtime | npm package `^6.x` | MUST be peer-compatible |  |
| Theme customizations | React context `ThemeContext` / `themeConstants.ts` | MUST continue to apply (specs 005/006 fixes) | Verified via modal/message themed renders |
| Component usage | imports in `src/components/*`, `src/pages/*` | MUST exhibit identical behavior post-upgrade — Story 2 Scenario 3 | Forms with Yup validation, Post list/card/detail |

**Relationships**:
- Installed per `Package Manifest` `antd` range.
- Rendered via React 19.2.0 tree in `src/App.tsx` → `ThemeProvider` → routes.

**Validation Rules**:
- No visual regression across all routes (Home/Create/Edit/Detail) — SC-004.
- No deprecated API warnings for used Ant Design APIs.

## Cross-Entity Constraints

- All three entities must be consistent: `Package Manifest` versions drive `Build Configuration` Vite compatibility and `UI Component Library` peer compatibility. `npm list vite antd` is the source of truth (SC-005).
- Git diff scope constraint (SC-006): only `package.json` + `package-lock.json` + minimal `vite.config.ts` delta allowed.

## Scale / Volume

- Single instance of each entity (repo-wide). No data volume concerns.

## Notes

- No persistence; no privacy/compliance data; no concurrency/conflict resolution beyond lockfile commit atomicity.
