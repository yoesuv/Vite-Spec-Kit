# Quickstart: Delete Confirmation Modal Theme Support

**Feature**: 005-modal-theme-fix  
**Branch**: `005-modal-theme-fix`  
**Date**: December 28, 2024

## Overview

Fix the delete confirmation modal to automatically adapt to the application's light/dark theme. Currently, the modal only displays in light theme regardless of the active theme setting.

## Prerequisites

- Node.js and npm installed
- Repository cloned and on branch `005-modal-theme-fix`
- Dependencies installed (`npm install`)

## Implementation Steps

### Step 1: Wrap Application with Ant Design App Component

**File**: `src/contexts/ThemeContext.tsx`

Add the `App` component from Ant Design inside the `ConfigProvider`:

```typescript
import { App } from "antd";

// Inside ThemeProvider component's return statement:
<ThemeContext.Provider value={value}>
  <ConfigProvider
    theme={{
      algorithm:
        themeMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }}
  >
    <App>{children}</App>
  </ConfigProvider>
</ThemeContext.Provider>;
```

**Why**: The `App` component provides context for static methods like modals to inherit theme configuration.

### Step 2: Update PostList to Use useApp Hook

**File**: `src/components/posts/PostList.tsx`

Replace the static `Modal.confirm()` call with the context-aware `modal` instance:

```typescript
// Add import
import { App } from "antd";

// Inside PostList component, before handleDelete:
const { modal } = App.useApp();

// Update handleDelete function:
const handleDelete = (id: number) => {
  modal.confirm({
    title: "Delete Post",
    content: "Are you sure you want to delete this post?",
    okText: "Delete",
    okType: "danger",
    cancelText: "Cancel",
    onOk: async () => {
      try {
        await deletePostMutation.mutateAsync(id);
        message.success("Post deleted successfully");
      } catch {
        message.error("Failed to delete post");
      }
    },
  });
};
```

**Changes**:

- Import `App` from 'antd'
- Use `App.useApp()` hook to get `modal` instance
- Replace `Modal.confirm()` with `modal.confirm()`
- Keep all other logic identical

## Verification

### Manual Testing Checklist

1. **Light Theme Test**:

   - Set application to light theme
   - Navigate to posts list
   - Click delete on any post
   - ✓ Modal should have light background and dark text

2. **Dark Theme Test**:

   - Set application to dark theme
   - Navigate to posts list
   - Click delete on any post
   - ✓ Modal should have dark background and light text

3. **Theme Switch Test**:

   - Open delete confirmation modal
   - Switch theme using theme toggle
   - ✓ Modal should update immediately to match new theme

4. **Functionality Test**:
   - Confirm deletion works correctly in both themes
   - Cancel button works correctly in both themes
   - Error handling displays correctly in both themes

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

## Files Modified

- `src/contexts/ThemeContext.tsx` - Added App component wrapper
- `src/components/posts/PostList.tsx` - Updated to use useApp hook

## Rollback

If issues occur, revert both files to their previous state:

```bash
git checkout HEAD~1 -- src/contexts/ThemeContext.tsx
git checkout HEAD~1 -- src/components/posts/PostList.tsx
```

## Performance Notes

- No bundle size increase (App component already in Ant Design)
- Theme updates propagate in <16ms (single render cycle)
- No additional network requests
- No state management overhead

## Troubleshooting

### Modal still shows light theme in dark mode

**Cause**: App component not properly wrapping the application  
**Solution**: Verify App component is inside ConfigProvider in ThemeContext.tsx

### "Cannot read property 'modal' of undefined" error

**Cause**: useApp hook called outside App component context  
**Solution**: Ensure ThemeProvider includes App component wrapper

### Modal doesn't update when theme switches

**Cause**: Modal created before App component was added  
**Solution**: Close and reopen the modal, or refresh the page

## Next Steps

After implementation and verification:

1. Test on different browsers (Chrome, Firefox, Safari)
2. Test on different devices (desktop, tablet, mobile)
3. Verify WCAG AA contrast standards are met
4. Commit changes with descriptive message
5. Create pull request for review

## Support

For questions or issues, refer to:

- [Ant Design App Component Docs](https://ant.design/components/app)
- [Feature Specification](./spec.md)
- [Research Document](./research.md)
