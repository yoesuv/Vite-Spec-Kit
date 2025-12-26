# Quickstart: Initial Page Setup

**Feature Branch**: `001-initial-page-setup`  
**Date**: December 23, 2025

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git

## Setup

### 1. Install Dependencies

```bash
npm install antd @ant-design/icons yup @tanstack/react-query axios react-router-dom
```

### 2. Project Structure

```
src/
├── api/
│   └── postsApi.ts          # Axios instance and API functions
├── components/
│   ├── layout/
│   │   └── AppLayout.tsx    # Main layout with navigation
│   ├── posts/
│   │   ├── PostCard.tsx     # Individual post card
│   │   ├── PostList.tsx     # Post list with pagination
│   │   ├── PostForm.tsx     # Create/Edit form component
│   │   └── EmptyState.tsx   # Empty state component
│   └── common/
│       └── PageHeader.tsx   # Back arrow + title component
├── contexts/
│   └── ThemeContext.tsx     # Theme provider and hook
├── hooks/
│   └── usePosts.ts          # TanStack Query hooks for posts
├── pages/
│   ├── HomePage.tsx         # Post list page
│   ├── CreatePage.tsx       # Create post page
│   ├── EditPage.tsx         # Edit post page
│   └── DetailPage.tsx       # Post detail page
├── schemas/
│   └── postSchema.ts        # Yup validation schema
├── types/
│   └── post.ts              # TypeScript interfaces
├── App.tsx                  # Router and providers setup
├── main.tsx                 # Entry point
└── index.css                # Global styles
```

### 3. Configuration Files

#### Axios Instance (`src/api/postsApi.ts`)

```typescript
import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
```

#### Query Client Setup (`src/App.tsx`)

```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});
```

#### Theme Context (`src/contexts/ThemeContext.tsx`)

```typescript
import { createContext, useContext, useState, useEffect } from "react";
import { ConfigProvider, theme } from "antd";

const THEME_KEY = "vite-speckit-theme";
type ThemeMode = "light" | "dark";

// Provider wraps app with Ant Design ConfigProvider
```

### 4. Key Implementation Patterns

#### TanStack Query Hooks

```typescript
// src/hooks/usePosts.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const usePosts = (page: number) => {
  return useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
```

#### Yup Validation with Ant Design Form

```typescript
// src/schemas/postSchema.ts
import * as yup from "yup";

export const postSchema = yup.object({
  title: yup.string().trim().required("Title is required").max(200),
  body: yup.string().trim().required("Content is required").max(10000),
});

// Custom validation in form
const validateField = async (field: string, value: string) => {
  try {
    await postSchema.validateAt(field, { [field]: value });
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err.message);
  }
};
```

### 5. Run Development Server

```bash
npm run dev
```

Application will be available at `http://localhost:5173`

## API Endpoints Used

| Method | Endpoint                                        | Description                |
| ------ | ----------------------------------------------- | -------------------------- |
| GET    | `/posts?_page=1&_limit=20&_sort=id&_order=desc` | List posts with pagination |
| GET    | `/posts/{id}`                                   | Get single post            |
| POST   | `/posts`                                        | Create new post            |
| PUT    | `/posts/{id}`                                   | Update existing post       |
| DELETE | `/posts/{id}`                                   | Delete post                |

## Important Notes

1. **JSONPlaceholder Limitations**: This is a mock API. Create/Update/Delete operations return success but don't persist data.

2. **No Testing**: Per constitution, no unit/integration/e2e tests are implemented.

3. **Theme Persistence**: Theme preference is stored in localStorage under key `vite-speckit-theme`.

4. **Pagination**: JSONPlaceholder returns total count in `x-total-count` header.

## Verification Checklist

- [ ] Navigation works between all pages
- [ ] Theme toggle switches between light/dark
- [ ] Post list displays with pagination
- [ ] Create form validates and submits
- [ ] Edit form loads existing data and updates
- [ ] Delete shows confirmation and removes from list
- [ ] Detail page shows full post content
- [ ] Back navigation works correctly
