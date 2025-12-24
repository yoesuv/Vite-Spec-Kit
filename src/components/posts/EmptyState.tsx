import { Empty, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const EmptyState = () => {
  const navigate = useNavigate();

  return (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No posts yet">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => navigate("/create")}
      >
        Create Post
      </Button>
    </Empty>
  );
};

export default EmptyState;
