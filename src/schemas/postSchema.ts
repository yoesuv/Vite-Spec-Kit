import * as yup from "yup";

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

export type PostFormValues = yup.InferType<typeof postSchema>;
