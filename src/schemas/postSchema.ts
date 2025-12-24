import * as yup from "yup";

export const postSchema = yup.object({
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

export type PostFormValues = yup.InferType<typeof postSchema>;
