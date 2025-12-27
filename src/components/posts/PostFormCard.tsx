import { Card } from "antd";
import type { ReactNode } from "react";

interface PostFormCardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

const PostFormCard = ({ children, title, className }: PostFormCardProps) => {
  return (
    <div className="post-form-card-container">
      <Card title={title} className={`post-form-card ${className || ""}`}>
        {children}
      </Card>
    </div>
  );
};

export default PostFormCard;
