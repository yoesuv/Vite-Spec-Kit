# Data Model: Post UI Improvements

## Overview

This feature is UI-only and does not introduce new data entities. It enhances the presentation layer for existing Post entities.

## Entities

### PostFormLayout (UI Component State)

**Description**: Represents the layout configuration and styling state for the post form card container.

**Fields**:

- `containerWidth`: string - CSS width value ("60%" on desktop, "calc(100% - 32px)" on mobile)
- `maxWidth`: string - CSS max-width constraint ("900px")
- `minWidth`: string - CSS min-width constraint ("480px")
- `centered`: boolean - Whether container is horizontally centered (always true)

**Validation Rules**:

- Desktop (>1024px): width must be 60% with max 900px, min 480px
- Tablet (768px-1024px): width must be 60% with max 900px, min 480px
- Mobile (<768px): width must be 100% minus 16px padding each side

**State Transitions**:

- Initial → Desktop Layout (viewport > 1024px)
- Initial → Mobile Layout (viewport < 768px)
- Desktop Layout ↔ Mobile Layout (on viewport resize)

### PostFormCard (UI Component)

**Description**: Visual container wrapping the PostForm component with card styling.

**Properties**:

- `elevation`: number - Card shadow depth (Ant Design default)
- `padding`: string - Internal spacing ("24px" on desktop, "16px" on mobile)
- `borderRadius`: string - Corner rounding (Ant Design default)
- `backgroundColor`: string - Card background (theme-aware: light/dark)

**Relationships**:

- Contains: PostForm component (existing)
- Styled by: PostFormLayout configuration
- Themed by: ThemeContext (existing)

### FormControl (UI Component State)

**Description**: Enhanced styling state for individual form inputs and buttons.

**Fields**:

- `focusState`: boolean - Whether input has focus
- `hoverState`: boolean - Whether input is being hovered
- `errorState`: boolean - Whether input has validation error
- `disabledState`: boolean - Whether control is disabled

**Styling Properties**:

- `borderColor`: string - Border color based on state (focus/error/default)
- `borderWidth`: string - Border thickness ("1px" default, "2px" on focus)
- `boxShadow`: string - Focus ring appearance
- `backgroundColor`: string - Background based on theme and state
- `transitionDuration`: string - Animation timing ("150ms" for hover, "100ms" for focus)

**Validation Rules**:

- Focus indication must be visible within 100ms (SC-003)
- Hover feedback must appear within 50ms (SC-006)
- Contrast ratios must meet WCAG 2.1 AA standards (SC-005)

## Relationships

```
ThemeContext (existing)
    ↓ provides theme
PostFormCard
    ↓ contains
PostForm (existing)
    ↓ renders
FormControl[] (inputs, textarea, button)
```

## Notes

- No database schema changes required
- No API data model changes required
- All entities are UI/presentation layer only
- Existing Post entity and validation schemas unchanged
