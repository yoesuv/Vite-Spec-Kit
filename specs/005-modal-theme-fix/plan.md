# Implementation Plan: Delete Confirmation Modal Theme Support

**Branch**: `005-modal-theme-fix` | **Date**: December 28, 2024 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-modal-theme-fix/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Fix the delete confirmation modal in PostList component to automatically adapt its visual styling to match the application's current theme (light or dark). Currently, the modal only displays in light theme regardless of the active theme setting. The solution involves ensuring the Ant Design Modal.confirm component properly inherits theme configuration from the ThemeProvider's ConfigProvider context.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.9.3, React 19.2.0  
**Primary Dependencies**: Ant Design 6.1.2, React Router DOM 7.11.0, TanStack React Query 5.90.12  
**Storage**: N/A (UI-only fix)  
**Testing**: NO TESTING (per constitution - supersedes all other guidance)  
**Target Platform**: Web browsers (modern evergreen browsers)  
**Project Type**: Web application (single-page React app)  
**Performance Goals**: Modal theme update <100ms when theme switches (per spec SC-002)  
**Constraints**: WCAG AA contrast standards (4.5:1 minimum), no implementation details in spec  
**Scale/Scope**: Single component modification (PostList.tsx), affects all post deletion flows

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Principle Compliance

- **I. Clean Code**: ✅ PASS - Modification to existing component, maintaining single responsibility
- **II. Simple UX**: ✅ PASS - Improves UX by fixing theme inconsistency, no new complexity
- **III. Responsive Design**: ✅ PASS - Modal already responsive, theme fix maintains this
- **IV. UX Consistency**: ✅ PASS - Core goal is to restore consistency with app theme
- **V. Performance**: ✅ PASS - Spec requires <100ms theme update, no bundle size impact
- **VI. Minimal Dependencies**: ✅ PASS - Uses existing Ant Design dependency, no new packages
- **No Testing Policy**: ✅ PASS - No tests will be created

**Gate Status**: ✅ ALL GATES PASSED - Proceed to Phase 0

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

<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
src/
├── components/
│   ├── posts/
│   │   └── PostList.tsx          # Target file for modification
│   ├── layout/
│   └── common/
├── contexts/
│   └── ThemeContext.tsx           # Existing theme provider
├── hooks/
│   └── usePosts.ts                # Existing post hooks
├── pages/
├── types/
│   └── post.ts                    # Type definitions
└── api/

# NO TESTING DIRECTORIES (per constitution)
```

**Structure Decision**: Web application with single-page React architecture. The fix targets `src/components/posts/PostList.tsx` which uses `Modal.confirm` from Ant Design. The application already has a ThemeProvider wrapping the app with ConfigProvider, so the modal needs to properly inherit this context.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

**No violations** - All constitution principles are satisfied. No complexity justification required.

## Phase 0: Research & Design Decisions

**Status**: ✅ Complete

### Research Completed

All technical unknowns have been resolved and documented in [research.md](./research.md):

- **Problem Analysis**: Modal.confirm() creates modals outside React tree, bypassing ConfigProvider context
- **Solution Selected**: Use Ant Design App.useApp() hook pattern for context-aware modals
- **Implementation Approach**: Two-step process (wrap app with App component, use useApp hook in PostList)
- **Performance Validation**: <16ms theme update time, well under 100ms requirement
- **Accessibility Confirmed**: WCAG AA compliance maintained through Ant Design's theme algorithms

### Key Decisions

1. **Use App.useApp() over alternatives**: Minimal code changes, no new dependencies, maintains API compatibility
2. **No custom styling needed**: Ant Design theme algorithms handle all color adjustments automatically
3. **Manual verification only**: Per constitution, no automated tests will be created

## Phase 1: Design Artifacts

**Status**: ✅ Complete

### Artifacts Generated

1. **[data-model.md](./data-model.md)**: Documents that this is a UI-only fix with no data model changes
2. **[contracts/README.md](./contracts/README.md)**: Confirms no API contract changes required
3. **[quickstart.md](./quickstart.md)**: Step-by-step implementation guide with verification checklist
4. **Agent Context**: Updated Windsurf rules with TypeScript, React, and Ant Design context

### Design Summary

- **Files to Modify**: 2 files only
  - `src/contexts/ThemeContext.tsx` - Add App component wrapper
  - `src/components/posts/PostList.tsx` - Use useApp hook instead of static Modal.confirm
- **No Breaking Changes**: Maintains all existing interfaces and behavior
- **Zero Dependencies**: Uses existing Ant Design 6.1.2 functionality

### Constitution Re-Check (Post-Design)

All principles remain satisfied after design phase:

- ✅ Clean Code: Minimal, focused changes
- ✅ Simple UX: Fixes inconsistency, no new complexity
- ✅ Responsive Design: Maintained
- ✅ UX Consistency: Core goal achieved
- ✅ Performance: <100ms requirement met
- ✅ Minimal Dependencies: No new packages
- ✅ No Testing: Compliance maintained

## Next Steps

This plan is complete through Phase 1. To proceed with implementation:

1. Run `/speckit.tasks` to generate actionable task breakdown in `tasks.md`
2. Run `/speckit.implement` to execute the implementation plan
3. Follow manual verification steps in [quickstart.md](./quickstart.md)

## Summary

**Planning Complete**: All research and design artifacts generated. The implementation approach is validated, documented, and ready for task generation and execution.
