# Quickstart: Real-time Form Validation Implementation

**Feature**: 001-form-validation  
**Date**: 2025-12-25  
**Estimated Time**: 2-3 hours

## Prerequisites

- Node.js and npm installed
- Project dependencies installed (`npm install`)
- Familiarity with React, TypeScript, and Ant Design
- Yup 1.7.1 already in package.json

## Quick Overview

Implement real-time form validation for Post forms (Create and Edit) using Yup schemas integrated with Ant Design Form. Validation triggers on every keystroke, displays errors below fields, and controls submit button state.

## Implementation Steps

### Step 1: Update Yup Schema (15 min)

**File**: `src/schemas/postSchema.ts`

**Current State**:

```typescript
body: yup.string().trim().required().min(1).max(10000);
```

**Required Changes**:

1. Update `body` min length from 1 to 10 characters
2. Remove max length constraint (10000) - not in spec
3. Add explicit error messages for all validation rules
4. Ensure title max is 200 characters

**Expected Result**:

```typescript
export const postSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Title is required")
    .max(200, "Title must be at most 200 characters"),
  body: yup
    .string()
    .trim()
    .required("Content is required")
    .min(10, "Content must be at least 10 characters"),
});
```

**Verification**: TypeScript compilation succeeds, no type errors.

---

### Step 2: Update PostForm Component (45-60 min)

**File**: `src/components/posts/PostForm.tsx`

**Changes Required**:

#### 2.1: Add Real-time Validation Trigger

Update Form.Item components to use `validateTrigger="onChange"`:

```typescript
<Form.Item
  name="title"
  label="Title"
  validateTrigger="onChange" // ADD THIS
  rules={[
    {
      validator: (_, value) => validateField("title", value || ""),
    },
  ]}
>
  <Input placeholder="Enter post title" maxLength={200} showCount />
</Form.Item>
```

Repeat for `body` field.

#### 2.2: Implement Submit Button State Logic

Add state tracking before the return statement:

```typescript
const PostForm = ({ initialValues, onSubmit, isLoading, submitText }: PostFormProps) => {
  const [form] = Form.useForm<PostFormData>();

  // ADD: Track form validation state
  const [hasErrors, setHasErrors] = React.useState(true);
  const [allTouched, setAllTouched] = React.useState(false);

  // ADD: Update button state on form change
  const handleFormChange = () => {
    const errors = form.getFieldsError().some(({ errors }) => errors.length > 0);
    const touched = form.isFieldsTouched(true);
    setHasErrors(errors);
    setAllTouched(touched);
  };

  // ... existing validateField and handleFinish functions ...
```

#### 2.3: Wire Form Change Handler

Update Form component:

```typescript
<Form
  form={form}
  layout="vertical"
  initialValues={initialValues}
  onFinish={handleFinish}
  onFieldsChange={handleFormChange}  // ADD THIS
  autoComplete="off"
>
```

#### 2.4: Update Submit Button

```typescript
<Button
  type="primary"
  htmlType="submit"
  loading={isLoading}
  disabled={hasErrors || !allTouched} // ADD disabled logic
  block
>
  {submitText}
</Button>
```

**Verification**:

- Form compiles without errors
- Submit button disabled on initial load
- Submit button disabled when fields invalid
- Submit button enabled when all fields valid

---

### Step 3: Manual Testing (30-45 min)

#### Test Case 1: Initial Load Behavior

1. Navigate to `/create`
2. **Expected**: No validation errors visible
3. **Expected**: Submit button disabled (grayed out)

#### Test Case 2: Title Validation

1. Click in title field
2. Type "A"
3. **Expected**: No error (valid)
4. **Expected**: Submit button still disabled (body not touched)
5. Clear title field
6. **Expected**: Error appears: "Title is required"
7. Type 201 characters
8. **Expected**: Error appears: "Title must be at most 200 characters"

#### Test Case 3: Content Validation

1. Click in content field
2. Type "Short"
3. **Expected**: Error appears: "Content must be at least 10 characters"
4. Type "This is valid content now"
5. **Expected**: Error disappears
6. **Expected**: Submit button enabled (if title also valid)

#### Test Case 4: Submit Button State

1. Fill title with valid text (e.g., "Test Post")
2. Fill content with valid text (e.g., "This is valid content")
3. **Expected**: Submit button enabled
4. Delete one character from content (make it <10 chars)
5. **Expected**: Submit button disabled immediately
6. Add character back
7. **Expected**: Submit button enabled immediately

