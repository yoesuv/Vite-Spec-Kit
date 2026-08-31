---
description: "Task list for Vite & Ant Design version upgrade"
---

# Tasks: Vite & Ant Design Version Upgrade

**Input**: Design documents from `/specs/007-vite-antd-update/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/
**Branch**: `007-vite-antd-update` | **Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

**Tests**: NO TESTING per constitution - this supersedes all other guidance. Any test-related tasks are prohibited.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/` at repository root (NO TESTING per constitution)
- Paths assume single project per plan.md structure decision

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Baseline capture and prerequisite checks before any manifest edits

- [x] T001 Capture baseline versions from `package.json` and `package-lock.json` via `npm list vite antd @vitejs/plugin-react @ant-design/icons` and record current `npm run lint`/`npm run build` outputs
- [x] T002 [P] Verify Node.js runtime meets Vite 8 requirement (≥20.19.0) via `node -v` and npm registry access to `vite@8.2.2` / `antd@6.6.2` per `research.md` (no file change, document outcome in quickstart verification notes)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish clean, reproducible starting point that MUST be complete before ANY user story work

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Ensure clean working tree on branch `007-vite-antd-update` and baseline `npm run lint` + `npm run build` (`tsc -b && vite build`) pass with exit 0 per `contracts/verification-contract.md` V-03/V-04
- [x] T004 [P] Review `vite.config.ts`, `tsconfig.json`, `eslint.config.js`, and `src/contexts/ThemeContext.tsx` to confirm current Vite 7 / antd 6.1.2 baseline compatibility (no edits yet), referencing `data-model.md` Entity 2/3

**Checkpoint**: Foundation ready — `npm install`/`lint`/`build` baseline clean, branch verified, quickstart.md steps 1-2 understood

---

## Phase 3: User Story 1 - Upgrade Vite to Latest Stable (Priority: P1) 🎯 MVP

**Goal**: Update Vite `^7.2.4` → `^8.2.2` with compatible `@vitejs/plugin-react` `^5.1.1` → `^6.1.1` so toolchain is current without touching UI logic

**Independent Test**: Can be fully tested by updating only Vite+plugin in `package.json`, running `npm install`, `npm run dev` (dev server starts <10s, HMR works), `npm run build` (`tsc -b && vite build` succeeds producing `dist/`), and `npm run preview` serves — no Ant Design changes needed; delivers value by confirming toolchain is current

### Tests for User Story 1 - PROHIBITED ⚠️

> **CONSTITUTION OVERRIDE**: NO TESTING permitted - this supersedes all other guidance

### Implementation for User Story 1

- [x] T005 [US1] Update Vite and companion plugin to caret ranges `vite: ^8.2.2` and `@vitejs/plugin-react: ^6.1.1` in `package.json` (strict scope per FR-008, Q2)
- [x] T006 [US1] Run `npm install` and verify peer-dependency clean + regenerated `package-lock.json` via `npm list vite @vitejs/plugin-react` in `package-lock.json`
- [x] T007 [US1] Verify `vite.config.ts` still valid for Vite 8 (no deprecated options) and apply minimal migration only if `vite build` fails per `data-model.md` Entity 2; ensure `react({ babel: { plugins: [['babel-plugin-react-compiler']] } })` passthrough remains in `vite.config.ts`
- [x] T008 [US1] Validate Vite upgrade independently: `npm run lint` (exit 0, FR-011), `npm run build` (`tsc -b && vite build` exit 0, dist/ emitted, ±20% time, FR-006), `npm run dev` (serves <10s, HMR on `src/App.tsx` edit) per `spec.md` US1 Acceptance Scenarios 1-4 and `contracts/verification-contract.md` V-01/V-03/V-04/V-05

**Checkpoint**: At this point, User Story 1 should be fully functional — Vite 8 toolchain verified independently (can be demoed without Ant Design bump)

---

## Phase 4: User Story 2 - Upgrade Ant Design to Latest Stable (Priority: P1)

**Goal**: Update Ant Design `^6.1.2` → `^6.6.2` plus `@ant-design/icons` `^6.x` latest compatible so UI library is secure and theme-aware with no visual regression

**Independent Test**: Can be fully tested by updating only `antd`+icons in `package.json`, reinstalling (`npm install` no peer conflict with React 19.2.0), building (`npm run build` succeeds), and smoke-testing all routes that use Ant Design (forms/Yup, post list/detail, modals, messages) — theme customizations from `005-modal-theme-fix`/`006-message-theme-fix` (`src/contexts/ThemeContext.tsx`, `themeConstants.ts`) must still apply, no deprecated warnings

### Tests for User Story 2 - PROHIBITED ⚠️

> **CONSTITUTION OVERRIDE**: NO TESTING permitted

### Implementation for User Story 2

