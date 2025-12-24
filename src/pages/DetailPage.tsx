import { Card, Typography, Spin, Alert } from "antd";
import { useParams } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import { usePost } from "../hooks/usePosts";

const { Title, Paragraph } = Typography;

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);

  const { data: post, isLoading, isError, error } = usePost(postId);

  if (isLoading) {
    return (
      <div>
        <PageHeader title="Detail" />
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Spin size="large" />
        </div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div>
        <PageHeader title="Detail" />
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
      <PageHeader title="Detail" />
      <Card>
        <Title level={3}>{post.title}</Title>
        <Paragraph style={{ whiteSpace: "pre-wrap", marginTop: 16 }}>
          {post.body}
        </Paragraph>
      </Card>
    </div>
  );
};

export default DetailPage;
