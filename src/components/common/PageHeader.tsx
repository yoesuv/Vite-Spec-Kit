import { Button, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginBottom: 24,
      }}
    >
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={handleBack}
        size="large"
      />
      <Title level={2} style={{ margin: 0 }}>
        {title}
      </Title>
    </div>
  );
};

export default PageHeader;
