# Form Validation Contract

**Feature**: Fix Post Edit Validation  
**Date**: 2025-12-28  
**Version**: 1.0.0

## Overview

This contract defines the validation behavior for the PostForm component in both create and edit modes. It specifies the validation rules, state management, and button enablement logic.

## Component Interface

### PostForm Component

**Location**: `src/components/posts/PostForm.tsx`

**Props**:

```typescript
interface PostFormProps {
  initialValues?: PostFormData; // Optional: provided in edit mode
  onSubmit: (values: PostFormData) => void;
  isLoading?: boolean;
  submitText?: string;
}
```

**Input Contract**:

- `initialValues`: When provided, component operates in edit mode
  - Must contain `title` and `body` fields
  - Values will be validated on mount
- `onSubmit`: Callback receives validated and trimmed form data
- `isLoading`: Controls submit button loading state
- `submitText`: Custom text for submit button

**Output Contract**:

```typescript
interface PostFormData {
  title: string; // Trimmed, validated
  body: string; // Trimmed, validated
}
```

## Validation Rules

### Field: title

**Type**: `string`

**Rules**:

1. Required (after trimming)
2. Maximum 200 characters (after trimming)
3. Leading/trailing whitespace removed

**Error Messages**:

- Empty: "Title is required"
- Too long: "Title must be at most 200 characters"

**Validation Trigger**: `onChange`

### Field: body

**Type**: `string`

**Rules**:

1. Required (after trimming)
2. Minimum 10 characters (after trimming)
3. Leading/trailing whitespace removed

**Error Messages**:

- Empty: "Content is required"
- Too short: "Content must be at least 10 characters"

**Validation Trigger**: `onChange`

### Whitespace Handling

**Contract**: Whitespace-only input is treated as invalid

**Implementation**:

```typescript
// Input: "   hello   "
// After trim: "hello"
// Validation: PASS (if meets other rules)

// Input: "     "
// After trim: ""
// Validation: FAIL (required field empty)
```

**Meets**: FR-011 requirement

## Validation State Management

### State Variables

```typescript
interface ValidationState {
  hasErrors: boolean; // True if any field has validation errors
  allTouched: boolean; // True if all required fields have been touched
}
```

### State Initialization

**Create Mode** (no `initialValues`):

```typescript
Initial: { hasErrors: true, allTouched: false }
```

**Edit Mode** (with `initialValues`):

```typescript
Initial: { hasErrors: true, allTouched: false }
After mount validation:
  - Valid data: { hasErrors: false, allTouched: true }
  - Invalid data: { hasErrors: true, allTouched: false }
```

### State Transitions

**Create Mode**:

```
{ hasErrors: true, allTouched: false }
  → User types in first field
  → { hasErrors: varies, allTouched: false }
  → User touches all required fields
  → { hasErrors: varies, allTouched: true }
  → All validations pass
  → { hasErrors: false, allTouched: true }
```

**Edit Mode**:

```
{ hasErrors: true, allTouched: false }
  → useEffect runs validation on mount
  → { hasErrors: false, allTouched: true } (if valid)
  → User edits field to invalid value
  → { hasErrors: true, allTouched: true }
  → User edits field back to valid value
  → { hasErrors: false, allTouched: true }
```

## Button Enablement Logic

### Contract

**Submit button is ENABLED when**:

```typescript
!hasErrors && allTouched;
```

**Submit button is DISABLED when**:

```typescript
hasErrors || !allTouched;
```

### Mode-Specific Behavior

**Create Mode**:

- Button starts DISABLED
- Button ENABLES after all fields touched and valid

**Edit Mode**:

- Button starts DISABLED during data load
- Button ENABLES immediately after mount if data is valid
- Button state updates in real-time during editing

### Performance Contract

**Requirement**: Button state must update within 100ms of validation completing (SC-002)

**Implementation**:

- Synchronous state updates
- Ant Design Form built-in debouncing
- No additional async operations

## Validation Lifecycle

