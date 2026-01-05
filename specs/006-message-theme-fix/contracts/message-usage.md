# Component Contract: Theme-Aware Notification Messages

**Feature Branch**: `006-message-theme-fix` | **Date**: 2026-01-05

## Overview

This contract defines the standard pattern for using Ant Design's message component to ensure theme-aware notifications throughout the application.

## Component Pattern

### Standard Usage

All components that display notification messages MUST use the following pattern:

```typescript
import { App } from "antd";

const Component = () => {
  const { message } = App.useApp();

  const handleAction = async () => {
    try {
      await someOperation();
      message.success("Operation successful");
    } catch (error) {
      message.error("Operation failed");
    }
  };

  return <div>...</div>;
};
```

### Prohibited Pattern

Direct imports of `message` from antd are PROHIBITED:

```typescript
// ❌ DO NOT USE
import { message } from "antd";
message.success("Operation successful");
```

## Message Types

The application supports the following message types:

### Success

```typescript
message.success("Post created successfully");
message.success("Post updated successfully");
message.success("Post deleted successfully");
```

### Error

```typescript
message.error("Failed to create post");
message.error("Failed to update post");
message.error("Failed to delete post");
```

### Warning

```typescript
message.warning("Warning message");
```

### Info

```typescript
message.info("Information message");
```

## Configuration

### Default Settings

Messages use the following default configuration (inherited from Ant Design):

- **Duration**: 3 seconds (auto-dismiss)
- **Position**: Top center of screen
- **Closable**: Yes (manual close option available)
- **Stacking**: Vertical with newest on top

### Custom Duration (if needed)

```typescript
message.success("Message", 5); // 5 seconds
```

### No Auto-Dismiss (if needed)

```typescript
message.success("Message", 0); // Never auto-dismiss
```

## Theme Integration

Messages automatically inherit theme from the ConfigProvider:

- **Light Theme**: Light background, dark text
- **Dark Theme**: Dark background, light text
- **Theme Switching**: Messages update in real-time when theme changes

### Fallback Behavior

If theme context is unavailable, messages default to light theme styling.

## Accessibility

Messages meet WCAG AA standards:

- Minimum 4.5:1 contrast ratio for normal text
- Keyboard accessible
- Screen reader friendly

## Component Requirements

### Prerequisites

Any component using `App.useApp()` must be rendered within the `App` component hierarchy:

```typescript
// In ThemeContext.tsx
<ConfigProvider theme={...}>
  <App>{children}</App>
</ConfigProvider>
```

### Error Handling

Always wrap message calls in try-catch blocks for async operations:

```typescript
try {
  await operation();
  message.success("Success");
} catch (error) {
  message.error("Error");
}
```

## Implementation Checklist

For each component that displays messages:

- [ ] Import `App` from antd (not `message`)
- [ ] Call `App.useApp()` hook
- [ ] Destructure `message` from the hook result
- [ ] Use `message.success()`, `message.error()`, etc.
- [ ] Handle errors appropriately
- [ ] Test in both light and dark themes
- [ ] Verify theme switching updates messages in real-time

## Affected Components

The following components MUST be updated to follow this pattern:

1. `src/pages/CreatePage.tsx`
2. `src/pages/EditPage.tsx`
3. `src/components/posts/PostList.tsx`

## Future Components

All new components that display notification messages MUST follow this pattern to ensure consistent theme support.

## Version History

- **v1.0** (2026-01-05): Initial contract for theme-aware message support
