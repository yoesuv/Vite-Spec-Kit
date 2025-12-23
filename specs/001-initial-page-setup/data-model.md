# Data Model: Initial Page Setup

**Feature Branch**: `001-initial-page-setup`  
**Date**: December 23, 2025

## Entities

### Post

Represents a content item in the application.

| Field    | Type     | Constraints                       | Description                                 |
| -------- | -------- | --------------------------------- | ------------------------------------------- |
| `id`     | `number` | Required, unique, auto-generated  | Unique identifier from API                  |
| `userId` | `number` | Required                          | User ID (from JSONPlaceholder)              |
| `title`  | `string` | Required, 1-200 chars (trimmed)   | Post title                                  |
| `body`   | `string` | Required, 1-10000 chars (trimmed) | Post content (mapped from spec's "content") |

**Note**: JSONPlaceholder uses `body` instead of `content`. The application will map this internally.

#### TypeScript Interface

```typescript
interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface PostFormData {
  title: string;
  body: string;
}

interface PostCreateRequest {
  userId: number;
  title: string;
  body: string;
}

interface PostUpdateRequest {
  id: number;
  userId: number;
  title: string;
  body: string;
}
```

### Theme Preference

Represents user interface appearance setting.

| Field   | Type                | Constraints                | Description        |
| ------- | ------------------- | -------------------------- | ------------------ |
| `theme` | `'light' \| 'dark'` | Required, default: 'light' | Current theme mode |

#### TypeScript Interface

```typescript
type ThemeMode = "light" | "dark";

interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
}
```

#### Storage

- **Key**: `vite-speckit-theme`
- **Location**: localStorage
- **Default**: `'light'`

### Pagination State

Represents current pagination context for post list.

| Field      | Type     | Constraints         | Description           |
| ---------- | -------- | ------------------- | --------------------- |
| `current`  | `number` | Required, min: 1    | Current page number   |
| `pageSize` | `number` | Required, fixed: 20 | Items per page        |
| `total`    | `number` | Required, min: 0    | Total number of posts |

#### TypeScript Interface

```typescript
interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
}
```

## Validation Schemas

### Post Form Validation (Yup)

```typescript
import * as yup from "yup";

const postValidationSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Title is required")
    .min(1, "Title must be at least 1 character")
    .max(200, "Title must be at most 200 characters"),
  body: yup
    .string()
    .trim()
    .required("Content is required")
    .min(1, "Content must be at least 1 character")
    .max(10000, "Content must be at most 10000 characters"),
});

type PostFormValues = yup.InferType<typeof postValidationSchema>;
```

## State Transitions

### Post Lifecycle

```
[New] --create--> [Created] --edit--> [Updated]
                      |
                      +--delete--> [Deleted]
```

### Theme Toggle

```
[Light] <--toggle--> [Dark]
```

## Relationships

```
User (1) ----< Post (many)
     |
     +-- userId references external user
```

**Note**: User entity is not managed by this application. JSONPlaceholder provides userId=1 for all operations.

## API Response Mapping

| API Field | App Field | Notes                            |
| --------- | --------- | -------------------------------- |
| `id`      | `id`      | Direct mapping                   |
| `userId`  | `userId`  | Direct mapping                   |
| `title`   | `title`   | Direct mapping                   |
| `body`    | `body`    | Spec refers to this as "content" |
