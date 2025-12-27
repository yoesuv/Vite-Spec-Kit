# Quickstart: Fix Post Edit Validation

**Feature**: Fix Post Edit Validation  
**Branch**: `004-fix-post-edit-validation`  
**Date**: 2025-12-28

## Problem Statement

The post edit form has a validation bug where the submit button remains disabled even when the form loads with valid existing data. Users must manually touch/edit fields before the button enables, creating a poor user experience.

## Solution Overview

Modify `PostForm.tsx` to detect edit mode and run validation on mount when `initialValues` are provided. This ensures the submit button is enabled immediately for valid data while maintaining the same validation behavior for create mode.

## Quick Implementation Guide

### Step 1: Understand the Current Issue

**File**: `src/components/posts/PostForm.tsx`

**Current Logic**:

```typescript
const [hasErrors, setHasErrors] = useState(true);
const [allTouched, setAllTouched] = useState(false);

// Button disabled when: hasErrors || !allTouched
disabled={hasErrors || !allTouched}
```

**Problem**: `allTouched` starts as `false`, requiring user interaction even when form has valid pre-populated data.

### Step 2: Add Edit Mode Detection

Add this near the top of the component:

```typescript
const isEditMode = Boolean(initialValues);
```

### Step 3: Add Initial Validation for Edit Mode

Add this `useEffect` hook after state declarations:

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

### Step 4: Verify No Other Changes Needed

**Keep unchanged**:

- `validateField` function
- `handleFormChange` function
- `handleFinish` function
- Validation schema (`postSchema.ts`)
- Button disabled logic

## File Changes Summary

### Modified Files

**1. `src/components/posts/PostForm.tsx`**

- Add `isEditMode` detection
- Add `useEffect` for initial validation
- Total changes: ~15 lines added

### Unchanged Files

- `src/pages/EditPage.tsx` - Already passes `initialValues` correctly
- `src/pages/CreatePage.tsx` - No changes needed
- `src/schemas/postSchema.ts` - Validation rules unchanged
- `src/types/post.ts` - Types unchanged
- `src/api/postsApi.ts` - API unchanged

## Testing Checklist

**Per Constitution**: NO AUTOMATED TESTING

**Manual Verification**:

1. **Create Form** (verify no regression):

   - [ ] Navigate to `/create`
   - [ ] Submit button is disabled on load
   - [ ] Type in title field
   - [ ] Submit button still disabled (body not touched)
   - [ ] Type in body field (>10 chars)
   - [ ] Submit button enables
   - [ ] Clear body field
   - [ ] Submit button disables

2. **Edit Form - Valid Data**:

   - [ ] Navigate to `/edit/1`
   - [ ] Wait for data to load
   - [ ] Submit button is ENABLED immediately ✅
   - [ ] Click submit without changes
   - [ ] Post updates successfully

3. **Edit Form - Invalid Data**:

   - [ ] Edit post to have body < 10 characters (manually via API/DB)
   - [ ] Navigate to edit page
   - [ ] Submit button is DISABLED on load ✅
   - [ ] Edit body to >10 characters
   - [ ] Submit button enables

4. **Edit Form - Whitespace**:

   - [ ] Load edit form with valid data
   - [ ] Clear body field, enter only spaces
   - [ ] Submit button disables ✅
   - [ ] Enter valid content
   - [ ] Submit button enables

5. **Edit Form - Real-time Validation**:
   - [ ] Load edit form
   - [ ] Edit body to <10 characters
   - [ ] Submit button disables
   - [ ] Edit body to >10 characters
   - [ ] Submit button enables within 100ms ✅

## Development Workflow

### 1. Branch Setup

```bash
git checkout -b 004-fix-post-edit-validation
```

### 2. Make Changes

Edit `src/components/posts/PostForm.tsx` as described above.

### 3. Local Testing

```bash
npm run dev
```

Navigate to `http://localhost:5173` and test all scenarios above.

### 4. Code Review

Verify:

- Clean code (readable, maintainable)
- No breaking changes to create form
- Performance <100ms for button state updates
- Consistent validation between create and edit

### 5. Commit

