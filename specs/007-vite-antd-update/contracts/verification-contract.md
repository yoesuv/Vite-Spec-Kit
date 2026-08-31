# Verification Contract — 007-vite-antd-update

**Branch**: `007-vite-antd-update` | **Spec**: [spec.md](../spec.md) | **Plan**: [plan.md](../plan.md)

> Phase 1 contract — defines the observable verification protocol for the dependency upgrade. No REST/GraphQL API is introduced; contract specifies installation, build, dev, preview, and smoke expectations that an implementation MUST satisfy. Constitution: NO TESTING — this contract is a manual verification checklist, not an automated test suite.

## Contract: Dependency Upgrade Verification

### Preconditions

- Git branch `007-vite-antd-update` checked out from `develop`.
- Node.js meets Vite 8 requirement (documented `20.19+`; not enforced via `engines`).
- Network access to npm registry.
- Clean working tree (`git status` clean aside from intended changes).

### Inputs (Actor Actions)

| Step | Actor | Action | Expected Command |
|------|-------|--------|------------------|
| 1 | Developer | Update manifests | Edit `package.json` to set `vite: ^8.2.2`, `@vitejs/plugin-react: ^6.1.1`, `antd: ^6.6.2`, `@ant-design/icons: latest ^6.x` |
| 2 | Developer | Install | `rm -rf node_modules && npm install` |
| 3 | Developer | Type-check & build | `npm run build` (`tsc -b && vite build`) |
| 4 | Developer | Lint | `npm run lint` |
| 5 | Developer | Dev serve | `npm run dev` |
| 6 | Developer | Preview serve | `npm run build && npm run preview` (optional) |
| 7 | Developer | Manual smoke | Open each route and exercise Ant Design components |
| 8 | Reviewer | Diff audit | `git diff --stat` and `npm list vite antd` |

### Success Responses (Expected Outcomes)

| # | Criterion | Spec Trace | Success Condition |
|---|-----------|------------|-------------------|
| V-01 | Install peer clean | FR-005, SC-007 | `npm install` exits 0, zero `ERESOLVE` peer errors; no `--force`/`--legacy-peer-deps` needed |
| V-02 | Lockfile consistent | FR-009 | `package-lock.json` present, `npm ci` (or clean `npm install`) reproducibility; `npm list vite` shows `8.2.2+`, `npm list antd` shows `6.6.2+` (caret range) |
| V-03 | Type-check + build | FR-006, SC-001 | `npm run build` exits 0; `dist/` emitted; time within ±20% of baseline |
| V-04 | Lint | FR-011, SC-003 | `npm run lint` exits 0, zero new errors vs baseline |
| V-05 | Dev server | SC-002 | `npm run dev` serves on `http://localhost:5173` (or configured port) <10s, HMR works for trivial `src/App.tsx` edit |
| V-06 | Theme preservation | FR-010, Story 2 Scenarios 2-3 | Modal (`AppLayout`/`CreatePage`/`EditPage`) and `message` API rendered via Ant Design show theme tokens (from 005/006) — no style regression, no console warnings |
| V-07 | Route smoke | Story 2 Scenario 3, SC-004 | `GET /` HomePage list renders (PostList, PostCard), `/create` PostForm + Yup validation works, `/edit/:id` loads and saves, `/post/:id` DetailPage renders — all Ant Design components functional |
| V-08 | Diff scope | SC-006, FR-008 | `git diff --stat` shows only `package.json`, `package-lock.json`, and (if needed) minimal `vite.config.ts` — no unrelated file changes; any extra dep justification documented in PR description |
| V-09 | Config validity | FR-007, Story 1 Scenario 4 | `vite.config.ts` contains no deprecated Vite 7 options; `eslint` flat config still valid |

### Failure Responses (Negative Scenarios)

| Condition | Required Behavior |
|-----------|-------------------|
| `npm install` peer ERESOLVE | Fail contract — correct `@vitejs/plugin-react` or icons version before proceeding; do not commit partial state. |
| `npm run build` TypeScript error | Fail — fix config/types; fallback to Vite 7 *not allowed* per Q5. |
| Node version too low | Vite/dev error surfaces; developer must upgrade Node (documented note in quickstart). No `engines` enforcement. |
| Theme regression | Fail — investigate Ant Design deprecation/codemod (should be none within v6); restore 005/006 tokens. |
| Any extra dep changed without justification | Fail — revert unrelated bump, keep strict scope. |

### Non-Goals (Out of Contract)

- Automated unit/visual regression tests (prohibited by constitution).
- Updating `engines`, `.nvmrc`, or unrelated deps.
- Backend/API changes.

## Execution Order (Quickstart Reference)

See `../quickstart.md` for the exact command sequence an implementer and reviewer must follow. This contract defines *what* must be true; quickstart defines *how* to execute it.
