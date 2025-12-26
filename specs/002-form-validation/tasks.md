# Implementation Tasks: Real-time Form Validation

**Feature**: 002-form-validation  
**Branch**: `002-form-validation`  
**Date**: 2025-12-25  
**Estimated Time**: 2-3 hours

## Task Breakdown

### Phase 0: Setup (5 min)

#### Task 0.1: Verify Project Dependencies

- **ID**: SETUP-001
- **Description**: Verify all required dependencies are installed and versions match requirements
- **Files**: `package.json`
- **Acceptance**: Yup 1.7.1, Ant Design 6.1.2, React 19.2.0, TypeScript 5.9.3 confirmed
- **Status**: [X]

---

### Phase 1: Schema Updates (15 min)

#### Task 1.1: Update Yup Schema Validation Rules

- **ID**: SCHEMA-001
- **Description**: Update `postSchema.ts` to match spec requirements: title max 200 chars, body min 10 chars, add explicit error messages
- **Files**: `src/schemas/postSchema.ts`
- **Changes**:
  - Update `body` min length from 1 to 10 characters
  - Remove `body` max length constraint (10000)
  - Add explicit error messages for all validation rules
  - Ensure `title` max is 200 characters with error message
- **Acceptance**:
  - Title: required, max 200 chars, error messages defined
  - Body: required, min 10 chars, error messages defined
  - TypeScript compilation succeeds
- **Status**: [X]

---

### Phase 2: Component Implementation (60 min)

#### Task 2.1: Add Real-time Validation Trigger to Title Field

- **ID**: COMPONENT-001
- **Description**: Update title Form.Item to use `validateTrigger="onChange"` for real-time validation
- **Files**: `src/components/posts/PostForm.tsx`
- **Changes**:
  - Add `validateTrigger="onChange"` to title Form.Item
  - Ensure validator function uses `validateField("title", value)`
- **Acceptance**: Title field validates on every keystroke
- **Status**: [X]

#### Task 2.2: Add Real-time Validation Trigger to Body Field

- **ID**: COMPONENT-002
- **Description**: Update body Form.Item to use `validateTrigger="onChange"` for real-time validation
- **Files**: `src/components/posts/PostForm.tsx`
- **Changes**:
  - Add `validateTrigger="onChange"` to body Form.Item
  - Ensure validator function uses `validateField("body", value)`
- **Acceptance**: Body field validates on every keystroke
- **Status**: [X]

#### Task 2.3: Implement Form Validation State Tracking

- **ID**: COMPONENT-003
- **Description**: Add state tracking for form validation errors and touched fields
- **Files**: `src/components/posts/PostForm.tsx`
- **Changes**:
  - Add `hasErrors` state using `useState(true)`
  - Add `allTouched` state using `useState(false)`
  - Create `handleFormChange` function to update validation state
  - Use `form.getFieldsError()` to check for errors
  - Use `form.isFieldsTouched(true)` to check if all fields touched
- **Acceptance**: State correctly tracks form validation status
- **Status**: [X]

#### Task 2.4: Wire Form Change Handler

- **ID**: COMPONENT-004
- **Description**: Connect form change handler to Form component
- **Files**: `src/components/posts/PostForm.tsx`
- **Changes**:
  - Add `onFieldsChange={handleFormChange}` to Form component
- **Acceptance**: Handler fires on every field change
- **Status**: [X]

#### Task 2.5: Implement Submit Button Disabled Logic

- **ID**: COMPONENT-005
- **Description**: Update submit button to disable when form is invalid or untouched
- **Files**: `src/components/posts/PostForm.tsx`
- **Changes**:
  - Add `disabled={hasErrors || !allTouched}` to Button component
- **Acceptance**:
  - Button disabled on initial load
  - Button disabled when any field invalid
  - Button enabled when all fields valid and touched
- **Status**: [X]

---

### Phase 3: Manual Testing (45 min)

#### Task 3.1: Test Initial Load Behavior

- **ID**: TEST-001
- **Description**: Verify no validation errors on initial form load and submit button is disabled
- **Test Steps**:
  1. Navigate to `/create`
  2. Verify no validation errors visible
  3. Verify submit button disabled (grayed out)
- **Acceptance**: No errors on load, button disabled
- **Status**: [ ]

#### Task 3.2: Test Title Field Validation

- **ID**: TEST-002
- **Description**: Verify title field validation rules and error messages
- **Test Steps**:
  1. Type single character in title
  2. Clear title field → verify "Title is required" error
  3. Type 201 characters → verify "Title must be at most 200 characters" error
  4. Type valid title → verify error clears
- **Acceptance**: All title validation rules work correctly
- **Status**: [ ]

#### Task 3.3: Test Body Field Validation

