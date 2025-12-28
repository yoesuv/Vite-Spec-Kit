# Data Model: Fix Post Edit Validation

**Feature**: Fix Post Edit Validation  
**Date**: 2025-12-28  
**Status**: Complete

## Overview

This feature modifies form validation state management without introducing new data entities. The data model documents the existing entities and their validation state transitions.

## Entities

### Post (Existing)

Represents a user-created post in the system.

**Source**: `src/types/post.ts`

```typescript
interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
```

**Fields**:

- `id`: Unique identifier for the post
- `userId`: ID of the user who created the post
- `title`: Post title (max 200 characters)
- `body`: Post content (min 10 characters)

**Validation Rules** (from `postSchema.ts`):

- `title`: Required, trimmed, max 200 characters
- `body`: Required, trimmed, min 10 characters

**State Transitions**: None (immutable after creation/update)

### PostFormData (Existing)

Represents form data for creating or editing a post.

**Source**: `src/types/post.ts`

```typescript
interface PostFormData {
  title: string;
  body: string;
}
```

**Usage**:

- Input type for `PostForm` component
- Submitted to create/update handlers
- Validated against `postSchema`

**Validation**: Same rules as `Post` entity

### FormValidationState (Conceptual)

Represents the validation state of the post form. This is not a persisted entity but a component state.

**Source**: `src/components/posts/PostForm.tsx` (internal state)

```typescript
// Component state (not exported)
interface FormValidationState {
  hasErrors: boolean; // True if any field has validation errors
  allTouched: boolean; // True if all required fields have been touched
}
```

**Fields**:

- `hasErrors`: Derived from `form.getFieldsError()`, indicates validation errors
- `allTouched`: Derived from `form.isFieldsTouched(true)`, indicates user interaction

**State Transitions**:

```
CREATE MODE (no initialValues):
  Initial State: { hasErrors: true, allTouched: false }
  → User types in field → { hasErrors: varies, allTouched: false }
  → All fields touched → { hasErrors: varies, allTouched: true }
  → Validation passes → { hasErrors: false, allTouched: true } → Button ENABLED

EDIT MODE (with initialValues) - CURRENT BROKEN BEHAVIOR:
  Initial State: { hasErrors: true, allTouched: false }
  → Form loads with valid data → { hasErrors: false, allTouched: false } → Button DISABLED ❌
  → User must touch fields → { hasErrors: false, allTouched: true } → Button ENABLED

EDIT MODE (with initialValues) - FIXED BEHAVIOR:
  Initial State: { hasErrors: true, allTouched: false }
  → Form loads, validation runs → { hasErrors: false, allTouched: true } → Button ENABLED ✅
  → User edits to invalid → { hasErrors: true, allTouched: true } → Button DISABLED
  → User edits to valid → { hasErrors: false, allTouched: true } → Button ENABLED
```

**Validation Triggers**:

1. **On Mount (Edit Mode)**: `form.validateFields()` called in `useEffect`
2. **On Change**: `onFieldsChange` handler updates state
3. **On Submit**: `onFinish` handler receives validated values

## Validation Schema

**Source**: `src/schemas/postSchema.ts`

```typescript
const postSchema = yup.object({
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

**Validation Behavior**:

- `.trim()`: Removes leading/trailing whitespace before validation
- `.required()`: Field must not be empty after trimming
- `.max()` / `.min()`: Length constraints on trimmed value

**Whitespace Handling** (FR-011):

- Input: `"   "` (whitespace only)
- After trim: `""`
- Validation result: FAIL (required field empty)

## Component Data Flow

### Create Mode Flow

```
User → CreatePage → PostForm (no initialValues)
                    ↓
                    Initial state: disabled button
                    ↓
                    User types → validation → state update
                    ↓
                    All fields valid + touched → enabled button
                    ↓
                    Submit → handleFinish → CreatePage.handleSubmit
                    ↓
                    API call → success → navigate home
