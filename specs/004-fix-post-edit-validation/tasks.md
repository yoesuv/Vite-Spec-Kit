---
description: "Task list for Fix Post Edit Validation feature"
---

# Tasks: Fix Post Edit Validation

**Input**: Design documents from `/specs/004-fix-post-edit-validation/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: NO TESTING per constitution - this supersedes all other guidance. Any test-related tasks are prohibited.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Project Type**: Web application (single-page application with React frontend)
- **Source Path**: `src/` at repository root
- **Primary Target**: `src/components/posts/PostForm.tsx`
- **Secondary Target**: `src/pages/EditPage.tsx` (verification only, no changes needed)

**Terminology**: The spec uses the user-facing term **"description"**. In the current codebase and schema this is represented by the form field **`body`**. Tasks below may reference `body` when verifying/implementing description validation.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify existing project structure and prepare for implementation

**Note**: This is a bug fix in an existing application. Most setup is already complete.

- [x] T001 Verify project structure matches plan.md expectations (src/components/posts/, src/pages/, src/schemas/)
- [x] T002 Verify all dependencies are installed (Ant Design 6.1.2, Yup 1.7.1, React 19.2.0, TypeScript 5.9.3)
- [x] T003 Review existing PostForm.tsx implementation to understand current validation state management
- [x] T004 Review existing postSchema.ts to confirm validation rules (title max 200, body min 10, trim whitespace)

**Checkpoint**: Environment verified - ready to implement user stories

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core understanding and documentation review before implementation

**⚠️ CRITICAL**: Complete this phase before ANY user story implementation begins

- [x] T005 Read research.md to understand the technical approach and solution design
- [x] T006 Read data-model.md to understand FormValidationState transitions for create vs edit modes
- [x] T007 Read contracts/form-validation.md to understand validation contract and button enablement logic
- [x] T008 Read quickstart.md to understand implementation steps and manual testing checklist

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Enable Submit Button on Edit Form Load (Priority: P1) 🎯 MVP

**Goal**: When a user opens an existing post for editing, the submit button should be enabled immediately upon form load, allowing them to save the post without making any changes if the existing content is valid.

**Independent Test**: Open an existing post in edit mode and verify the submit button is enabled without making any changes. Click submit and verify the post updates successfully.

**Why MVP**: This is the most critical issue as it blocks users from saving posts even when no changes are needed. Delivers immediate value by removing a blocking UX issue.

### Tests for User Story 1 - PROHIBITED ⚠️

> **CONSTITUTION OVERRIDE**: NO TESTING permitted - this supersedes all other guidance

### Implementation for User Story 1

- [x] T009 [US1] (FR-001, FR-010) Add edit mode detection logic in src/components/posts/PostForm.tsx (add `const isEditMode = Boolean(initialValues);` after state declarations)
- [x] T010 [US1] (FR-001, FR-010) Add useEffect hook for initial validation in edit mode in src/components/posts/PostForm.tsx (validate on mount when initialValues provided)
- [x] T011 [US1] (FR-001, FR-003, SC-001) Implement validation success handler in useEffect to set hasErrors=false and allTouched=true in src/components/posts/PostForm.tsx
- [x] T012 [US1] (FR-008) Implement validation error handler in useEffect to set hasErrors=true and allTouched=false in src/components/posts/PostForm.tsx
- [x] T013 [US1] (FR-001, FR-010) Add useEffect dependency array [initialValues, form, isEditMode] in src/components/posts/PostForm.tsx
- [x] T014 [US1] Verify EditPage.tsx passes initialValues to PostForm component (check form.setFieldsValue or initialValues prop)
- [x] T015 [US1] Verify no additional changes needed to EditPage.tsx beyond initialValues passing
- [ ] T016 [US1] (SC-001, SC-003) Manual test: Open edit form with valid data, verify button enabled immediately (quickstart.md checklist item 2)
- [ ] T017 [US1] (FR-009) Manual test: Click submit without changes, verify post updates successfully (quickstart.md checklist item 2)

**Checkpoint**: At this point, User Story 1 should be fully functional - submit button enables on edit form load with valid data

---

## Phase 4: User Story 2 - Enable Submit Button on Valid Description Edit (Priority: P2)

**Goal**: When a user edits the description field of an existing post, the submit button should be enabled as soon as the description becomes valid, allowing them to save their changes immediately.

**Independent Test**: Edit a post's description field and verify the submit button enables when validation passes and disables when validation fails.

**Why This Priority**: Ensures users receive immediate feedback when their edits are valid. Complements the initial load behavior from US1.

### Tests for User Story 2 - PROHIBITED ⚠️

> **CONSTITUTION OVERRIDE**: NO TESTING permitted

### Implementation for User Story 2

- [x] T018 [US2] Verify existing handleFormChange function correctly updates hasErrors state in src/components/posts/PostForm.tsx
- [x] T019 [US2] Verify existing handleFormChange function correctly updates allTouched state in src/components/posts/PostForm.tsx
- [x] T020 [US2] Verify validateField function correctly validates body field with trim in src/components/posts/PostForm.tsx
- [x] T021 [US2] Verify Form.Item for body field has validateTrigger="onChange" in src/components/posts/PostForm.tsx
- [ ] T022 [US2] Manual test: Edit valid description to another valid value, verify button stays enabled (quickstart.md checklist item 5)
- [ ] T023 [US2] Manual test: Edit valid description to invalid value (<10 chars), verify button disables (quickstart.md checklist item 5)
- [ ] T024 [US2] Manual test: Edit invalid description to valid value (>10 chars), verify button enables (quickstart.md checklist item 5)
- [ ] T025 [US2] Manual test: Verify button state updates within 100ms (performance requirement SC-002)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work - button enables on load AND during editing

---

## Phase 5: User Story 3 - Consistent Validation Behavior Between Create and Edit (Priority: P3)

**Goal**: The validation behavior for editing posts should match the validation behavior for creating posts, ensuring a consistent user experience across both operations.

**Independent Test**: Compare validation behavior between create and edit forms to ensure identical validation rules and button enablement logic.

**Why This Priority**: While less critical than fixing immediate blocking issues, consistency improves overall user experience and reduces confusion.

### Tests for User Story 3 - PROHIBITED ⚠️

> **CONSTITUTION OVERRIDE**: NO TESTING permitted

### Implementation for User Story 3

- [x] T026 [US3] Verify create form behavior unchanged (button disabled on load) in src/pages/CreatePage.tsx
- [x] T027 [US3] Verify same postSchema validation rules used for both create and edit in src/schemas/postSchema.ts
- [x] T028 [US3] Verify same validateField function logic for both modes in src/components/posts/PostForm.tsx
- [x] T029 [US3] Verify same handleFormChange logic for both modes in src/components/posts/PostForm.tsx
- [x] T030 [US3] Verify same button disabled logic (hasErrors || !allTouched) for both modes in src/components/posts/PostForm.tsx
- [ ] T031 [US3] Manual test: Create new post, verify button disabled until all fields valid (quickstart.md checklist item 1)
- [ ] T032 [US3] Manual test: Verify validation error messages identical between create and edit
- [ ] T033 [US3] Manual test: Verify whitespace-only input treated as invalid in both modes (quickstart.md checklist item 4)

**Checkpoint**: All user stories should now be independently functional with consistent validation behavior

---

## Phase 6: Edge Cases & Polish

**Purpose**: Handle edge cases and verify all requirements are met

- [ ] T034 Manual test: Edit form with invalid initial data (body <10 chars), verify button stays disabled (quickstart.md checklist item 3)
- [ ] T035 Manual test: Enter whitespace-only in body field, verify button disables (quickstart.md checklist item 4)
- [ ] T036 Manual test: Rapid typing and deletion in description field, verify validation debounced (quickstart.md checklist item 5)
- [ ] T037 Manual test: Load edit form, make invalid, revert to original valid state, verify button re-enables
- [x] T038 Verify all functional requirements (FR-001 through FR-012) are met per spec.md
- [x] T039 Verify all success criteria (SC-001 through SC-004) are met per spec.md
- [x] T040 Code review: Verify clean code principles (readable, maintainable, single responsibility)
- [x] T041 Code review: Verify no breaking changes to create form functionality
- [x] T042 Performance check: Verify button state updates <100ms (SC-002 requirement)
- [ ] T043 Final manual test: Run through complete quickstart.md testing checklist (all 5 scenarios)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User Story 1 (P1): Can start after Foundational - No dependencies on other stories
  - User Story 2 (P2): Depends on User Story 1 completion (builds on edit mode validation)
  - User Story 3 (P3): Depends on User Stories 1 & 2 completion (validates consistency)
- **Edge Cases & Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Independent - Can start after Foundational (Phase 2)
- **User Story 2 (P2)**: Depends on US1 - Validates real-time editing after initial load fix
- **User Story 3 (P3)**: Depends on US1 & US2 - Validates consistency across both modes

**Note**: Unlike typical features, these user stories are sequential because they build on each other:

- US1 fixes initial load
- US2 validates editing behavior works with US1's changes
- US3 validates overall consistency

### Within Each User Story

# NO TESTING (per constitution - supersedes all guidance)

- Implementation tasks before manual verification
- Core functionality before edge cases
- Story complete before moving to next priority

### Parallel Opportunities

**Limited parallelization** due to sequential nature of this bug fix:

- Phase 1: All verification tasks (T001-T004) can run in parallel
- Phase 2: All documentation review tasks (T005-T008) can run in parallel
- Phase 3 (US1): Implementation tasks (T009-T013) must be sequential (same file)
- Phase 4 (US2): Verification tasks (T017-T020) can run in parallel (read-only)
- Phase 5 (US3): Verification tasks (T025-T029) can run in parallel (read-only)
- Phase 6: Manual test tasks (T033-T036) can run in parallel

**Why Limited Parallelization**: Single file modification (PostForm.tsx) means most implementation tasks must be sequential.

---

## Parallel Example: User Story 1

```bash
# NO TESTING TASKS (per constitution)