### Create Mode Lifecycle

```
1. Component Mount
   → Initial state: { hasErrors: true, allTouched: false }
   → Button: DISABLED

2. User Interaction
   → onChange event → validateField()
   → onFieldsChange → handleFormChange()
   → Update state based on validation results
   → Button: DISABLED (until all touched and valid)

3. All Fields Valid and Touched
   → State: { hasErrors: false, allTouched: true }
   → Button: ENABLED

4. Submit
   → onFinish → handleFinish()
   → Trim values → call onSubmit()
```

### Edit Mode Lifecycle

```
1. Component Mount with initialValues
   → Initial state: { hasErrors: true, allTouched: false }
   → Button: DISABLED

2. useEffect Runs (after mount)
   → Detect edit mode: Boolean(initialValues)
   → Call form.validateFields()
   → Update state based on validation results
   → State: { hasErrors: false, allTouched: true } (if valid)
   → Button: ENABLED

3. User Edits Field
   → onChange event → validateField()
   → onFieldsChange → handleFormChange()
   → Update state based on validation results
   → Button: reflects current validation state

4. Submit
   → onFinish → handleFinish()
   → Trim values → call onSubmit()
```

## Error Handling

### Validation Errors

**Display**: Ant Design Form displays errors below each field

**Format**:

```typescript
<Form.Item
  name="body"
  validateStatus="error"  // Set by Form when validation fails
  help="Content must be at least 10 characters"  // Error message
>
```

**Timing**: Errors appear immediately on `onChange` (with debouncing)

### Edge Cases

**Case 1: Invalid Initial Data in Edit Mode**

```typescript
Contract: Button remains DISABLED
Implementation: validateFields() catches error, sets hasErrors=true
```

**Case 2: Rapid Typing**

```typescript
Contract: Validation debounced, no excessive re-renders
Implementation: Ant Design Form built-in debouncing
```

**Case 3: Revert to Original Valid State**

```typescript
Contract: Button re-enables when validation passes
Implementation: handleFormChange tracks current state
```

## API Contract

### No API Changes

This feature does NOT modify API contracts. Existing endpoints remain unchanged:

**GET /posts/:id** (used by EditPage):

```typescript
Response: {
  id: number;
  userId: number;
  title: string;
  body: string;
}
```

**PUT /posts/:id** (called on edit submit):

```typescript
Request: {
  id: number;
  userId: number;
  title: string; // Trimmed
  body: string; // Trimmed
}
```

**POST /posts** (called on create submit):

```typescript
Request: {
  userId: number;
  title: string; // Trimmed
  body: string; // Trimmed
}
```

## Testing Contract

**Per Constitution**: NO TESTING (NON-NEGOTIABLE)

**Validation Method**: Manual testing and code review

**Manual Test Cases**:

1. Create form: verify button disabled until all fields valid
2. Edit form with valid data: verify button enabled on load
3. Edit form with invalid data: verify button disabled on load
4. Edit field to invalid: verify button disables
5. Edit field to valid: verify button enables
6. Whitespace-only input: verify treated as invalid

## Backward Compatibility

**Contract**: Create form behavior MUST remain unchanged

**Guarantees**:

- Create mode validation logic unchanged
- Same validation rules for both modes
- Same error messages
- Same user interaction patterns

**Breaking Changes**: NONE

## Performance Guarantees

1. **Button state update**: <100ms after validation completes
2. **Initial validation (edit mode)**: <10ms on mount
3. **Real-time validation**: Debounced, no excessive re-renders
4. **Total form mount time**: <50ms additional overhead

## Success Criteria

**SC-001**: Edit form with valid data enables button immediately (0 seconds delay) ✅  
**SC-002**: Button state updates within 100ms of validation completing ✅  
**SC-003**: 100% of valid edit forms have enabled buttons on load ✅  
**SC-004**: Validation behavior identical between create and edit (0 discrepancies) ✅

## Version History

- **1.0.0** (2025-12-28): Initial contract for validation fix
