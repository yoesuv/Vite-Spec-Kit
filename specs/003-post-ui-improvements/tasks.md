---
description: "Task list for Post UI Improvements implementation"
---

# Tasks: Post Creation and Editing UI Improvements

**Input**: Design documents from `/specs/003-post-ui-improvements/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: NO TESTING per constitution - this supersedes all other guidance. Any test-related tasks are prohibited.

**Organization**: Tasks are grouped by user story to enable independent implementation and manual verification of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `src/` at repository root (Vite + React SPA)
- All paths are absolute from repository root
- NO TESTING directories per constitution

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify project structure and dependencies are ready

- [x] T001 Verify existing project structure matches plan.md (src/components/posts/, src/pages/)
- [x] T002 Verify Ant Design 6.1.2 is available in package.json dependencies
- [x] T003 [P] Verify React 19.2.0 and TypeScript 5.9.3 are configured correctly

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core CSS infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Add .post-form-card-container CSS class to src/index.css with flexbox centering
- [x] T005 [P] Add .post-form-card CSS class to src/index.css with 60% width, max 900px, min 480px
- [x] T006 [P] Add mobile media query (@media max-width: 768px) for .post-form-card to src/index.css

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Create New Post with Improved Layout (Priority: P1) 🎯 MVP

**Goal**: Users can create posts using a clean, centered card-style interface with 60% width on desktop

**Manual Verification**: Navigate to create post page, verify card is centered at 60% width, create a post successfully with styled inputs and buttons

### Implementation for User Story 1

- [x] T007 [P] [US1] Create PostFormCard component in src/components/posts/PostFormCard.tsx with TypeScript interface
- [x] T008 [US1] Implement PostFormCard render logic with Ant Design Card component and container div
- [x] T009 [US1] Apply .post-form-card-container and .post-form-card CSS classes in PostFormCard
- [x] T010 [US1] Add title prop support to PostFormCard component
- [x] T011 [US1] Update CreatePage in src/pages/CreatePage.tsx to import PostFormCard
- [x] T012 [US1] Wrap PostForm with PostFormCard in CreatePage, pass title="Create New Post"
- [x] T013 [US1] Verify CreatePage maintains existing form submission logic and routing

**Checkpoint**: At this point, User Story 1 should be fully functional - create post page has centered card layout

---

## Phase 4: User Story 2 - Edit Existing Post with Consistent UI (Priority: P2)

**Goal**: Users can edit posts using the same improved card-style interface, maintaining visual consistency

**Manual Verification**: Navigate to edit an existing post, verify same card layout and styling as create page, successfully update the post

### Implementation for User Story 2

- [x] T014 [US2] Update EditPage in src/pages/EditPage.tsx to import PostFormCard
- [x] T015 [US2] Wrap PostForm with PostFormCard in EditPage, pass title="Edit Post"
- [x] T016 [US2] Verify EditPage maintains existing form submission and data loading logic
- [x] T017 [US2] Verify EditPage maintains existing routing behavior

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently with consistent card layout

---

## Phase 5: User Story 3 - Responsive Layout Adaptation (Priority: P3)

**Goal**: Card layout adapts gracefully to different screen sizes while maintaining usability

**Manual Verification**: Resize browser window or access on different devices, verify card adapts (60% desktop, 100%-32px mobile) without breaking layout

### Implementation for User Story 3

- [x] T018 [US3] Verify mobile media query applies width calc(100% - 32px) at viewport <768px
- [x] T019 [US3] Verify desktop constraints (60% width, max 900px, min 480px) at viewport >1024px
- [x] T020 [US3] Manually verify card layout at 1920px, 1024px, 768px, and 375px viewport widths
- [x] T021 [US3] Verify touch targets remain accessible on mobile (Ant Design defaults)
- [x] T022 [US3] Verify smooth visual transitions during viewport resize

**Checkpoint**: All user stories should now be independently functional with full responsive behavior

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final quality checks

- [x] T023 [P] Verify WCAG 2.1 AA contrast ratios for card background and text in both light and dark themes
- [x] T024 [P] Verify focus indicators are visible on all form inputs (Ant Design defaults)
- [x] T025 [P] Verify hover states on buttons provide feedback within 50ms
- [x] T026 Verify card visibility on page load is under 1 second
- [x] T027 Verify keyboard navigation works correctly through all form elements
- [x] T028 [P] Test theme switching (light/dark) maintains proper card styling
- [x] T029 Code cleanup: Remove any unused imports or commented code
- [x] T030 Run quickstart.md validation checklist for all scenarios

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent of US1 (uses same PostFormCard component)
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Validates responsive behavior of US1 and US2

### Within Each User Story

- Component creation before page integration
- PostFormCard component must exist before pages can import it
- CSS classes must exist before components can reference them
- Page updates maintain existing logic (no breaking changes)

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, User Stories 1 and 2 can start in parallel (different page files)
- User Story 3 is validation-focused and should run after US1 and US2 are complete
- Polish tasks marked [P] can run in parallel

---

## Parallel Example: After Foundational Phase

```bash
# Once CSS foundation is ready (Phase 2 complete):

# Developer A can work on User Story 1:
Task: "Create PostFormCard component in src/components/posts/PostFormCard.tsx"
Task: "Update CreatePage in src/pages/CreatePage.tsx"

# Developer B can work on User Story 2 simultaneously:
Task: "Update EditPage in src/pages/EditPage.tsx"

# Both developers use the same PostFormCard component and CSS classes
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (verify dependencies)
2. Complete Phase 2: Foundational (add CSS classes) - CRITICAL
3. Complete Phase 3: User Story 1 (create page with card layout)
4. **STOP and VALIDATE**: Manually verify create post page independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → CSS foundation ready
2. Add User Story 1 → Manually verify create page independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Manually verify edit page independently → Deploy/Demo
4. Add User Story 3 → Manually verify responsive behavior → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (CreatePage)
   - Developer B: User Story 2 (EditPage)
   - Both use shared PostFormCard component
3. Developer C: User Story 3 (responsive validation)
4. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and manually verifiable
- PostFormCard component is shared across US1 and US2 (created in US1, reused in US2)
- CSS classes are foundational and must be complete before any UI work
- NO TESTING verification needed (per constitution)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence

---

## Task Summary

**Total Tasks**: 30

- Phase 1 (Setup): 3 tasks
- Phase 2 (Foundational): 3 tasks
- Phase 3 (User Story 1 - P1): 7 tasks
- Phase 4 (User Story 2 - P2): 4 tasks
- Phase 5 (User Story 3 - P3): 5 tasks
- Phase 6 (Polish): 8 tasks

**Parallel Opportunities**: 12 tasks marked [P]

**Independent Test Criteria**:

- US1: Create post with centered card layout
- US2: Edit post with same card layout
- US3: Responsive behavior across viewport sizes

**Suggested MVP Scope**: Phase 1 + Phase 2 + Phase 3 (User Story 1 only) = 13 tasks
