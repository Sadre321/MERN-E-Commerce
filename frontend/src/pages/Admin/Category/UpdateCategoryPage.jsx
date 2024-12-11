import { Button, Form, Input, message, Spin } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const UpdateCategoryPage = () => {
  const apiUri = import.meta.env.VITE_API_BASE_URI;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const params = useParams();
  const categoryId = params.id;

  const onFinish = async(values) => {
    try {
        setLoading(true);
        const response = await fetch(`${apiUri}/api/categories/${categoryId}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify(values)
        });

        if (response.ok) {
         return message.success("Kategori güncellendi");
        }
        message.error("Kategori güncellenemedi");
      } catch (error) {
        console.log("Giriş hatası:", error);
        message.error("Bir hata oluştu, lütfen tekrar deneyin.");
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUri}/api/categories/${categoryId}`);
        console.log(response);

        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }

        const data = await response.json();

        form.setFieldsValue({
            name:data.name,
            img:data.img
        })
      } catch (error) {
        console.log("Giriş hatası:", error);
        message.error("Bir hata oluştu, lütfen tekrar deneyin.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [apiUri,categoryId,form]);

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

export default UpdateCategoryPage;
