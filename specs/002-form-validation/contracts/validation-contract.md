# Validation Contract: Post Form Validation

**Feature**: 001-form-validation  
**Date**: 2025-12-25  
**Type**: Client-Side Validation Contract

## Overview

This contract defines the validation behavior for Post forms (Create and Edit). All validation is client-side using Yup schemas integrated with Ant Design Form components.

## Validation Interface

### Field Validation Function

**Function**: `validateField`

**Signature**:

```typescript
async (field: string, value: string) => Promise<void>;
```

**Parameters**:

- `field`: Field name to validate ("title" | "body")
- `value`: Current field value (string)

**Returns**:

- `Promise<void>`: Resolves if valid, rejects with error message if invalid

**Behavior**:

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

**Execution Context**: Called by Ant Design Form.Item validator on every keystroke

---

## Validation Rules

### Title Field

**Field Name**: `title`

**Validation Rules**:

| Rule       | Constraint                     | Error Message                          | Priority |
| ---------- | ------------------------------ | -------------------------------------- | -------- |
| Required   | Must not be empty (after trim) | "Title is required"                    | 1        |
| Max Length | ≤ 200 characters (after trim)  | "Title must be at most 200 characters" | 2        |

**Validation Sequence**:

1. Trim whitespace
2. Check required (empty string fails)
3. Check max length (>200 fails)

**Valid Examples**:

- `"My Post Title"` ✅
- `"A"` ✅ (single character)
- `"A".repeat(200)` ✅ (exactly 200 chars)

**Invalid Examples**:

- `""` ❌ (empty - "Title is required")
- `"   "` ❌ (whitespace only - "Title is required" after trim)
- `"A".repeat(201)` ❌ (>200 chars - "Title must be at most 200 characters")

---

### Body Field (Content)

**Field Name**: `body`

**Validation Rules**:

| Rule       | Constraint                     | Error Message                            | Priority |
| ---------- | ------------------------------ | ---------------------------------------- | -------- |
| Required   | Must not be empty (after trim) | "Content is required"                    | 1        |
| Min Length | ≥ 10 characters (after trim)   | "Content must be at least 10 characters" | 2        |

**Validation Sequence**:

1. Trim whitespace
2. Check required (empty string fails)
3. Check min length (<10 fails)

**Valid Examples**:

- `"This is valid content."` ✅ (>10 chars)
- `"Ten chars!"` ✅ (exactly 10 chars)
- `"A".repeat(10)` ✅ (exactly 10 chars)

**Invalid Examples**:

- `""` ❌ (empty - "Content is required")
- `"   "` ❌ (whitespace only - "Content is required" after trim)
- `"Short"` ❌ (5 chars - "Content must be at least 10 characters")
- `"Nine char"` ❌ (9 chars - "Content must be at least 10 characters")

---

## Form Validation State

### Submit Button State Contract

**Function**: Determine if submit button should be enabled

**Logic**:

```typescript
const hasErrors = form.getFieldsError().some(({ errors }) => errors.length > 0);
const allFieldsTouched = form.isFieldsTouched(true);

const isSubmitDisabled = hasErrors || !allFieldsTouched;
```

**States**:

| Scenario                 | hasErrors | allFieldsTouched | Button State | Rationale                        |
| ------------------------ | --------- | ---------------- | ------------ | -------------------------------- |
| Initial load             | false     | false            | Disabled     | No user interaction yet (FR-011) |
| User typed in title only | false     | false            | Disabled     | Body not touched yet             |
| All fields valid         | false     | true             | Enabled      | Ready to submit (FR-005)         |
| Title invalid            | true      | true             | Disabled     | Has validation errors (FR-004)   |
| Body invalid             | true      | true             | Disabled     | Has validation errors (FR-004)   |
| Both invalid             | true      | true             | Disabled     | Has validation errors (FR-004)   |

---

## Validation Timing

### Trigger Configuration

**Ant Design Form.Item Configuration**:

```typescript
<Form.Item
  name="title"
  validateTrigger="onChange"
  rules={[
    {
      validator: (_, value) => validateField("title", value || ""),
    },
  ]}
>
  <Input />
</Form.Item>
```

**Trigger Events**:

- `onChange`: Fires on every keystroke
- **NOT** `onBlur`: Validation happens during typing, not on field exit
- **NOT** `onSubmit`: Validation happens before submission attempt

**Timing Guarantees**:

- Validation executes within 300ms of keystroke (SC-001)
- Typically <50ms for synchronous Yup validation
- Error message displays immediately after validation completes
- Submit button state updates immediately after validation completes

