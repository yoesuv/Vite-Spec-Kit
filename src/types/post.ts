export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface PostFormData {
  title: string;
  body: string;
}

export interface PostCreateRequest {
  userId: number;
  title: string;
  body: string;
}

export interface PostUpdateRequest {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export type ThemeMode = "light" | "dark";

export interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
}

export interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
}
