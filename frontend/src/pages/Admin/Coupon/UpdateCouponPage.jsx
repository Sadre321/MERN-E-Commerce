import { Button, Form, Input, InputNumber, message, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const UpdateCouponPage = () => {
  const apiUri = import.meta.env.VITE_API_BASE_URI;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const params = useParams();
  const couponId = params.id;
  const navigate = useNavigate();

  const onFinish = async(values) => {
    try {
        setLoading(true);
        const response = await fetch(`${apiUri}/api/coupon/${couponId}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify(values)
        });

        if (response.ok) {
         message.success("Kupon güncellendi");
         navigate("/admin/coupons");
         return ;
        }
        message.error("Kupon güncellenemedi");
      } catch (error) {
        console.log("Giriş hatası:", error);
        message.error("Bir hata oluştu, lütfen tekrar deneyin.");
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    const fetchcCupon = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUri}/api/coupon/${couponId}`);
        console.log(response);

        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }

        const data = await response.json();

        form.setFieldsValue({
            code:data.code,
            discountPercent:data.discountPercent
        })
      } catch (error) {
        console.log("Giriş hatası:", error);
        message.error("Bir hata oluştu, lütfen tekrar deneyin.");
      } finally {
        setLoading(false);
      }
    };

    fetchcCupon();
  }, [apiUri,couponId,form]);

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
        label="Kupon Indirim Orani"
        name="discountPercent" // Burada 'img' verisi alınır
        rules={[
          { required: true, message: "Lütfen kupon için indirim orani giriniz!" },
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

export default UpdateCouponPage;