- [x] T009 [US2] Update Ant Design to caret ranges `antd: ^6.6.2` and `@ant-design/icons: ^6.x` (check `npm view @ant-design/icons version` for latest 6.x; keep `^6.1.0` if still latest) in `package.json` per FR-003/FR-004
- [x] T010 [US2] Run `npm install` and verify `package-lock.json` regenerated via `npm list antd @ant-design/icons` with no peer conflict against `react@19.2.0` per FR-005 and `contracts/verification-contract.md` V-01/V-02
- [x] T011 [US2] Verify theme preservation: confirm `src/contexts/ThemeContext.tsx` and `src/components/layout/AppLayout.tsx` Ant Design `ConfigProvider` tokens still apply; inspect `src/components/posts/PostForm.tsx`, `src/components/common/ErrorBoundary.tsx` and modal/message usages for no deprecated API warnings per FR-010 and `data-model.md` Entity 3
- [x] T012 [US2] Manual visual regression check across all routes in `src/pages/HomePage.tsx`, `src/pages/CreatePage.tsx`, `src/pages/EditPage.tsx`, `src/pages/DetailPage.tsx` and components in `src/components/posts/PostList.tsx`, `PostCard.tsx`, `PostForm.tsx` per `spec.md` US2 Scenarios 2-3 and `quickstart.md` step 7 (forms, post list/detail, modals, messages behave identically)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently — Vite 8 + antd 6.6.2 each verified; combined install still peer-clean

---

## Phase 5: User Story 3 - Verify No Regressions and Consistent Toolchain (Priority: P2)

**Goal**: Holistically verify combined Vite+antd upgrades produce no regressions in lint, type-check, routing, data fetching, or deployment and diff scope is minimal

**Independent Test**: Can be fully tested by running full suite `npm run lint` + `npm run build` (both exit 0, no new warnings), inspecting `package.json`/`package-lock.json` (caret ranges `^8.2.2`/`^6.6.2`, no duplicates), and reviewing `git diff --stat` (only manifests + minimal `vite.config.ts`) — guarantees shippability

### Tests for User Story 3 - PROHIBITED ⚠️

> **CONSTITUTION OVERRIDE**: NO TESTING permitted

### Implementation for User Story 3

- [x] T013 [US3] Run combined verification suite `npm run lint` and `npm run build` (`tsc -b && vite build`) per `spec.md` US3 Scenario 1 and `contracts/verification-contract.md` V-03/V-04; confirm zero new errors vs baseline recorded in T001
- [x] T014 [US3] Inspect manifests and installed versions via `npm list vite antd` and `package-lock.json` diff to confirm caret ranges `^8.2.2` / `^6.6.2` present, no duplicate/conflicting versions, and `package-lock.json` consistent with `package.json` per FR-009, SC-005, and `data-model.md` Entity 1
- [x] T015 [US3] Audit git diff scope via `git diff --stat` and `git diff package.json` to ensure only `package.json`, `package-lock.json`, and minimal `vite.config.ts` changes exist with no unrelated file edits per SC-006, FR-008, and `contracts/verification-contract.md` V-08; document any justified transitive bump in PR description if FR-008 exception triggered
- [x] T016 [US3] Execute manual smoke of all routes and `npm run preview` serve per `quickstart.md` steps 6-7 and `contracts/verification-contract.md` V-06/V-07: `src/pages/HomePage.tsx` (`/`), `src/pages/CreatePage.tsx` (`/create`), `src/pages/EditPage.tsx` (`/edit/:id`), `src/pages/DetailPage.tsx` (`/post/:id`) plus `src/api/postsApi.ts` data fetching and `src/schemas/postSchema.ts` Yup validation

**Checkpoint**: All three user stories independently functional; combined toolchain shippable per SC-001–SC-007

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final reproducibility, documentation, and handover without scope creep

- [x] T017 Verify clean-install reproducibility via `rm -rf node_modules && npm install` (exit 0, no `--force`) and `npm run preview` serves correctly per `spec.md` SC-007 and `quickstart.md` step 9, referencing `package-lock.json`
- [x] T018 [P] Update PR description / `specs/007-vite-antd-update/quickstart.md` notes with final version evidence (`npm list vite antd @vitejs/plugin-react`), Node requirement documentation (no `engines` per Q3), and any FR-008 justification if transitive bump occurred
- [x] T019 Final `git status` audit and `npm run build` time comparison logging (±20% baseline) per SC-001; ensure `dist/` build output size not regressed

# NO TESTING TASKS (per constitution)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in priority order (P1 → P1 → P2) or US1/US2 partially in parallel if staffing allows, but **shared file `package.json`/`package-lock.json` and `vite.config.ts` requires sequential commits** — prefer US1 → US2 → US3 sequential to avoid merge conflict
  - US3 (P2 verification) depends on US1 and US2 both committed
- **Polish (Final Phase)**: Depends on all desired user stories being complete (US1+US2+US3)

### User Story Dependencies

