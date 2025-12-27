# UI Component Interface Contract

## Overview

This feature is UI-only with no API endpoints. This document defines the component interface contracts for the enhanced post form UI.

## Component Contracts

### PostFormCard Component

**Purpose**: Wrapper component that provides centered card layout for post creation/editing forms.

**Props Interface**:

```typescript
interface PostFormCardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}
```

**Behavior Contract**:

- MUST render children within Ant Design Card component
- MUST apply responsive width constraints:
  - Desktop (>1024px): 60% width, max 900px, min 480px
  - Mobile (<768px): 100% width minus 32px total horizontal padding
- MUST center horizontally using flexbox or margin auto
- MUST maintain card elevation/shadow from Ant Design defaults
- MUST respect theme (light/dark) from ThemeContext

**CSS Contract**:

```css
.post-form-card-container {
  display: flex;
  justify-content: center;
  padding: 24px 16px;
  min-height: calc(100vh - [header-height]);
}

.post-form-card {
  width: 60%;
  max-width: 900px;
  min-width: 480px;
}

@media (max-width: 768px) {
  .post-form-card {
    width: calc(100% - 32px);
    min-width: unset;
  }
}
```

### Enhanced PostForm Component

**Purpose**: Existing PostForm component with no interface changes, only styling enhancements.

**Props Interface** (unchanged):

```typescript
interface PostFormProps {
  initialValues?: PostFormData;
  onSubmit: (values: PostFormData) => void;
  isLoading?: boolean;
  submitText?: string;
}
```

**Styling Contract**:

- Form.Item labels: consistent typography, proper spacing
- Input components: enhanced border, focus states, hover effects
- Button: styled with clear hover/active/disabled states
- All interactive elements: transition timing <150ms

## Page Integration Contract

### CreatePage Component

**Required Changes**:

- Wrap PostForm with PostFormCard component
- Pass title prop: "Create New Post"
- Maintain existing form submission logic
- No changes to routing or data flow

### EditPage Component

**Required Changes**:

- Wrap PostForm with PostFormCard component
- Pass title prop: "Edit Post"
- Maintain existing form submission and data loading logic
- No changes to routing or data flow

## Accessibility Contract

**WCAG 2.1 AA Requirements**:

- Text contrast ratio: minimum 4.5:1 for normal text
- Interactive element contrast: minimum 3:1
- Focus indicators: visible and at least 2px outline
- Touch targets: minimum 44x44px on mobile
- Keyboard navigation: all interactive elements must be reachable

## Performance Contract

**Timing Requirements** (from Success Criteria):

- Card visibility: <1 second on page load (SC-001)
- Focus indication: <100ms (SC-003)
- Hover/active feedback: <50ms (SC-006)

**Bundle Impact**:

- No new dependencies allowed
- CSS changes only (no JS overhead)
- Leverage existing Ant Design components

## Theme Contract

**Light Theme**:

- Card background: #ffffff
- Input background: #ffffff
- Input border: #d9d9d9
- Input border (focus): #1890ff
- Button primary: #1890ff

**Dark Theme**:

- Card background: #141414
- Input background: #141414
- Input border: #434343
- Input border (focus): #177ddc
- Button primary: #177ddc

All colors must maintain WCAG AA contrast ratios with their backgrounds.
