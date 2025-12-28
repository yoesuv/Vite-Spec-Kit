---
description: "Task list for Delete Confirmation Modal Theme Support implementation"
---

# Tasks: Delete Confirmation Modal Theme Support

**Input**: Design documents from `/specs/005-modal-theme-fix/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: NO TESTING per constitution - this supersedes all other guidance. Any test-related tasks are prohibited.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/` at repository root (NO TESTING per constitution)
- This project uses single-page React app structure with `src/` at root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify project structure and dependencies

- [ ] T001 Verify Ant Design 6.1.2 includes App component and useApp hook
- [ ] T002 Confirm current branch is 005-modal-theme-fix
- [ ] T003 Review existing ThemeContext.tsx implementation at src/contexts/ThemeContext.tsx

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Add App component import to src/contexts/ThemeContext.tsx
- [ ] T005 Wrap children with App component inside ConfigProvider in src/contexts/ThemeContext.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 & 2 - Delete Post in Light/Dark Theme (Priority: P1) 🎯 MVP

**Goal**: Fix modal to automatically adapt to current theme (light or dark) when delete button is clicked

**Why Combined**: User Stories 1 and 2 are implemented together because the same code change fixes both light and dark theme support simultaneously. The App.useApp() hook solution inherently supports both themes.

**Independent Test**:

1. Set app to light theme → click delete on post → modal shows light theme styling
2. Set app to dark theme → click delete on post → modal shows dark theme styling

### Tests for User Stories 1 & 2 - PROHIBITED ⚠️

> **CONSTITUTION OVERRIDE**: NO TESTING permitted - this supersedes all other guidance

### Implementation for User Stories 1 & 2

- [ ] T006 [US1,US2] Add App import from 'antd' to src/components/posts/PostList.tsx
- [ ] T007 [US1,US2] Add useApp hook call to get modal instance in PostList component in src/components/posts/PostList.tsx
- [ ] T008 [US1,US2] Replace Modal.confirm() with modal.confirm() in handleDelete function in src/components/posts/PostList.tsx
- [ ] T009 [US1,US2] Remove Modal import from 'antd' in src/components/posts/PostList.tsx (if Modal is no longer used elsewhere)
- [ ] T010 [US1,US2] Manual verification: Test modal in light theme per quickstart.md checklist
- [ ] T011 [US1,US2] Manual verification: Test modal in dark theme per quickstart.md checklist

**Checkpoint**: At this point, User Stories 1 & 2 should be fully functional - modal adapts to both light and dark themes

---

## Phase 4: User Story 3 - Theme Switching with Open Modal (Priority: P2)

**Goal**: Modal updates its theme in real-time when user switches theme while modal is open

**Independent Test**: Open delete modal → switch theme toggle → modal immediately updates to match new theme

**Note**: This functionality is automatically provided by the App.useApp() implementation from Phase 3. No additional code changes required - just verification.

### Tests for User Story 3 - PROHIBITED ⚠️

> **CONSTITUTION OVERRIDE**: NO TESTING permitted

### Implementation for User Story 3

- [ ] T012 [US3] Manual verification: Open modal in light theme, switch to dark theme, verify modal updates immediately
- [ ] T013 [US3] Manual verification: Open modal in dark theme, switch to light theme, verify modal updates immediately
- [ ] T014 [US3] Manual verification: Verify theme update happens within 100ms (per spec SC-002)

**Checkpoint**: All user stories should now be independently functional

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and quality checks

- [ ] T015 [P] Verify WCAG AA contrast standards in light theme (4.5:1 minimum per spec SC-003)
- [ ] T016 [P] Verify WCAG AA contrast standards in dark theme (4.5:1 minimum per spec SC-003)
- [ ] T017 [P] Test modal on different browsers (Chrome, Firefox, Safari)
- [ ] T018 [P] Test modal on different devices (desktop, tablet, mobile)
- [ ] T019 Verify delete functionality still works correctly in both themes
- [ ] T020 Verify cancel button works correctly in both themes
- [ ] T021 Verify error handling displays correctly in both themes
- [ ] T022 Run linter: npm run lint
- [ ] T023 Build verification: npm run build

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories 1 & 2 (Phase 3)**: Depends on Foundational phase completion
- **User Story 3 (Phase 4)**: Depends on Phase 3 completion (inherits the fix)
- **Polish (Phase 5)**: Depends on all user stories being complete

