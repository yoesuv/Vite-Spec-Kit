import { useState } from "react";
import { App, Pagination, message, Spin, Alert } from "antd";
import PostCard from "./PostCard";
import EmptyState from "./EmptyState";
import { usePosts, useDeletePost } from "../../hooks/usePosts";

const PostList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const { modal } = App.useApp();

  const { data, isLoading, isError, error } = usePosts(currentPage);
  const deletePostMutation = useDeletePost();

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert
        message="Error"
        description={error?.message || "Failed to load posts"}
        type="error"
        showIcon
      />
    );
  }

  if (!data?.posts || data.posts.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      {data.posts.map((post) => (
        <PostCard key={post.id} post={post} onDelete={handleDelete} />
      ))}
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={data.total}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default PostList;
