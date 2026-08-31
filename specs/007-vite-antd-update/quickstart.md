# Quickstart — 007-vite-antd-update

**Branch**: `007-vite-antd-update` | **Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Contract**: [contracts/verification-contract.md](./contracts/verification-contract.md)

> How to reproduce, install, and verify the Vite + Ant Design upgrade. Constitution: NO TESTING — all steps are manual + static analysis.

## Prerequisites

- Git: branch `007-vite-antd-update` (from `develop`)
- Node.js: ≥20.19.0 recommended for Vite 8 (Vite will error clearly if too old; no `engines` enforcement per Q3)
- npm: uses `package-lock.json`
- Network: access to `registry.npmjs.org`

Verify starting state:

```bash
git branch --show-current   # should be 007-vite-antd-update
node -v                     # check meets Vite 8 requirement
npm list vite antd          # baseline: vite@7.2.4, antd@6.1.2
```

## Step-by-Step — Upgrade & Verify

### 1. Update `package.json` (caret ranges, strict scope)

Edit `package.json` dependencies/devDependencies:

- `vite`: `^7.2.4` → `^8.2.2`
- `@vitejs/plugin-react`: `^5.1.1` → `^6.1.1`
- `antd`: `^6.1.2` → `^6.6.2`
- `@ant-design/icons`: `^6.1.0` → latest `^6.x` (run `npm view @ant-design/icons version` to confirm; if still `6.1.0` no change)

Do **not** change other deps (FR-008). If Vite 8 or antd errors hint at a required transitive bump (e.g., `typescript` compat), document justification in PR.

### 2. Clean install (peer check, lockfile regen)

```bash
rm -rf node_modules package-lock.json  # optional: remove lockfile to force regen; usually keep and let npm update it
npm install
# Expected: exit 0, no ERESOLVE. Check:
npm list vite @vitejs/plugin-react antd @ant-design/icons
# Should show: vite@8.2.2, @vitejs/plugin-react@6.1.1, antd@6.6.2
```

If `ERESOLVE` appears, correct the spec'd versions — do not use `--force`.

### 3. Lint (static analysis)

```bash
npm run lint
# Expected: exit 0, zero errors (SC-003, FR-011)
```

### 4. Production build (type-check + Vite build)

```bash
npm run build
# Runs: tsc -b && vite build
# Expected: exit 0, assets in dist/, time within ±20% of pre-upgrade baseline (SC-001)
ls -lh dist/
```

### 5. Dev server (HMR check <10s)

```bash
npm run dev
# Expected: Vite ready <10s, serves at http://localhost:5173 (SC-002)
# Edit a trivial line in src/App.tsx — HMR should update without full reload. Ctrl+C to stop.
```

### 6. Preview production bundle (optional but recommended)

```bash
npm run build && npm run preview
# Open preview URL, spot-check routes.
```

### 7. Manual route smoke (visual regression guard, FR-010, SC-004)

With dev or preview running, visit each route:

- `/` — HomePage: PostList/PostCard renders, no console warnings
- `/create` — CreatePage: PostForm validates via Yup, Ant Design Form components behave, modal/message theme tokens visible (specs 005/006)
- `/edit/:id` — EditPage: loads existing post, save succeeds
- `/post/:id` — DetailPage: renders

Check browser console for Ant Design deprecation warnings (should be zero for used APIs).

### 8. Diff audit (SC-006, FR-008)

```bash
git status
git diff --stat
# Expected: only package.json, package-lock.json, and at most vite.config.ts (minimal) changed
git diff package.json
# Should show caret bumps only (plus optional icons); no other dep churn
```

### 9. Clean-install reproducibility (SC-007)

```bash
rm -rf node_modules
npm install
# Should succeed without --force/--legacy-peer-deps
```

## Troubleshooting

| Symptom | Action |
|---------|--------|
| `ERESOLVE` peer error | Ensure `@vitejs/plugin-react` is `^6.1.1` with `vite ^8.2.2` |
| `vite` dev fails “Node version” | Upgrade Node to 20.19+ (documented note) |
| `tsc -b` error | Check `tsconfig.node.json` — Vite 8 may need `"module": "ESNext"` (minimal fix) |
| Theme regression (Modal/message) | Confirm `ThemeContext` still wraps `ConfigProvider`; re-apply tokens from specs 005/006 |
| Extra files in diff | Revert unrelated changes; keep strict scope |

## Done Criteria

All contract clauses V-01 through V-09 pass, PR description notes versions + any justified transitive bump, and `package-lock.json` is committed.

## Next

After quickstart verification passes, create `tasks.md` via `/speckit.tasks` to decompose implementation steps.
