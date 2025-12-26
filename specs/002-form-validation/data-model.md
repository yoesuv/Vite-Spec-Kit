# Data Model: Real-time Form Validation

**Feature**: 001-form-validation  
**Date**: 2025-12-25

## Overview

This feature implements client-side form validation without introducing new data entities. It enhances existing Post form interactions with real-time validation feedback.

## Entities

### PostFormData (Existing Type)

**Description**: TypeScript interface representing the form data structure for creating and editing posts.

**Location**: `src/types/post.ts`

**Fields**:

| Field | Type   | Required | Constraints                 | Description        |
| ----- | ------ | -------- | --------------------------- | ------------------ |
| title | string | Yes      | max 200 characters, trimmed | Post title field   |
| body  | string | Yes      | min 10 characters, trimmed  | Post content field |

**Validation Rules** (enforced by Yup schema):

- `title`: Required, maximum 200 characters after trimming whitespace
- `body`: Required, minimum 10 characters after trimming whitespace

**State Transitions**: N/A (stateless form data)

**Relationships**: None (form DTO only)

---

### ValidationError (Implicit)

**Description**: Error state managed internally by Ant Design Form and Yup. Not a persisted entity.

**Structure** (runtime only):

| Field   | Type   | Description                                                  |
| ------- | ------ | ------------------------------------------------------------ |
| field   | string | Field name that failed validation (e.g., "title", "body")    |
| message | string | Human-readable error message                                 |
| rule    | string | Validation rule that failed (e.g., "required", "max", "min") |

**Lifecycle**:

1. **Created**: When user types invalid data in a field
2. **Updated**: On every keystroke that changes validation state
3. **Cleared**: When user corrects the input to valid data
4. **Destroyed**: When form is submitted or reset

**Error Messages** (from Yup schema):

| Field | Rule     | Message                                  |
| ----- | -------- | ---------------------------------------- |
| title | required | "Title is required"                      |
| title | max      | "Title must be at most 200 characters"   |
| body  | required | "Content is required"                    |
| body  | min      | "Content must be at least 10 characters" |

---

### FormValidationState (Implicit)

**Description**: Internal state managed by Ant Design Form to track overall form validity.

**Properties** (not directly exposed):

| Property | Type                    | Description                                  |
| -------- | ----------------------- | -------------------------------------------- |
| isValid  | boolean                 | True when all fields pass validation         |
| errors   | ValidationError[]       | Array of current validation errors           |
| touched  | Record<string, boolean> | Tracks which fields user has interacted with |
| values   | PostFormData            | Current form field values                    |

**State Transitions**:

```
Initial Load (Untouched)
  ↓ (user starts typing)
Touched + Invalid (errors present)
  ↓ (user corrects input)
Touched + Valid (no errors)
  ↓ (user submits)
Submitted
```

**Submit Button State Logic**:

- **Disabled**: `hasErrors || !allFieldsTouched`
- **Enabled**: `!hasErrors && allFieldsTouched`

Where:

- `hasErrors`: At least one field has validation errors
- `allFieldsTouched`: User has interacted with all required fields

---

## Validation Schema (Yup)

**Location**: `src/schemas/postSchema.ts`

**Schema Definition**:

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

export type PostFormValues = yup.InferType<typeof postSchema>;
```

**Validation Execution**:

- **Trigger**: Every keystroke in any field (`onChange` event)
- **Method**: `yupSchema.validateAt(fieldName, { [fieldName]: value })`
- **Timing**: Synchronous, <10ms per field
- **Scope**: Field-level validation (validates one field at a time)

---

## Data Flow

### Validation Flow (per keystroke)

```
User types in field
  ↓
onChange event fires
  ↓
Ant Design Form captures new value
  ↓
Form.Item validator function called
  ↓
Yup validateAt() executes for field
  ↓
  ├─ Valid: Clear error, enable submit if all valid
  └─ Invalid: Set error message, disable submit
  ↓
UI updates (error display + button state)
```

**Performance**: Total flow <300ms (target), typically <50ms

### Form Submission Flow

```
User clicks submit button
  ↓
Check: Button enabled? (all fields valid)
  ↓ Yes
onFinish handler called
  ↓
Trim values (title, body)
  ↓
Pass to parent onSubmit callback
  ↓
API call (CreatePage or EditPage)
  ↓
Server-side validation (safety net)
```

---

## Component State Management

### PostForm Component

**Internal State**:

- `form`: Ant Design Form instance (via `Form.useForm()`)
  - Manages field values
  - Tracks validation errors
  - Controls submit button state

**Props** (unchanged):

```typescript
interface PostFormProps {
  initialValues?: PostFormData;
  onSubmit: (values: PostFormData) => void;
  isLoading?: boolean;
  submitText?: string;
}
```

**State Updates**:

- Field value changes: Managed by Ant Design Form
- Validation errors: Managed by Form.Item rules
- Submit button state: Derived from form validation state

---

## Constraints & Invariants

### Invariants

1. **Validation Consistency**: Same validation rules apply to both Create and Edit forms (FR-006)
2. **No Initial Errors**: Validation errors never display on initial form load (FR-011)
3. **Immediate Feedback**: Validation executes on every keystroke after user starts typing (FR-001)
4. **Button State**: Submit button disabled when any field invalid or untouched (FR-004, FR-005)

### Performance Constraints

- Validation latency: <300ms (SC-001)
- UI responsiveness: 60fps during typing
- No debouncing: Immediate validation per keystroke

### Business Rules

- Title: 1-200 characters (after trim)
- Content: 10+ characters (after trim)
- Both fields required
- Whitespace trimmed before validation and submission

---

## Migration Notes

**Existing Schema Changes**:

Current `postSchema.ts`:

```typescript
body: yup.string().trim().required().min(1).max(10000);
```

Updated `postSchema.ts`:

```typescript
body: yup
  .string()
  .trim()
  .required("Content is required")
  .min(10, "Content must be at least 10 characters");
```

**Changes**:

- Content min length: 1 → 10 characters
- Content max length: 10000 → removed (not in spec)
- Added explicit error messages for all rules

**Impact**: Existing posts with content <10 characters will fail validation if edited. This is acceptable per spec requirements.

---

## Summary

This feature introduces no new persisted data entities. It enhances the existing `PostFormData` type with runtime validation state managed by Ant Design Form and Yup. All validation is client-side, synchronous, and provides immediate feedback within performance constraints.
