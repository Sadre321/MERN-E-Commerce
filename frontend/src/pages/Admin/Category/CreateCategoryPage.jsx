import { Button, Form, Input, message, Spin } from "antd";
import { useState } from "react";

const CreateCategoryPage = () => {
  const apiUri = import.meta.env.VITE_API_BASE_URI;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUri}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Kategori eklendi");
        form.resetFields();
      } else {
        message.error("Kategori eklenemedi");
      }
    } catch (error) {
      console.log("Giriş hatası:", error);
      message.error("Bir hata oluştu, lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        onFinish={onFinish} // Form submit işlemi
      >
        <Form.Item
          label="Kategori Ismi"
          name="name" // Burada 'name' verisi alınır
          rules={[{ required: true, message: "Lütfen kategori ismi giriniz!" }]} // Validasyon kuralı
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Kategori Görseli (link)"
          name="img" // Burada 'img' verisi alınır
          rules={[
            { required: true, message: "Lütfen kategori için link giriniz!" },
          ]} // Validasyon kuralı
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default CreateCategoryPage;
