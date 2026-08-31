# Feature Specification: Vite & Ant Design Version Upgrade

**Feature Branch**: `007-vite-antd-update`  
**Created**: 2026-08-31  
**Status**: Draft  
**Input**: User description: "update vite and antdesign to latest version"

## Clarifications

### Session 2026-08-31

- Q: When updating `package.json`, how should the new versions be specified (caret vs exact vs tilde)? → A: Use caret ranges (`^8.2.2`, `^6.6.2`, `^6.1.1`) matching existing project convention; reproducibility via lockfile.
- Q: Should the upgrade include only Vite/Ant Design + required peers, or also opportunistically update other dependencies? → A: Strictly scope to Vite, antd, `@vitejs/plugin-react`, and `@ant-design/icons` only — other deps updated only if explicitly required for compatibility (document justification).
- Q: How should the increased minimum Node.js requirement for Vite 8 be enforced? → A: Document the required Node version (no `engines` field change) and rely on Vite's runtime error if Node is too old.
- Q: What verification depth is sufficient to declare the upgrade successful? → A: Manual smoke test of every route plus `lint` and `build` passing — no new automated visual regression suite required.
- Q: If Vite 8.2.2 introduces a blocking incompatibility, should the work fall back to Vite 7? → A: Must resolve for Vite 8.2.2 — apply minimal codemods/config fixes; no fallback to 7.x.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Upgrade Vite to Latest Stable (Priority: P1)

A developer updates the Vite build tool from the current version (7.2.4) to the latest stable release (8.2.2 as of 2026-08-31) so the project benefits from security patches, performance improvements, and continued support.

**Why this priority**: Vite is the core build/dev server. Running an outdated major version (7.x vs 8.x) means missing security backports, losing access to Vite 8 features, and risking future incompatibility with ecosystem plugins. Upgrading is prerequisite for all other tooling work.

**Independent Test**: Can be fully tested by updating `vite` and its peer plugin `@vitejs/plugin-react` (5.1.1 → 6.1.1), running `npm install`, `npm run dev` (dev server starts), `npm run build` (production build succeeds), and `npm run preview` (built app serves). Delivers value by confirming the toolchain is current without touching UI logic.

**Acceptance Scenarios**:

1. **Given** the project on Vite 7.2.4 with a clean install, **When** the developer updates Vite to 8.2.2 (and compatible `@vitejs/plugin-react` to 6.1.1) and runs `npm install`, **Then** installation completes with no peer-dependency errors or warnings that block install.
2. **Given** the updated dependencies are installed, **When** the developer runs `npm run build` (`tsc -b && vite build`), **Then** TypeScript type-check passes and Vite production build completes successfully producing assets in `dist/`.
3. **Given** the updated project, **When** the developer runs `npm run dev`, **Then** the Vite dev server starts within the normal time window, serves the app at localhost, and hot-module-replacement works for a trivial edit.
4. **Given** Vite 8.x introduces breaking changes, **When** migration notes are applied, **Then** `vite.config.ts` remains valid (no deprecated options) and `eslint` (`npm run lint`) passes without new errors.

---

### User Story 2 - Upgrade Ant Design to Latest Stable (Priority: P1)

A developer updates Ant Design from 6.1.2 to the latest stable release (6.6.2 as of 2026-08-31) along with `@ant-design/icons` (6.1.0 → latest compatible) so the UI library is up-to-date, secure, and theme-aware.

**Why this priority**: Ant Design is the primary UI framework. Staying current ensures bug fixes (including theme handling for Modal/Message addressed in 005/006), accessibility improvements, and React 19 compatibility. The upgrade is low-risk (same major v6) but must be verified for visual regression.

**Independent Test**: Can be fully tested by updating `antd` and `@ant-design/icons`, reinstalling, building, and manually/smoke-testing pages that use Ant Design components (forms, modals, messages). Delivers value by confirming no visual or functional regression after the UI library bump.

**Acceptance Scenarios**:

1. **Given** the project on antd 6.1.2, **When** antd is updated to 6.6.2 (and icons to latest 6.x compatible) and `npm install` is run, **Then** install succeeds without peer conflicts with React 19.2.0.
2. **Given** the updated Ant Design is installed, **When** the app is built and served, **Then** all existing Ant Design components render without console errors, theme customizations (from 005-modal-theme-fix, 006-message-theme-fix) continue to apply, and no deprecated API warnings appear for used components.
3. **Given** the app is running with the new Ant Design, **When** a user exercises existing flows (forms with Yup validation, post list/detail, modals, messages), **Then** component behavior is identical to pre-upgrade (styles, interactions, accessibility attributes preserved).

---

### User Story 3 - Verify No Regressions and Consistent Toolchain (Priority: P2)

A developer and reviewer verify that updating Vite and Ant Design together does not introduce regressions in linting, type-checking, routing, data fetching, or deployment.

**Why this priority**: Combined upgrades can surface transitive incompatibilities (e.g., Vite 8 + plugin-react 6 + React 19 + Ant Design 6). A holistic verification prevents shipping subtle breakages.

**Independent Test**: Can be fully tested by running the full verification suite: `npm run lint`, `npm run build`, and manual smoke test of all routes. Delivers value by guaranteeing the project is shippable after the version bumps.

**Acceptance Scenarios**:

1. **Given** both Vite and Ant Design have been updated, **When** `npm run lint` and `npm run build` are executed in CI/locally, **Then** both commands exit with code 0 and produce no new warnings compared to baseline.
2. **Given** the upgraded project, **When** `package.json` and lockfile are inspected, **Then** version ranges point to the latest stable releases (Vite ~8.2.2, antd ~6.6.2), lockfile is updated, and no duplicate/conflicting versions of Vite or Ant Design remain.
3. **Given** the upgraded project, **When** a reviewer checks git diff, **Then** only expected files changed (package.json, lockfile, and minimal config/migration adjustments if required) with no unrelated code changes.

---

### Edge Cases