```

### Edit Mode Flow (Fixed)

```
User → EditPage → usePost(id) → fetch post data
                    ↓
                    PostForm (with initialValues)
                    ↓
                    useEffect detects edit mode
                    ↓
                    form.validateFields() runs
                    ↓
                    Valid data → { hasErrors: false, allTouched: true }
                    ↓
                    Button ENABLED immediately ✅
                    ↓
                    User edits → validation → state update
                    ↓
                    Submit → handleFinish → EditPage.handleSubmit
                    ↓
                    API call → success → navigate home
```

## Field-Level Validation

**Implementation**: `PostForm.validateField()`

```typescript
const validateField = async (field: string, value: string) => {
  try {
    await postSchema.validateAt(field, { [field]: value });
    return Promise.resolve();
  } catch (err) {
    if (err instanceof Error) {
      return Promise.reject(err.message);
    }
    return Promise.reject("Validation error");
  }
};
```

**Trigger**: `validateTrigger="onChange"` on Form.Item

**Behavior**:

- Validates single field against schema
- Returns Promise (resolve = valid, reject = invalid)
- Error message from Yup schema
- Ant Design Form displays error below field

## Button Enablement Logic

**Current (Broken)**:

```typescript
disabled={hasErrors || !allTouched}
```

**Problem**: `!allTouched` is `true` on edit form load, disabling button

**Fix**: Initialize `allTouched = true` for edit mode with valid data

**After Fix**:

```typescript
// Same disabled logic, but state initialized correctly
disabled={hasErrors || !allTouched}

// Edit mode: allTouched = true after validation on mount
// Create mode: allTouched = false until user touches fields
```

## Data Persistence

**No changes to persistence layer**:

- API endpoints unchanged (`postsApi.ts`)
- Request/response types unchanged
- JSONPlaceholder API contract unchanged

**Existing API Operations**:

- `GET /posts/:id` - Fetch post for editing
- `PUT /posts/:id` - Update post (called on submit)
- `POST /posts` - Create post (unchanged)

## Relationships

```
EditPage
  ├─ uses usePost(id) → fetches Post entity
  ├─ passes Post data as initialValues
  └─ renders PostForm
       ├─ receives initialValues: PostFormData
       ├─ manages FormValidationState (internal)
       ├─ validates against postSchema
       └─ calls onSubmit with PostFormData

CreatePage
  └─ renders PostForm
       ├─ no initialValues
       ├─ manages FormValidationState (internal)
       ├─ validates against postSchema
       └─ calls onSubmit with PostFormData
```

## Constraints

1. **Validation Consistency**: Same `postSchema` rules for create and edit (FR-005)
2. **Performance**: Button state update <100ms (SC-002)
3. **No Breaking Changes**: Create form behavior unchanged
4. **Whitespace Handling**: Trim before validation (FR-011)

## Edge Cases

### 1. Invalid Initial Data in Edit Mode

**Scenario**: Post loaded with body < 10 characters

**Behavior**:

```typescript
useEffect validation → catches error
→ setHasErrors(true), setAllTouched(false)
→ Button remains DISABLED ✅
```

**Meets**: FR-008 (keep button disabled for invalid initial data)

### 2. Whitespace-Only Input

**Scenario**: User enters `"     "` in body field

**Behavior**:

```typescript
Yup validation → .trim() → ""
→ .required() fails → error
→ setHasErrors(true)
→ Button DISABLED ✅
```

**Meets**: FR-011 (treat whitespace-only as invalid)

### 3. Rapid Editing

**Scenario**: User types quickly, deletes, types again

**Behavior**:

```typescript
Each onChange → validateTrigger fires
→ Ant Design debounces internally
→ handleFormChange updates state
→ Button state reflects current validity ✅
```

**Meets**: Performance requirement (debounced validation)

### 4. Unchanged Valid Form

**Scenario**: Edit form loads, user clicks submit without changes

**Behavior**:

```typescript
Initial validation → button ENABLED
→ User clicks submit → handleFinish called
→ Trimmed values sent to API ✅
```

**Meets**: FR-009 (allow submitting unchanged valid form)

## Summary

This feature modifies form validation state management without changing data entities or persistence. The key change is initializing `FormValidationState` correctly for edit mode by running validation on mount. All existing validation rules, schemas, and API contracts remain unchanged.