- **User Story 1 (P1) — Vite**: Can start after Foundational (Phase 2) — No dependencies on other stories; independently testable via `npm run dev/build/preview` without antd changes
- **User Story 2 (P1) — Ant Design**: Can start after Foundational (Phase 2) — May assume US1 Vite 8 present for final verification, but can be independently tested on top of US1; strict scope `package.json` edit conflicts with US1 if done concurrently → sequence US1 then US2
- **User Story 3 (P2) — Verification**: Can start after US1 and US2 — Verifies combined toolchain; requires both upgrades present to run full contract

### Within Each User Story

# NO TESTING (per constitution - supersedes all guidance)

- Manifest edit before install (`package.json` → `npm install` → `package-lock.json`)
- Install before verification (`npm install` before `lint`/`build`/`dev`)
- Core implementation before smoke/integration (version bump before route checks)
- Story complete before moving to next priority

### Parallel Opportunities

- T002 Node/registry check can run in parallel with T001 baseline capture (different concerns, no file overlap)
- T004 config review can run in parallel with T003 baseline lint/build (different files, read-only vs exec)
- Within US3, T014 manifest inspection and T016 route smoke could be parallelized after T013 lint/build passes (different verifications)
- T018 documentation update can run in parallel with T017 clean-install reproducibility (different artifacts)
- **Limited parallelism overall**: Most tasks edit the **same file** `package.json`/`package-lock.json` and therefore must be sequential; do not parallelize T005/T006/T009/T010 across developers

---

## Parallel Example: Setup Phase (Allowed)

```bash
# T001 and T002 are parallelizable (one records build outputs, one checks Node/registry):
Task T001: "Capture baseline via npm list vite antd and npm run lint/build"
Task T002: "Verify Node.js >=20.19.0 and registry access to vite@8.2.2/antd@6.6.2"

# Foundational read-only checks can overlap:
Task T003: "Ensure clean tree and baseline lint/build pass"
Task T004: "Review vite.config.ts, tsconfig.json, eslint.config.js, ThemeContext.tsx"
```

## Parallel Example: Polish Phase (Allowed)

```bash
# After US3, two polish tasks touch different artifacts:
Task T017: "rm -rf node_modules && npm install + preview reproducibility on package-lock.json"
Task T018: "PR description + quickstart.md handover notes (documentation)"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T002)
2. Complete Phase 2: Foundational (T003-T004) — CRITICAL blocks all stories
3. Complete Phase 3: User Story 1 (T005-T008) — Vite 8.2.2 + plugin 6.1.1
4. **STOP and VALIDATE**: US1 independent test per checkpoint (dev <10s, HMR, build succeeds, lint zero) → Deploy/demo if ready (toolchain current)

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. Add US1 → Test independently → Demo (MVP — Vite latest)
3. Add US2 → Test independently → Demo (UI library current, theme preserved)
4. Add US3 → Full combined verification → Ship (no regressions, diff-scope audit)
5. Polish (T017-T019) → Reproducible install, documented handover
6. Each story adds value without breaking previous stories; US1 and US2 share P1 priority so either order works but sequential commit on `package.json` avoids conflicts

### Parallel Team Strategy

With multiple developers (constrained by shared manifest file):

1. Team completes Setup + Foundational together
2. US1 owner finishes T005-T008 and commits Vite bump first
3. US2 owner rebases, then does T009-T012 for antd bump
4. Either same or third developer does US3 verification (T013-T016) on combined tree
5. Polish tasks T017/T018 can be split if branching allows
6. If strictly parallel needed, split by file review (one dev owns `vite.config.ts` HMR checks, other owns `ThemeContext` visual checks) but merge to single `package.json` commit

---

## Notes

- [P] tasks = different files, no dependencies (Setup T002, Foundational T004, Polish T018)
- [Story] label maps task to specific user story for traceability — Setup/Foundational/Polish intentionally have no label
- Each user story independently completable and testable via its checkpoint (US1 via `npm run dev/build`, US2 via route smoke, US3 via full suite)
- NO TESTING verification needed (per constitution) — manual verification via `contracts/verification-contract.md` and `quickstart.md` only
- Commit after each task or logical group (e.g., after T006 install, after T008 Vite validation) — stop at any checkpoint to validate story independently
- Avoid: vague tasks, same-file parallel edits on `package.json`, cross-story dependencies that break independence, adding test files

---

## Summary Metrics (for reporting)

- **Total tasks**: 19
- **Setup**: 2 (T001-T002)
- **Foundational**: 2 (T003-T004)
- **US1 Vite (P1)**: 4 (T005-T008)
- **US2 Ant Design (P1)**: 4 (T009-T012)
- **US3 Verification (P2)**: 4 (T013-T016)
- **Polish**: 3 (T017-T019)
- **Parallel opportunities**: 4 (T002 vs T001, T004 vs T003, T014/T016 partial after T013, T018 vs T017)
- **Story-labeled tasks**: 12 (all P1/P2 stories)
- **MVP scope**: US1 alone (T001-T008) delivers toolchain currency; +US2 completes both “latest” goals; +US3 ensures shippability