- **ID**: TEST-003
- **Description**: Verify body field validation rules and error messages
- **Test Steps**:
  1. Type "Short" (5 chars) → verify "Content must be at least 10 characters" error
  2. Type "This is valid content" → verify error clears
  3. Clear field → verify "Content is required" error
- **Acceptance**: All body validation rules work correctly
- **Status**: [ ]

#### Task 3.4: Test Submit Button State Transitions

- **ID**: TEST-004
- **Description**: Verify submit button enables/disables based on form validity
- **Test Steps**:
  1. Fill title with valid text
  2. Fill body with valid text → verify button enabled
  3. Delete one character from body (make <10 chars) → verify button disabled immediately
  4. Add character back → verify button enabled immediately
- **Acceptance**: Button state updates in real-time with validation
- **Status**: [ ]

#### Task 3.5: Test Edit Form Consistency

- **ID**: TEST-005
- **Description**: Verify Edit form has identical validation behavior to Create form
- **Test Steps**:
  1. Navigate to edit page for existing post
  2. Verify form loads with existing data, no errors
  3. Modify title to be invalid → verify same error messages as Create form
  4. Verify same validation timing and behavior
- **Acceptance**: Create and Edit forms have identical validation
- **Status**: [ ]

#### Task 3.6: Test Performance and Responsiveness

- **ID**: TEST-006
- **Description**: Verify validation feedback appears within 300ms and UI remains responsive
- **Test Steps**:
  1. Type rapidly in title field (10+ chars/second)
  2. Verify no lag, UI remains responsive
  3. Paste large text (500 chars) into title
  4. Verify max length error appears immediately
- **Acceptance**: Validation feedback <300ms, no performance issues
- **Status**: [ ]

#### Task 3.7: Test Whitespace Handling

- **ID**: TEST-007
- **Description**: Verify whitespace is trimmed correctly before validation
- **Test Steps**:
  1. Enter only spaces in title: " "
  2. Verify "Title is required" error (trimmed to empty)
  3. Enter " Hello " in title
  4. Verify no error (trimmed to "Hello", valid)
- **Acceptance**: Whitespace trimmed correctly for all fields
- **Status**: [ ]

---

### Phase 4: Code Review (15 min)

#### Task 4.1: Complete Code Review Checklist

- **ID**: REVIEW-001
- **Description**: Review all changes against checklist
- **Checklist**:
  - [ ] Yup schema matches spec requirements (title max 200, content min 10)
  - [ ] Both fields have explicit error messages
  - [ ] `validateTrigger="onChange"` set on all Form.Item components
  - [ ] Submit button disabled logic implemented correctly
  - [ ] No validation errors on initial form load
  - [ ] Same validation behavior in Create and Edit forms
  - [ ] No new dependencies added
  - [ ] No test files created (per constitution)
  - [ ] Code follows existing formatting and style
  - [ ] TypeScript compilation succeeds with no errors
- **Acceptance**: All checklist items pass
- **Status**: [ ]

---

## Execution Order

### Sequential Tasks (must complete in order):

1. **Phase 0**: SETUP-001
2. **Phase 1**: SCHEMA-001
3. **Phase 2**: COMPONENT-001 → COMPONENT-002 → COMPONENT-003 → COMPONENT-004 → COMPONENT-005
4. **Phase 3**: TEST-001 → TEST-002 → TEST-003 → TEST-004 → TEST-005 → TEST-006 → TEST-007
5. **Phase 4**: REVIEW-001

### Parallel Tasks:

- None (all tasks have dependencies on previous tasks)

---

## Dependencies

### External Dependencies:

- Yup 1.7.1 (already installed)
- Ant Design 6.1.2 (already installed)
- React 19.2.0 (already installed)
- TypeScript 5.9.3 (already installed)

### File Dependencies:

- `src/schemas/postSchema.ts` (exists, will modify)
- `src/components/posts/PostForm.tsx` (exists, will modify)
- `src/pages/CreatePage.tsx` (exists, no changes)
- `src/pages/EditPage.tsx` (exists, no changes)
- `src/types/post.ts` (exists, no changes)

---

## Success Criteria

Implementation is complete when:

- [x] All Phase 0-2 tasks completed
- [x] All Phase 3 test cases pass
- [x] Phase 4 code review checklist complete
- [x] All functional requirements (FR-001 through FR-011) met
- [x] Performance target (<300ms) achieved
- [x] No constitution violations

---

## Files Modified Summary

| File                                | Lines Changed | Type   |
| ----------------------------------- | ------------- | ------ |
| `src/schemas/postSchema.ts`         | ~5 lines      | Modify |
| `src/components/posts/PostForm.tsx` | ~15 lines     | Modify |
| **Total**                           | **~20 lines** |        |

---

## Notes

- No new files required - modifications only
- No test files to create (per constitution)
- Both Create and Edit forms use same PostForm component, ensuring consistency
- All validation is client-side, synchronous, and fast (<300ms target)
