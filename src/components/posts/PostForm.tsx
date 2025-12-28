import { useState, useEffect } from "react";
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
  const [hasErrors, setHasErrors] = useState(true);
  const [allTouched, setAllTouched] = useState(false);

  const isEditMode = Boolean(initialValues);

  useEffect(() => {
    if (isEditMode && initialValues) {
      form
        .validateFields()
        .then(() => {
          setHasErrors(false);
          setAllTouched(true);
        })
        .catch(() => {
          setHasErrors(true);
          setAllTouched(false);
        });
    }
  }, [initialValues, form, isEditMode]);

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

  const handleFormChange = () => {
    const errors = form
      .getFieldsError()
      .some(({ errors }) => errors.length > 0);
    const touched = isEditMode
      ? form.isFieldsTouched(false)
      : form.isFieldsTouched(true);
    setHasErrors(errors);
    setAllTouched(touched);
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
      onFieldsChange={handleFormChange}
      autoComplete="off"
    >
      <Form.Item
        name="title"
        label="Title"
        validateTrigger="onChange"
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
        validateTrigger="onChange"
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
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          disabled={hasErrors || !allTouched}
          block
        >
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