---

## Error Display Contract

### Error Message Positioning

**Location**: Directly below the form field (between field and next element)

**Ant Design Structure**:

```html
<div class="ant-form-item">
  <div class="ant-form-item-label">
    <label>Title</label>
  </div>
  <div class="ant-form-item-control">
    <input class="ant-input" />
    <!-- Error appears here when invalid -->
    <div class="ant-form-item-explain ant-form-item-explain-error">
      <div role="alert">Title is required</div>
    </div>
  </div>
</div>
```

**Styling**:

- Red text color (Ant Design error theme)
- Error icon (optional, Ant Design default)
- Accessible `role="alert"` for screen readers

**Visibility Rules**:

- **Show**: When field is invalid AND user has typed in the field
- **Hide**: When field is valid OR field is untouched
- **Transition**: Immediate (no fade/animation required)

---

## Validation Lifecycle

### Per-Field Lifecycle

```
1. Initial State (Untouched)
   - No validation executed
   - No errors displayed
   - Field contributes to "submit disabled" state

2. First Keystroke
   - Validation executes
   - If invalid: Error message appears
   - If valid: No error message
   - Field marked as "touched"

3. Subsequent Keystrokes
   - Validation executes on every keystroke
   - Error message updates in real-time
   - Submit button state recalculated

4. Becomes Valid
   - Error message disappears immediately
   - Submit button enabled if all fields valid

5. Becomes Invalid Again
   - Error message reappears immediately
   - Submit button disabled
```

### Form-Level Lifecycle

```
Initial Load
  ↓
User starts typing in any field
  ↓
Real-time validation active for that field
  ↓
User completes all required fields
  ↓
All fields valid → Submit button enabled
  ↓
User clicks submit
  ↓
Form values trimmed and passed to onSubmit
  ↓
API call (outside validation scope)
```

---

## Consistency Requirements

### Cross-Form Consistency (FR-006)

**Requirement**: Create and Edit forms must have identical validation behavior

**Guaranteed by**:

- Both forms use same `PostForm` component
- Both forms use same `postSchema` Yup schema
- Both forms use same `validateField` function
- Both forms use same Ant Design Form configuration

**Verification**:

- Same error messages for same violations
- Same timing (300ms target)
- Same visual presentation
- Same submit button logic

---

## Performance Contract

### Validation Performance

**Target**: <300ms from keystroke to UI update (SC-001)

**Measured Components**:

1. Event propagation: <5ms
2. Yup validation: <10ms
3. Ant Design state update: <20ms
4. React re-render: <16ms (60fps)
5. Browser paint: <16ms (60fps)

**Total**: Typically <50ms, well under 300ms target

**No Optimization Required**:

- No debouncing (would delay feedback)
- No throttling (would skip validations)
- No async validation (all rules are synchronous)

---

## Edge Cases

### Rapid Typing

**Scenario**: User types very quickly (10+ chars/second)

**Behavior**:

- Validation executes on every keystroke
- No debouncing applied
- Each validation completes before next keystroke (Yup is fast)
- UI remains responsive (60fps)

**Guarantee**: No validation skipped, no lag introduced

---

### Whitespace Handling

**Scenario**: User enters only whitespace

**Behavior**:

- Value trimmed before validation
- Empty string after trim → "required" error
- Error message: "Title is required" or "Content is required"

**Examples**:

- `"   "` → Trimmed to `""` → Required error
- `"  Hello  "` → Trimmed to `"Hello"` → Valid (5 chars for title, invalid for content)

---

### Copy-Paste Large Content

**Scenario**: User pastes 500 characters into title field

**Behavior**:

- Validation executes immediately
- Max length error appears: "Title must be at most 200 characters"
- Submit button disabled
- No performance degradation (string length check is O(1))

---

## Testing Strategy

**Per Constitution**: NO automated tests

**Validation Approach**:

- Manual testing during development
- Code review for Yup schema correctness
- Runtime validation in browser
- Static type checking (TypeScript)

**Manual Test Cases**:

1. Type in title field → see immediate validation
2. Type in body field → see immediate validation
3. Clear field → see required error
4. Exceed max length → see length error
5. Enter <10 chars in body → see min length error
6. Fill both fields validly → submit button enabled
7. Refresh page → no errors on load

---

## Summary

This contract defines client-side validation behavior for Post forms using Yup and Ant Design Form. Validation is immediate (on every keystroke), synchronous (<300ms), and consistent across Create and Edit forms. All validation logic is centralized in `postSchema.ts` and integrated via Ant Design Form's validator mechanism.
