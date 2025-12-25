# Research: Real-time Form Validation with Yup and Ant Design

**Feature**: 001-form-validation  
**Date**: 2025-12-25  
**Status**: Complete

## Overview

This document consolidates research findings for implementing real-time form validation using Yup with Ant Design Form components in a React application.

## Research Areas

### 1. Ant Design Form Real-time Validation Patterns

**Decision**: Use `validateTrigger="onChange"` with Ant Design Form.Item rules

**Rationale**:

- Ant Design Form provides built-in support for real-time validation through the `validateTrigger` prop
- Setting `validateTrigger="onChange"` triggers validation on every keystroke
- This integrates seamlessly with Yup validation through custom validator functions
- Ant Design automatically handles error display below fields and submit button state

**Alternatives Considered**:

- Manual onChange handlers with state management: Rejected due to complexity and duplication of Ant Design's built-in validation system
- React Hook Form: Rejected because Ant Design Form is already in use and provides equivalent functionality
- Formik: Rejected to avoid adding new dependencies (violates Minimal Dependencies principle)

**Implementation Pattern**:

```typescript
<Form.Item
  name="fieldName"
  validateTrigger="onChange"
  rules={[
    {
      validator: async (_, value) => {
        await yupSchema.validateAt("fieldName", { fieldName: value });
      },
    },
  ]}
>
  <Input />
</Form.Item>
```

### 2. Preventing Validation Errors on Initial Load

**Decision**: Use `validateTrigger="onChange"` without `validateFirst` on mount

**Rationale**:

- Ant Design Form does not validate on mount by default when using `validateTrigger="onChange"`
- Validation only triggers after user interaction (typing in field)
- This naturally satisfies FR-011 (no errors on initial load)
- Submit button state is controlled separately through form validation state

**Alternatives Considered**:

- Custom touched state tracking: Rejected as unnecessary - Ant Design handles this internally
- Delayed validation with setTimeout: Rejected as it adds complexity and doesn't align with "immediate keystroke validation" requirement

### 3. Yup Schema Design for Post Form

**Decision**: Update existing `postSchema.ts` with precise constraints from spec

**Rationale**:

- Title: required, max 200 characters (matches clarification)
- Content: required, min 10 characters (matches clarification)
- Use `.trim()` to handle whitespace consistently
- Custom error messages for each validation rule (FR-008, User Story 3)

**Schema Structure**:

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

**Alternatives Considered**:

- Separate schemas for create/edit: Rejected because FR-006 requires same validation rules
- Min length for title: Not specified in requirements, so not included

### 4. Submit Button State Management

**Decision**: Use Ant Design Form's built-in `isFieldsTouched` and `getFieldsError` with disabled button logic

**Rationale**:

- Ant Design Form automatically tracks field validation state
- Button can be disabled based on form validation errors
- No additional state management needed
- Aligns with FR-004 (disable when invalid) and FR-005 (enable when valid)

**Implementation Pattern**:

```typescript
const hasErrors = form.getFieldsError().some(({ errors }) => errors.length > 0);
const hasUntouched = !form.isFieldsTouched(true);

<Button htmlType="submit" disabled={hasErrors || hasUntouched}>
  Submit
</Button>;
```

**Note**: Based on clarification Q5, we need to ensure button is disabled on initial load (before user types), which `isFieldsTouched(true)` handles.

**Alternatives Considered**:

- Manual form state tracking: Rejected due to complexity
- Tooltip on disabled button: Rejected per clarification Q4 (only disabled styling)

### 5. Performance Optimization for 300ms Target

**Decision**: No debouncing required - Yup validation is synchronous and fast

**Rationale**:

- Yup's synchronous validation for string length/required checks executes in <10ms
- No network calls involved (client-side only)
- Ant Design Form's validation is optimized for real-time use
- 300ms target easily met without additional optimization

**Measurement Strategy**:

- Browser DevTools Performance profiling during development
- Manual testing with rapid typing to verify no lag

**Alternatives Considered**:

- Debouncing validation: Rejected because it would delay feedback beyond "immediate" requirement
- Web Workers for validation: Rejected as over-engineering for simple string validation
- Memoization: Not needed for stateless Yup validation

### 6. Error Message Display Positioning

**Decision**: Use Ant Design Form.Item default error display (below field)

**Rationale**:

- Ant Design Form.Item renders errors directly below the input by default
- Matches clarification Q3 (below field, between field and next element)
- Accessible - screen readers announce errors in natural reading order
- Responsive - works on all screen sizes

**CSS Considerations**:

- No custom styling needed - Ant Design's default error styling is sufficient
- Error messages use `.ant-form-item-explain-error` class
- Red color and error icon provided by Ant Design theme

**Alternatives Considered**:

- Custom error positioning with absolute positioning: Rejected to maintain Ant Design consistency
- Inline errors to the right: Rejected per clarification Q3

### 7. Handling Edge Cases

**Edge Case 1: Rapid typing and deletion**

- **Solution**: Ant Design Form handles this naturally - each onChange triggers validation
- **No debouncing needed** per research area 5

**Edge Case 2: Navigation with unsaved changes**

- **Out of scope** for this feature - mentioned in spec edge cases but not in functional requirements
- Can be addressed in future feature if needed

**Edge Case 3: Validation rules changing during form fill**

- **Not applicable** - validation rules are static in Yup schema
- If dynamic rules needed in future, would require schema regeneration

**Edge Case 4: Client-side validation disabled**

- **Handled by server-side validation** per assumption in spec
- Client-side validation is UX enhancement only (FR-010 prevents submission, but server validates)

## Technology Stack Confirmation

- **React**: 19.2.0 ✅ (already in use)
- **TypeScript**: 5.9.3 ✅ (already in use)
- **Yup**: 1.7.1 ✅ (already in package.json)
- **Ant Design**: 6.1.2 ✅ (already in use)
- **Vite**: 7.2.4 ✅ (build tool)

**No new dependencies required** - all necessary libraries already present.

## Best Practices Summary

1. **Centralize validation logic** in Yup schemas (single source of truth)
2. **Leverage Ant Design Form's built-in validation** rather than custom state management
3. **Use meaningful error messages** that explain what's wrong and how to fix it
4. **Keep validation synchronous** for immediate feedback
5. **Follow Ant Design patterns** for consistency with existing UI
6. **No testing** per constitution - rely on Yup schema correctness and runtime validation

## Implementation Checklist

- [ ] Update `postSchema.ts` with precise validation rules (title max 200, content min 10)
- [ ] Modify `PostForm.tsx` to use `validateTrigger="onChange"`
- [ ] Implement submit button disabled state based on form validation
- [ ] Verify error messages display below fields
- [ ] Ensure no errors on initial form load
- [ ] Test validation feedback timing (<300ms)
- [ ] Verify consistent behavior between Create and Edit forms

## References

- [Ant Design Form Validation](https://ant.design/components/form#form-item-validatetrigger)
- [Yup Schema Validation](https://github.com/jquense/yup)
- Project Constitution: `.specify/memory/constitution.md`
- Feature Spec: `specs/001-form-validation/spec.md`