```bash
git add src/components/posts/PostForm.tsx
git commit -m "fix: enable submit button on edit form load with valid data

- Add edit mode detection via initialValues prop
- Run validation on mount for edit mode
- Initialize button state based on validation results
- Maintain create form behavior unchanged

Fixes validation issue where submit button remained disabled
on edit form load even with valid existing data."
```

## Key Implementation Details

### Edit Mode Detection

```typescript
const isEditMode = Boolean(initialValues);
```

**Why**: Simple, explicit check. Edit mode = when `initialValues` provided.

### Validation on Mount

```typescript
useEffect(() => {
  if (isEditMode && initialValues) {
    form
      .validateFields()
      .then(() => {
        // All fields valid
        setHasErrors(false);
        setAllTouched(true); // Enable button
      })
      .catch(() => {
        // Has validation errors
        setHasErrors(true);
        setAllTouched(false); // Keep button disabled
      });
  }
}, [initialValues, form, isEditMode]);
```

**Why**:

- Runs after form initializes with values
- Validates all fields at once
- Sets button state based on results
- Only runs in edit mode
- Re-runs if `initialValues` change (switching posts)

### No Changes to Real-time Validation

```typescript
const handleFormChange = () => {
  const errors = form.getFieldsError().some(({ errors }) => errors.length > 0);
  const touched = form.isFieldsTouched(true);
  setHasErrors(errors);
  setAllTouched(touched);
};
```

**Why**: Already handles real-time validation correctly. Works for both create and edit modes.

## Performance Considerations

### Initial Validation Cost

- **Operation**: `form.validateFields()`
- **Time**: ~1-5ms
- **Frequency**: Once on mount (edit mode only)
- **Impact**: Negligible

### Button State Update

- **Operation**: `setState` calls
- **Time**: <1ms (synchronous)
- **Total**: <10ms from mount to button enabled
- **Meets**: SC-002 requirement (<100ms)

### Real-time Validation

- **Debouncing**: Built into Ant Design Form
- **No additional overhead**: Uses existing validation logic
- **Performance**: Same as before

## Troubleshooting

### Issue: Button still disabled on edit load

**Check**:

1. Is `initialValues` prop being passed? (Check EditPage.tsx)
2. Is data loaded before rendering form? (Check loading state)
3. Are initial values valid? (Check validation rules)

**Debug**:

```typescript
useEffect(() => {
  console.log("Edit mode:", isEditMode);
  console.log("Initial values:", initialValues);
  if (isEditMode && initialValues) {
    form
      .validateFields()
      .then(() => {
        console.log("Validation passed");
        setHasErrors(false);
        setAllTouched(true);
      })
      .catch((err) => {
        console.log("Validation failed:", err);
        setHasErrors(true);
        setAllTouched(false);
      });
  }
}, [initialValues, form, isEditMode]);
```

### Issue: Create form broken

**Check**:

1. Is `isEditMode` false for create? (Should be, no `initialValues`)
2. Is `useEffect` running in create mode? (Should not, `isEditMode` check)

**Verify**: Create form should work exactly as before.

### Issue: Button enables for invalid data

**Check**:

1. Are validation rules correct in `postSchema.ts`?
2. Is `form.validateFields()` catching errors?
3. Is `.catch()` block setting `hasErrors = true`?

## Related Documentation

- **Spec**: `./spec.md` - Full feature specification
- **Research**: `./research.md` - Technical research and decisions
- **Data Model**: `./data-model.md` - Entity and state definitions
- **Contracts**: `./contracts/form-validation.md` - Validation contract

## Success Criteria

After implementation, verify:

- ✅ **SC-001**: Edit form with valid data enables button immediately (0 seconds delay)
- ✅ **SC-002**: Button state updates within 100ms of validation completing
- ✅ **SC-003**: 100% of valid edit forms have enabled buttons on load
- ✅ **SC-004**: Validation behavior identical between create and edit (0 discrepancies)

## Next Steps

After completing this feature:

1. Run through manual testing checklist
2. Verify no regression in create form
3. Commit changes with descriptive message
4. Create pull request for code review
5. Deploy after approval

## Support

For questions or issues:

- Review research.md for technical decisions
- Check data-model.md for state transitions
- Refer to contracts/form-validation.md for validation rules