# Implementation tasks for User Story 1 are sequential (same file):
# 1. T009: Add edit mode detection
# 2. T010: Add useEffect hook
# 3. T011: Add success handler
# 4. T012: Add error handler
# 5. T013: Add dependency array

# Manual verification tasks can run in parallel:
Task: "Manual test: Open edit form with valid data, verify button enabled"
Task: "Manual test: Click submit without changes, verify post updates"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (verify environment)
2. Complete Phase 2: Foundational (read documentation)
3. Complete Phase 3: User Story 1 (fix button enablement on load)
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready - **This alone fixes the critical blocking issue**

**MVP Scope**: Just User Story 1 delivers immediate value by fixing the most critical bug.

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → **Deploy/Demo (MVP!)** - Button enables on load
3. Add User Story 2 → Test independently → Deploy/Demo - Real-time editing works
4. Add User Story 3 → Test independently → Deploy/Demo - Full consistency validated
5. Each story adds validation without breaking previous functionality

### Single Developer Strategy

This is a focused bug fix best completed by a single developer:

1. Complete Setup + Foundational (read and understand)
2. Implement User Story 1 (core fix - ~15 lines of code)
3. Validate User Story 1 works independently
4. Implement User Story 2 (verify real-time validation)
5. Validate User Story 2 works with User Story 1
6. Implement User Story 3 (verify consistency)
7. Complete edge cases and polish
8. Final validation and code review

