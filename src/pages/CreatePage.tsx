import { App } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import PostForm from "../components/posts/PostForm";
import PostFormCard from "../components/posts/PostFormCard";
import { useCreatePost } from "../hooks/usePosts";
import type { PostFormData } from "../types/post";

const CreatePage = () => {
  const navigate = useNavigate();
  const createPostMutation = useCreatePost();
  const { message } = App.useApp();

  const handleSubmit = async (values: PostFormData) => {
    try {
      await createPostMutation.mutateAsync({
        userId: 1,
        title: values.title,
        body: values.body,
      });
      message.success("Post created successfully");
      navigate("/");
    } catch {
      message.error("Failed to create post");
    }
  };

  return (
    <div>
      <PageHeader title="Create" />
      <PostFormCard title="Create New Post">
        <PostForm
          onSubmit={handleSubmit}
          isLoading={createPostMutation.isPending}
          submitText="Create Post"
        />
      </PostFormCard>
    </div>
  );
};

export default CreatePage;
