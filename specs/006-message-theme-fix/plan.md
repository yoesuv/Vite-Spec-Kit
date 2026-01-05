# Implementation Plan: All Notification Messages Theme Support

**Branch**: `006-message-theme-fix` | **Date**: 2026-01-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-message-theme-fix/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This feature ensures all notification messages (success, error, warning, info) automatically adapt to the application's current light/dark theme. The issue is that Ant Design's `message` component is imported directly from antd in multiple locations, which doesn't inherit theme context. The solution is to use Ant Design's `App.useApp()` hook to get the message instance that properly inherits from the ConfigProvider theme context.

## Technical Context

**Language/Version**: TypeScript ~5.9.3
**Primary Dependencies**: React 19.2.0, Ant Design 6.1.2, React Router DOM 7.11.0, TanStack Query 5.90.12
**Storage**: N/A (stateless notifications)
**Testing**: NO TESTING (per constitution - supersedes all other guidance)
**Target Platform**: Web browser (modern browsers)
**Project Type**: web
**Performance Goals**: <100ms response for theme updates, <3s page load
**Constraints**: Must work with existing Ant Design ConfigProvider theme system
**Scale/Scope**: Small - affects 3 files, ~6 message calls

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Clean Code (NON-NEGOTIABLE)

- **Status**: ✅ PASS
- **Rationale**: Solution uses existing Ant Design patterns (App.useApp()) which is the recommended approach. Changes are minimal and focused, replacing direct imports with hook-based instances. No dead code or hacks introduced.

### Simple UX

- **Status**: ✅ PASS
- **Rationale**: Users see consistent theming across all notifications without any behavior changes. Theme switching is seamless and automatic.

### Responsive Design (NON-NEGOTIABLE)

- **Status**: ✅ PASS
- **Rationale**: Ant Design's message component is already responsive. No layout changes required.

### User Experience Consistency

- **Status**: ✅ PASS
- **Rationale**: Ensures all notification messages match the application's theme system, maintaining visual consistency with other Ant Design components.

### Performance Requirements (NON-NEGOTIABLE)

- **Status**: ✅ PASS
- **Rationale**: Theme updates happen via React context re-renders (<100ms). No additional bundle size added (using existing Ant Design APIs).

### Minimal Dependencies

- **Status**: ✅ PASS
- **Rationale**: No new dependencies added. Uses existing Ant Design App.useApp() hook.

### No Testing Policy (NON-NEGOTIABLE)

- **Status**: ✅ PASS
- **Rationale**: No tests will be created or maintained.

**Overall Gate Status**: ✅ PASS - All constitution principles satisfied.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── common/
│   │   ├── ErrorBoundary.tsx
│   │   └── PageHeader.tsx
│   ├── layout/
│   │   └── AppLayout.tsx
│   └── posts/
│       ├── EmptyState.tsx
│       ├── PostCard.tsx
│       ├── PostForm.tsx
│       ├── PostFormCard.tsx
│       └── PostList.tsx
├── contexts/
│   ├── ThemeContext.tsx
│   ├── themeConstants.ts
│   └── useTheme.ts
├── hooks/
│   └── usePosts.ts
├── pages/
│   ├── CreatePage.tsx
│   ├── DetailPage.tsx
│   ├── EditPage.tsx
│   └── HomePage.tsx
├── types/
│   └── post.ts
├── api/
│   └── postsApi.ts
├── App.tsx
├── main.tsx
├── App.css
└── index.css

# NO TESTING DIRECTORIES (per constitution)
```

**Structure Decision**: Single web application using Vite + React. All notification message usage is in `src/pages/CreatePage.tsx`, `src/pages/EditPage.tsx`, and `src/components/posts/PostList.tsx`. These files will be modified to use the App.useApp() hook instead of direct message imports.

## Complexity Tracking

> **No violations to justify - all constitution principles satisfied.**