**Estimated Time**: 2-4 hours for complete implementation and testing

---

## Implementation Details

### Key Code Changes (from research.md)

**File**: `src/components/posts/PostForm.tsx`

**Change 1: Add edit mode detection** (T009)

```typescript
const isEditMode = Boolean(initialValues);
```

**Change 2: Add useEffect for initial validation** (T010-T013)

```typescript
useEffect(() => {
  if (isEditMode && initialValues) {
    form
      .validateFields()
      .then(() => {
        setHasErrors(false);
        setAllTouched(true);
      })
      .catch(() => {
        setHasErrors(true);
        setAllTouched(false);
      });
  }
}, [initialValues, form, isEditMode]);
```

**No changes needed**:

- `validateField` function
- `handleFormChange` function
- `handleFinish` function
- Button disabled logic: `disabled={hasErrors || !allTouched}`
- Validation schema (`postSchema.ts`)

### Manual Testing Checklist (from quickstart.md)

**User Story 1 Tests**:

- [ ] Navigate to `/edit/1`, verify button enabled on load
- [ ] Click submit without changes, verify post updates

**User Story 2 Tests**:

- [ ] Edit body to <10 chars, verify button disables
- [ ] Edit body to >10 chars, verify button enables
- [ ] Verify state updates within 100ms

**User Story 3 Tests**:

- [ ] Navigate to `/create`, verify button disabled on load
- [ ] Verify same validation rules for create and edit
- [ ] Verify whitespace-only treated as invalid in both modes

**Edge Cases**:

- [ ] Edit form with invalid initial data, verify button stays disabled
- [ ] Enter whitespace-only, verify button disables
- [ ] Rapid typing, verify debounced validation

---

## Success Criteria Validation

After implementation, verify all success criteria from spec.md:

- [ ] **SC-001**: Edit form with valid data enables button immediately (0 seconds delay)
- [ ] **SC-002**: Button state updates within 100ms of validation completing
- [ ] **SC-003**: 100% of valid edit forms have enabled buttons on load
- [ ] **SC-004**: Validation behavior identical between create and edit (0 discrepancies)

---

## Notes

- This is a focused bug fix affecting a single component (PostForm.tsx)
- Total code changes: ~15 lines added
- No new dependencies required
- No breaking changes to existing functionality
- Create form behavior remains unchanged

# NO TESTING verification needed (per constitution)

- Commit after completing each user story
- Stop at each checkpoint to validate story independently
- Follow quickstart.md for step-by-step implementation guidance
- Refer to research.md for technical decisions and rationale

---

## Task Summary

**Total Tasks**: 44

- Phase 1 (Setup): 4 tasks
- Phase 2 (Foundational): 4 tasks
- Phase 3 (User Story 1 - P1): 10 tasks
- Phase 4 (User Story 2 - P2): 8 tasks
- Phase 5 (User Story 3 - P3): 8 tasks
- Phase 6 (Edge Cases & Polish): 10 tasks

**Parallel Opportunities**: Limited due to single-file modification

- Phase 1: 4 tasks can run in parallel
- Phase 2: 4 tasks can run in parallel
- Phase 4-5: Verification tasks can run in parallel

**MVP Scope**: Phase 1 + Phase 2 + Phase 3 (User Story 1 only) = 18 tasks

**Estimated Implementation Time**: 2-4 hours total
