import { Typography } from "antd";
import PostList from "../components/posts/PostList";

const { Title } = Typography;

const HomePage = () => {
  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        Posts
      </Title>
      <PostList />
    </div>
  );
};

export default HomePage;
