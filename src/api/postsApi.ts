import axios from "axios";
import type { Post, PostCreateRequest, PostUpdateRequest } from "../types/post";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface PostsResponse {
  posts: Post[];
  total: number;
}

export const getPosts = async (
  page: number,
  limit: number = 20
): Promise<PostsResponse> => {
  const response = await api.get<Post[]>("/posts", {
    params: {
      _page: page,
      _limit: limit,
      _sort: "id",
      _order: "desc",
    },
  });
  const total = parseInt(response.headers["x-total-count"] || "0", 10);
  return { posts: response.data, total };
};

export const getPost = async (id: number): Promise<Post> => {
  const response = await api.get<Post>(`/posts/${id}`);
  return response.data;
};

export const createPost = async (data: PostCreateRequest): Promise<Post> => {
  const response = await api.post<Post>("/posts", data);
  return response.data;
};

export const updatePost = async (data: PostUpdateRequest): Promise<Post> => {
  const response = await api.put<Post>(`/posts/${data.id}`, data);
  return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await api.delete(`/posts/${id}`);
};

export default api;
