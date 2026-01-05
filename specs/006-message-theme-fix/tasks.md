---
description: "Task list for All Notification Messages Theme Support feature"
---

# Tasks: All Notification Messages Theme Support

**Input**: Design documents from `/specs/006-message-theme-fix/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: NO TESTING per constitution - this supersedes all other guidance. Any test-related tasks are prohibited.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/` at repository root (NO TESTING per constitution)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

> **NOTE**: Setup phase is not needed - project already exists with all required dependencies (React 19.2.0, Ant Design 6.1.2, TypeScript). No setup tasks required.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

> **NOTE**: Foundational phase is not needed - theme system (ThemeContext.tsx with ConfigProvider) already exists and is properly configured. No foundational tasks required.

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - All Notification Messages in Light Theme (Priority: P1) 🎯 MVP

**Goal**: Ensure all notification messages (success, error, warning, info) display with correct light theme styling when the application is in light theme mode.

**Independent Test**: Set application to light theme, trigger various actions (create, edit, delete) that produce different notification types, and verify each message appears with light theme styling that matches the rest of the application.

### Tests for User Story 1 - PROHIBITED ⚠️

> **CONSTITUTION OVERRIDE**: NO TESTING permitted - this supersedes all other guidance

### Implementation for User Story 1

- [x] T001 [P] [US1] Replace direct message import with App.useApp() hook in src/pages/CreatePage.tsx
- [x] T002 [P] [US1] Replace direct message import with App.useApp() hook in src/pages/EditPage.tsx
- [x] T003 [P] [US1] Add message to App.useApp() hook in src/components/posts/PostList.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. All notification messages will automatically inherit light theme styling from the ConfigProvider.

---

## Phase 4: User Story 2 - All Notification Messages in Dark Theme (Priority: P1)

**Goal**: Ensure all notification messages (success, error, warning, info) display with correct dark theme styling when the application is in dark theme mode.

**Independent Test**: Set application to dark theme, trigger various actions (create, edit, delete) that produce different notification types, and verify each message appears with dark theme styling that matches the rest of the application.

### Tests for User Story 2 - PROHIBITED ⚠️

> **CONSTITUTION OVERRIDE**: NO TESTING permitted

### Implementation for User Story 2

> **NOTE**: User Story 2 is automatically satisfied by the same implementation as User Story 1. The App.useApp() hook ensures messages inherit theme context for both light and dark themes. No additional tasks required.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Messages will automatically adapt to whichever theme is active.

---

## Phase 5: User Story 3 - Theme Switching with Displayed Message (Priority: P2)

**Goal**: Ensure notification messages update their styling in real-time when the application theme is switched while any message is displayed.

**Independent Test**: Trigger any notification message (success, error, warning, info), switch the theme using the theme toggle, and verify the message updates its styling immediately without disappearing.

### Tests for User Story 3 - PROHIBITED ⚠️

> **CONSTITUTION OVERRIDE**: NO TESTING permitted

### Implementation for User Story 3

> **NOTE**: User Story 3 is automatically satisfied by the same implementation as User Stories 1 and 2. The App.useApp() hook ensures messages are reactive to theme context changes and will update their styling in real-time when the theme switches. No additional tasks required.

**Checkpoint**: All user stories should now be independently functional. Messages will automatically adapt to theme changes in real-time.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T004 Run quickstart.md validation to verify all notification messages display with correct theme styling in both light and dark modes

# NO TESTING TASKS (per constitution)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - project already exists
- **Foundational (Phase 2)**: No dependencies - theme system already configured
- **User Stories (Phase 3+)**: All can start immediately - no blocking prerequisites
  - User stories can proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all three user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: No dependencies on other stories - can start immediately
- **User Story 2 (P1)**: Automatically satisfied by User Story 1 implementation - no additional work
- **User Story 3 (P2)**: Automatically satisfied by User Story 1 implementation - no additional work

### Within Each User Story

# NO TESTING (per constitution - supersedes all guidance)

- Tasks T001, T002, T003 can run in parallel (different files, no dependencies)

### Parallel Opportunities

- All three implementation tasks (T001, T002, T003) can run in parallel since they modify different files
- Different user stories are automatically satisfied by the same implementation
- No cross-file dependencies or conflicts

---

## Parallel Example: User Story 1

```bash
# NO TESTING TASKS (per constitution)

# Launch all three file modifications together:
Task: "Replace direct message import with App.useApp() hook in src/pages/CreatePage.tsx"
Task: "Replace direct message import with App.useApp() hook in src/pages/EditPage.tsx"
Task: "Add message to App.useApp() hook in src/components/posts/PostList.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 3: User Story 1 (Tasks T001, T002, T003)
2. **STOP and VALIDATE**: Test User Story 1 independently (light theme messages)
3. Deploy/demo if ready

### Incremental Delivery

1. Complete Phase 3: User Story 1 → Test independently → Deploy/Demo (MVP!)
2. User Stories 2 and 3 are automatically satisfied by the same implementation
3. No additional work needed for dark theme or theme switching support
4. All three user stories deliver value simultaneously

### Parallel Team Strategy

With multiple developers:

1. All three developers can work on different files simultaneously:
   - Developer A: CreatePage.tsx (Task T001)
   - Developer B: EditPage.tsx (Task T002)
   - Developer C: PostList.tsx (Task T003)
2. All three user stories are satisfied by these three file modifications
3. No integration work needed - theme context handles everything automatically

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- All three user stories are satisfied by the same three file modifications
- The App.useApp() hook automatically handles light theme, dark theme, and theme switching
- No additional code or configuration needed beyond the three file changes

# NO TESTING verification needed (per constitution)

- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence

---

## Summary

**Total Tasks**: 4

- **Phase 3 (User Story 1)**: 3 implementation tasks (all parallelizable)
- **Phase 6 (Polish)**: 1 validation task

**Task Count per User Story**:

- User Story 1: 3 tasks (T001, T002, T003)
- User Story 2: 0 tasks (automatically satisfied by US1)
- User Story 3: 0 tasks (automatically satisfied by US1)

**Parallel Opportunities**:

- All three implementation tasks (T001, T002, T003) can run in parallel
- No dependencies between tasks
- Different files, no conflicts

**Independent Test Criteria**:

- User Story 1: Light theme messages display correctly
- User Story 2: Dark theme messages display correctly
- User Story 3: Messages update in real-time when theme switches

**Suggested MVP Scope**: User Story 1 only (Tasks T001, T002, T003). This automatically satisfies all three user stories.

**Format Validation**: ✅ ALL tasks follow the checklist format (checkbox, ID, labels, file paths)
