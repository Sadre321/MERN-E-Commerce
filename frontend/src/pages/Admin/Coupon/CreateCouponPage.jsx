import { Button, Form, Input, InputNumber, message, Spin } from "antd";
import { useState } from "react";

const CreateCouponPage = () => {
  const apiUri = import.meta.env.VITE_API_BASE_URI;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUri}/api/coupon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Kupon eklendi");
        form.resetFields();
      } else {
        message.error("Kupon eklenemedi");
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
          label="Kupon Kodu"
          name="code" // Burada 'name' verisi alınır
          rules={[{ required: true, message: "Lütfen kupon kodu giriniz!" }]} // Validasyon kuralı
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Kupon Indirimi"
          name="discountPercent" // Burada 'img' verisi alınır
          rules={[
            { required: true, message: "Lütfen kupon icin indirim orani giriniz!" },
          ]} // Validasyon kuralı
        >
          <InputNumber />
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

export default CreateCouponPage;
