import { App, Spin, Alert } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import PostForm from "../components/posts/PostForm";
import PostFormCard from "../components/posts/PostFormCard";
import { usePost, useUpdatePost } from "../hooks/usePosts";
import type { PostFormData } from "../types/post";

const EditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const postId = Number(id);
  const { message } = App.useApp();

  const { data: post, isLoading, isError, error } = usePost(postId);
  const updatePostMutation = useUpdatePost();

  const handleSubmit = async (values: PostFormData) => {
    if (!post) return;

    try {
      await updatePostMutation.mutateAsync({
        id: post.id,
        userId: post.userId,
        title: values.title,
        body: values.body,
      });
      message.success("Post updated successfully");
      navigate("/");
    } catch {
      message.error("Failed to update post");
    }
  };

  if (isLoading) {
    return (
      <div>
        <PageHeader title="Edit" />
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Spin size="large" />
        </div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div>
        <PageHeader title="Edit" />
        <Alert
          message="Error"
          description={error?.message || "Failed to load post"}
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Edit" />
      <PostFormCard title="Edit Post">
        <PostForm
          initialValues={{ title: post.title, body: post.body }}
          onSubmit={handleSubmit}
          isLoading={updatePostMutation.isPending}
          submitText="Update Post"
        />
      </PostFormCard>
    </div>
  );
};

export default EditPage;