- What happens when Vite 8 requires a higher Node.js version than the developer's current environment? — Build/dev should fail with a clear Node version error; documentation should note minimum Node requirement and developer must upgrade Node before proceeding.
- How does system handle incompatible peer dependency between `@vitejs/plugin-react` 5.x and Vite 8? — Install must be updated to `@vitejs/plugin-react` 6.1.1 (or latest 6.x) as part of the upgrade; failure to do so should be caught as a peer-dependency warning during `npm install` and corrected.
- What happens when Ant Design 6.6.x deprecates an API currently in use? — Build should surface deprecation warnings; the upgrade must either be compatible without code changes (preferred for same major) or include minimal codemods without changing app behavior.
- How does system handle lockfile conflicts or cache staleness? — Clean install (`rm -rf node_modules && npm install`) must resolve it; lockfile must be committed and not left in a partial state.
- What happens when theme overrides break after upgrade? — Visual regression must be caught via smoke test; modal/message theme fixes from specs 005/006 must still pass their acceptance criteria.
- How does system handle network failure during `npm install` of latest versions? — Install should be retryable; no partial update should be committed until install succeeds.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST update Vite from `^7.2.4` to caret range `^8.2.2` (latest stable 8.x as of spec date) in `package.json`/`package-lock.json`.
- **FR-002**: System MUST update `@vitejs/plugin-react` from `^5.1.1` to caret range `^6.1.1` (latest compatible 6.x required by Vite 8).
- **FR-003**: System MUST update Ant Design (`antd`) from `^6.1.2` to caret range `^6.6.2` (latest stable 6.x as of spec date).
- **FR-004**: System MUST update `@ant-design/icons` to the latest compatible caret range (e.g., `^6.x`) if a newer version exists that matches the new `antd` peer requirements.
- **FR-005**: System MUST ensure `npm install` completes without unresolved peer-dependency errors after the version bumps.
- **FR-006**: System MUST preserve existing build scripts (`dev`, `build`, `preview`, `lint`) and ensure they succeed with new versions (`tsc -b && vite build` and `vite` dev server).
- **FR-007**: System MUST achieve Vite `^8.2.2` with no fallback to 7.x — apply any required minimal migration changes to `vite.config.ts` or other config files if Vite 8 introduces breaking config changes, without altering app behavior.
- **FR-008**: System MUST strictly scope changes to Vite, antd, `@vitejs/plugin-react`, and `@ant-design/icons` only; unrelated dependencies (React 19.2.0, React Router 7.11.0, TanStack Query 5.90.12, TypeScript 5.9.3, ESLint, @types/*, etc.) MUST NOT be updated unless Vite 8 or antd 6.6.2 explicitly requires it for compatibility — any such additional change MUST be justified and documented in the PR.
- **FR-009**: System MUST keep the updated lockfile (`package-lock.json`) committed and consistent with `package.json`.
- **FR-010**: System MUST preserve existing UI behavior and theme customizations; no visual or functional regression for Ant Design components across all routes after upgrade.
- **FR-011**: System MUST ensure linting (`npm run lint`) passes with the new toolchain and no new ESLint errors are introduced by the version changes.

### Key Entities

- **Package Manifest**: `package.json` and `package-lock.json` that declare direct dependencies and locked transitive versions; attributes include package name, version range, and peer dependency constraints.
- **Build Configuration**: `vite.config.ts`, `tsconfig.json`, and related tooling config that drives dev server, production build, and type checking; must remain compatible with Vite 8.
- **UI Component Library Instance**: The installed Ant Design runtime (antd + icons) that provides design tokens, theming, and components used throughout the application.

### Assumptions

- Latest stable versions are determined via npm registry on 2026-08-31: Vite 8.2.2, antd 6.6.2, `@vitejs/plugin-react` 6.1.1. If newer patches appear before implementation, "latest" means the newest patch within the same major (Vite 8.x, antd 6.x).
- Version specifiers use caret ranges (e.g., `^8.2.2`) per existing project convention; lockfile ensures reproducibility.
- Node.js environment meets Vite 8 minimum requirements (Node 18+ / 20+ LTS). No `engines` field change or `.nvmrc` addition is in scope; requirement will be documented and Vite's own error will surface if Node is outdated.
- No major-version breaking migration is needed for Ant Design (stays within v6); Vite major bump 7 → 8 may require minor config adjustments but not app rewrites.
- `package-lock.json` is the authoritative lockfile (npm, not yarn/pnpm).
- Verifications are manual smoke tests plus `lint`/`build` commands; no automated visual regression suite exists yet.

### Dependencies

- Requires network access to npm registry to fetch latest versions.
- Depends on correct peer compatibility between React 19.2.0, Vite 8, and Ant Design 6.6.2.
- No backend/API changes needed; JSONPlaceholder integration unaffected.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Production build (`npm run build`) completes successfully in comparable time (±20% of baseline) with no TypeScript or Vite errors.
- **SC-002**: Development server (`npm run dev`) starts successfully and serves the application ready for interaction within 10 seconds on a typical developer machine.
- **SC-003**: Lint command (`npm run lint`) passes with zero errors after the upgrade, matching pre-upgrade lint status.
- **SC-004**: All Ant Design components visible on existing pages render correctly with no visual regression, broken styles, or console errors during a manual smoke test of every route.
- **SC-005**: Package manifest reflects the target latest versions: Vite `^8.2.x` and antd `^6.6.x` are present in `package.json` and lockfile after install, verified via `npm list vite antd`.
- **SC-006**: No more than the expected files (package manifest, lockfile, and minimal config fixes) are modified; git diff shows no unrelated functional changes.
- **SC-007**: Install reliability — a clean install (`rm -rf node_modules && npm install`) succeeds on first attempt with no peer-dependency conflicts that require `--force` or `--legacy-peer-deps`.
