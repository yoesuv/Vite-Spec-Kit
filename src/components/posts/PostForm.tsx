import { Form, Input, Button } from "antd";
import { postSchema } from "../../schemas/postSchema";
import type { PostFormData } from "../../types/post";

const { TextArea } = Input;

interface PostFormProps {
  initialValues?: PostFormData;
  onSubmit: (values: PostFormData) => void;
  isLoading?: boolean;
  submitText?: string;
}

const PostForm = ({
  initialValues,
  onSubmit,
  isLoading = false,
  submitText = "Submit",
}: PostFormProps) => {
  const [form] = Form.useForm<PostFormData>();

  const validateField = async (field: string, value: string) => {
    try {
      await postSchema.validateAt(field, { [field]: value });
      return Promise.resolve();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
      return Promise.reject("Validation error");
    }
  };

  const handleFinish = (values: PostFormData) => {
    onSubmit({
      title: values.title.trim(),
      body: values.body.trim(),
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleFinish}
      autoComplete="off"
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[
          {
            validator: (_, value) => validateField("title", value || ""),
          },
        ]}
      >
        <Input placeholder="Enter post title" maxLength={200} showCount />
      </Form.Item>

      <Form.Item
        name="body"
        label="Content"
        rules={[
          {
            validator: (_, value) => validateField("body", value || ""),
          },
        ]}
      >
        <TextArea
          placeholder="Enter post content"
          rows={6}
          maxLength={10000}
          showCount
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
