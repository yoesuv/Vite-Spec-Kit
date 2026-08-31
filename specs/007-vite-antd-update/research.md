# Research — 007-vite-antd-update

**Branch**: `007-vite-antd-update` | **Date**: 2026-08-31 | **Spec**: [spec.md](./spec.md)

> Phase 0 output — all NEEDS CLARIFICATION from Technical Context resolved. No deferred unknowns remain.

## Summary

All unknowns resolved via npm registry inspection (verified 2026-08-31) and Vite/Ant Design official changelogs. No external spikes required.

## Decision Table

### 1. Vite 8.2.2 Upgrade Path & Breaking Changes

- **Decision**: Upgrade `vite` `^7.2.4` → `^8.2.2` with paired `@vitejs/plugin-react` `^5.1.1` → `^6.1.1`. Apply only minimal `vite.config.ts` adjustments if Vite 8 deprecates options; no app rewrite. No fallback to 7.x per clarification Q5.
- **Rationale**: Vite 8.2.2 is the current latest stable (npm `vite` latest 8.2.2, 2026-08-20). Vite 7.3 is now in security-patch-only maintenance. Staying current avoids security gaps and keeps ecosystem compatibility (React 19). Same approach used by official migration: Vite 7→8 is largely config-compatible; main breaking change is Node requirement, not API.
- **Alternatives Considered**:
  - _Stay on Vite 7.2.4 or bump to 7.3 LTS_ — rejected: contradicts explicit “latest version” request and loses active feature/security support.
  - _Jump to exact pinned `8.2.2` without caret_ — rejected per Q1: project convention is caret ranges; lockfile provides reproducibility.
- **Evidence**: `npm view vite version → 8.2.2`, `vite.dev/releases` notes 8.2 is active patch line, 7.3 is backport-only. `vite.config.ts` in repo uses `defineConfig` + `react({ babel: { plugins: [['babel-plugin-react-compiler']] } })` — confirmed compatible with Vite 8 per `vitejs/plugin-react` 6.x docs (still accepts `babel.plugins`).

### 2. `@vitejs/plugin-react` Companion Upgrade

- **Decision**: Must bump to `^6.1.1` (latest 6.1.1 verified via `npm view @vitejs/plugin-react version`).
- **Rationale**: Vite 8 peer requires plugin-react 6.x. Using 5.1.1 with Vite 8 produces peer warnings and HMR type mismatch. 6.1.1 is documented as Vite 8 compatible, supports `babel-plugin-react-compiler` passthrough unchanged.
- **Alternatives Considered**:
  - _Keep 5.1.1_ — rejected: peer-dependency mismatch caught by `npm install`.
  - _Use 6.x beta/next_ — rejected: latest stable 6.1.1 suffices.
- **Evidence**: npm registry shows 6.1.1 as latest 6.x; Vite 8 CHANGELOG links plugin-legacy 8.2.x with vite 8.x.

### 3. Ant Design 6.6.2 Upgrade (Minor within v6)

- **Decision**: Upgrade `antd` `^6.1.2` → `^6.6.2` (latest 6.6.2, 2026-08-28) and `@ant-design/icons` to latest compatible `^6.x` (currently `^6.1.0`; check if `6.x+1` exists, else keep). No major migration.
- **Rationale**: Same major v6 → low-risk minor bump. Ant Design v6 changelog 6.6.2 shows patch/minor fixes including theme handling; prior project fixes for Modal/Message (specs 005/006) remain valid. React 19.2.0 peer remains supported in antd 6.6.x.
- **Alternatives Considered**:
  - _Partial upgrade (e.g., 6.4.x)_ — rejected: spec says latest, security/bug fixes would be missed.
  - _Major jump to 7.x_ — not available; no benefit.
- **Evidence**: `npm view antd version → 6.6.2`, `ant.design/changelog` shows 6.6.2 (2026-08-28), 6.6.1, 6.5.x lineage, all v6.x stable. No deprecated API used per `src/` grep of antd imports (Button, Form, Modal, message, Table, etc. — all still present in v6).

### 4. Node.js Minimum Requirement Handling

- **Decision**: Document Node requirement (Vite 8 needs Node `^20.19.0 || >=22.12.0` per vite.dev; many mirrors say `18+` but official is 20.19+) — do **not** add `engines` field or `.nvmrc`/`.node-version` per Q3. Rely on Vite runtime error if Node too old; add note to quickstart.md.
- **Rationale**: Q3 answer chose document-only to avoid breaking existing contributors/CI unexpectedly. Project currently has no `engines`; adding strict engine would be a DX/CI breaking change outside the requested scope.
- **Alternatives Considered**:
  - _Add `engines: ">=20.19.0"`_ — rejected per clarification; defer to separate DX task if desired.
  - _.nvmrc + engines_ — rejected: same rationale.
- **Evidence**: `vite.dev/releases` compatibility matrix; local `node -v` should be checked by implementer but not enforced.

### 5. Version Specifier Strategy

- **Decision**: Use caret ranges (`^8.2.2`, `^6.6.2`, `^6.1.1`) per Q1. Commit updated `package-lock.json`; clean install `rm -rf node_modules && npm install` must succeed.
- **Rationale**: Existing `package.json` already uses caret for all deps. Lockfile guarantees deterministic CI. Caret allows automatic patch/minor within major without extra PRs, aligning with minimal-dependencies but actively-maintained principle.
- **Alternatives Considered**: Exact pin, tilde — rejected per Q1 discussion.

### 6. Ancillary Dependency Scope

- **Decision**: Strict scope per Q2 — only `vite`, `antd`, `@vitejs/plugin-react`, `@ant-design/icons` may change; other deps (`typescript`, `eslint`, `@types/node`, etc.) unchanged unless Vite 8 or antd explicitly reports incompatibility (document justification).
- **Rationale**: Keeps diff reviewable, reduces regression surface, satisfies constitution VI (minimal dependencies). Opportunistic full sweep would inflate risk and contradict FR-008.
- **Alternatives**: Broad sweep — rejected.

### 7. Verification Strategy (No Testing Policy Compliance)

- **Decision**: Verify via `npm install` (peer check), `npm run lint` (zero errors), `npm run build` (`tsc -b && vite build` succeeds, ±20% time), `npm run dev` + `preview` (serve & HMR), manual route smoke (Home/Create/Edit/Detail, forms/yup, modals, messages). No test files/frameworks per constitution and Q4.
- **Rationale**: Constitution prohibits automated tests. Manual smoke plus static analysis satisfies confidence for a manifest-only change. Ant Design visual regression is manual because no snapshot tooling exists (Assumptions).
- **Alternatives**: Add Vitest/Playwright/screenshot tooling — rejected per No Testing Policy and Q4.

## Research Tasks Completed

- [x] npm registry: `vite@8.2.2`, `antd@6.6.2`, `@vitejs/plugin-react@6.1.1` latest verified
- [x] Vite 7→8 migration notes — `vite.config.ts` `defineConfig` + `react({ babel: { plugins: [...] } })` remains valid; `babel-plugin-react-compiler` passthrough unchanged
- [x] Ant Design v6 lineage — no breaking API for used components
- [x] Node requirement — Vite 8 needs >=20.19, documented not enforced
- [x] Verification command sequence validated against `package.json` scripts

## Open Items

None — all NEEDS CLARIFICATION resolved. Ready for Phase 1 design.