#### Test Case 5: Edit Form Consistency

1. Navigate to `/edit/1` (edit existing post)
2. **Expected**: Form loads with existing data
3. **Expected**: No validation errors on load
4. Modify title to be invalid
5. **Expected**: Same error messages as Create form
6. **Expected**: Same validation timing as Create form

#### Test Case 6: Performance

1. Type rapidly in title field (10+ chars/second)
2. **Expected**: No lag, UI remains responsive
3. **Expected**: Validation feedback appears within 300ms
4. Paste large text (500 chars) into title
5. **Expected**: Max length error appears immediately

#### Test Case 7: Whitespace Handling

1. Enter only spaces in title field: " "
2. **Expected**: Error appears: "Title is required" (trimmed to empty)
3. Enter " Hello " in title
4. **Expected**: No error (trimmed to "Hello", valid)

**Pass Criteria**: All test cases pass without issues.

---

### Step 4: Code Review Checklist (15 min)

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

---

## Common Issues & Solutions

### Issue 1: Submit button always disabled

**Symptom**: Button never enables even when form is valid

**Solution**: Check `form.isFieldsTouched(true)` - ensure all fields are marked as touched. Verify `onFieldsChange` handler is wired to Form component.

---

### Issue 2: Validation errors on initial load

**Symptom**: Errors appear when form first renders

**Solution**: Ensure `validateTrigger="onChange"` is set, NOT `validateTrigger={['onChange', 'onMount']}`. Remove any `validateFirst` props.

---

### Issue 3: Validation too slow

**Symptom**: Lag when typing, errors appear delayed

**Solution**: Verify Yup validation is synchronous (no `async` in schema). Check for unnecessary re-renders. Use React DevTools Profiler to identify bottlenecks.

---

### Issue 4: Error messages not displaying

**Symptom**: Validation runs but errors don't show

**Solution**: Ensure `validateField` function returns `Promise.reject(message)` on error. Check Ant Design Form.Item has `name` prop matching schema field.

---

## File Modification Summary

| File                                | Action    | Lines Changed |
| ----------------------------------- | --------- | ------------- |
| `src/schemas/postSchema.ts`         | Modify    | ~5 lines      |
| `src/components/posts/PostForm.tsx` | Modify    | ~15 lines     |
| `src/pages/CreatePage.tsx`          | No change | 0             |
| `src/pages/EditPage.tsx`            | No change | 0             |

**Total**: ~20 lines of code changes across 2 files.

---

## Validation Checklist

Before marking this feature complete:

- [ ] Title field validates on every keystroke
- [ ] Content field validates on every keystroke
- [ ] Error messages display below fields
- [ ] Submit button disabled when invalid
- [ ] Submit button enabled when all valid
- [ ] No errors on initial form load
- [ ] Create form validation works correctly
- [ ] Edit form validation works correctly
- [ ] Validation timing <300ms
- [ ] Whitespace trimmed correctly
- [ ] Error messages are clear and actionable
- [ ] No new dependencies added
- [ ] No test files created
- [ ] Code reviewed and approved

---

## Next Steps

After completing implementation:

1. **Manual testing**: Run through all test cases above
2. **Code review**: Have teammate review changes
3. **Merge**: Create PR and merge to main branch
4. **Monitor**: Watch for user feedback on validation UX

---

## Reference Documents

- **Feature Spec**: `specs/001-form-validation/spec.md`
- **Implementation Plan**: `specs/001-form-validation/plan.md`
- **Research**: `specs/001-form-validation/research.md`
- **Data Model**: `specs/001-form-validation/data-model.md`
- **Validation Contract**: `specs/001-form-validation/contracts/validation-contract.md`
- **Constitution**: `.specify/memory/constitution.md`

---

## Estimated Timeline

| Phase            | Duration      | Description                          |
| ---------------- | ------------- | ------------------------------------ |
| Schema Update    | 15 min        | Update Yup validation rules          |
| Component Update | 60 min        | Add real-time validation to PostForm |
| Manual Testing   | 45 min        | Test all scenarios                   |
| Code Review      | 15 min        | Review checklist and cleanup         |
| **Total**        | **2-3 hours** | Complete implementation              |

---

## Success Criteria

Feature is complete when:

1. All functional requirements (FR-001 through FR-011) are met
2. All acceptance scenarios pass manual testing
3. Performance target (<300ms) is achieved
4. Code review checklist is complete
5. No constitution violations
6. User can create and edit posts with real-time validation feedback