### User Story Dependencies

- **User Stories 1 & 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P2)**: Depends on Phase 3 completion - Verifies real-time theme switching behavior

### Within Each Phase

- **Phase 1**: All tasks can run sequentially (quick verification tasks)
- **Phase 2**: T004 must complete before T005
- **Phase 3**: T006-T009 must run sequentially (editing same file), T010-T011 can run in parallel
- **Phase 4**: All verification tasks can run in parallel
- **Phase 5**: T015-T018 can run in parallel, T019-T023 should run sequentially

### Parallel Opportunities

- Phase 1: Tasks are quick, sequential execution is fine
- Phase 2: Tasks modify same file, must be sequential
- Phase 3: T010 and T011 (verification tasks) can run in parallel
- Phase 4: All tasks (T012-T014) can run in parallel
- Phase 5: T015-T018 can run in parallel (different verification contexts)

---

## Parallel Example: User Story 3 Verification

```bash
# All verification tasks for User Story 3 can run simultaneously:
Task T012: "Open modal in light theme, switch to dark, verify update"
Task T013: "Open modal in dark theme, switch to light, verify update"
Task T014: "Verify theme update happens within 100ms"
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2 Only)

1. Complete Phase 1: Setup (verify dependencies)
2. Complete Phase 2: Foundational (add App wrapper) - CRITICAL
3. Complete Phase 3: User Stories 1 & 2 (update PostList component)
4. **STOP and VALIDATE**: Test modal in both light and dark themes
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Stories 1 & 2 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 3 verification → Test independently → Deploy/Demo
4. Complete Polish phase → Final quality checks → Deploy

### Single Developer Strategy

This is a small feature with only 2 files to modify:

1. Complete Phase 1 (5 minutes)
2. Complete Phase 2 (5 minutes) - Add App wrapper
3. Complete Phase 3 (10 minutes) - Update PostList
4. Complete Phase 4 (5 minutes) - Verify real-time switching
5. Complete Phase 5 (10 minutes) - Final verification

**Total estimated time**: ~35 minutes for implementation and verification

---

## Notes

- This is a UI-only fix with no data model or API changes
- Only 2 files need modification: ThemeContext.tsx and PostList.tsx
- No new dependencies required - uses existing Ant Design 6.1.2
- No breaking changes - maintains all existing interfaces
- User Stories 1 & 2 are combined because the same code fix addresses both
- User Story 3 is automatically satisfied by the Phase 3 implementation

### Key Implementation Details

- **App component wrapper**: Must be inside ConfigProvider to inherit theme
- **useApp hook**: Must be called inside a component wrapped by App component
- **modal.confirm()**: Has identical API to Modal.confirm(), just context-aware

### Manual Verification Checklist (from quickstart.md)

1. ✓ Light theme: Modal has light background and dark text
2. ✓ Dark theme: Modal has dark background and light text
3. ✓ Theme switch: Modal updates immediately when theme changes
4. ✓ Functionality: Delete and cancel work in both themes
5. ✓ Contrast: Text meets WCAG AA standards in both themes
6. ✓ Cross-browser: Works in Chrome, Firefox, Safari
7. ✓ Responsive: Works on desktop, tablet, mobile

### Rollback Plan

If issues occur:

```bash
git checkout HEAD~1 -- src/contexts/ThemeContext.tsx
git checkout HEAD~1 -- src/components/posts/PostList.tsx
```

---

## Summary

- **Total Tasks**: 23 tasks
- **User Story 1 & 2 Tasks**: 6 implementation + 2 verification = 8 tasks
- **User Story 3 Tasks**: 3 verification tasks (no implementation needed)
- **Setup/Foundation Tasks**: 5 tasks
- **Polish Tasks**: 9 tasks
- **Parallel Opportunities**: 7 tasks can run in parallel (verification tasks)
- **MVP Scope**: Phases 1-3 (User Stories 1 & 2)
- **Estimated Time**: ~35 minutes total
- **Files Modified**: 2 files only
- **Breaking Changes**: None
- **New Dependencies**: None
