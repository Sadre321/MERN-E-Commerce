import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Space,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router";

const UpdateProductPage = () => {
  const apiUri = import.meta.env.VITE_API_BASE_URI;
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [form] = Form.useForm();
  const [description, setDescription] = useState(""); // description için state oluşturuyoruz
  const params = useParams();
  const productId = params.productId;
  const navigate = useNavigate();

  // Kategorileri fetch etme
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          fetch(`${apiUri}/api/categories`),
          fetch(`${apiUri}/api/products/${productId}`),
        ]);
        if (!categoriesResponse.ok || !productsResponse.ok) {
          message.error("Veri getirme başarısız.");
        }
        const [categoriesData, productsData] = await Promise.all([
          categoriesResponse.json(),
          productsResponse.json(),
        ]);

        setCategoryData(categoriesData);

        if(productsData){
          form.setFieldsValue({
            name:productsData.name,
            current:productsData.price.current,
            discount:productsData.price.discount,
            description:productsData.description,
            img:productsData.img.join("\n"),
            colors:productsData.colors.join("\n"),
            sizes:productsData.sizes.join("\n"),
            category:productsData.category
          })
        }

      } catch (error) {
        console.log("Veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUri,productId,form]);

  // Form submit işlemi
  const onFinish = async (values) => {
    const imgLinks = values.img.split("\n").map((link) => link.trim());
    const colors = values.colors.split("\n").map((link) => link.trim());
    const sizes = values.sizes.split("\n").map((link) => link.trim());

    // Description'ı da kontrol edelim
    console.log("Description before sending:", description);

    try {
        setLoading(true);
        const response = await fetch(`${apiUri}/api/products/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...values,
                price: {
                    current: values.current, 
                    discount: values.discount,
                },
                description,  // Description'ı burada gönderiyoruz
                colors,
                sizes,
                img: imgLinks,
            }),
        });

        if (response.ok) {
            message.success("Ürün başarıyla güncellendi");
            navigate("/admin/products");
        } else {
            message.error("Ürün güncellenemedi");
        }
    } catch (error) {
        console.log("Hata:", error);
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
          label="Ürün İsmi"
          name="name"
          rules={[{ required: true, message: "Lütfen ürün ismi giriniz!" }]}
        >
          <Input />
        </Form.Item>

        <Space size={50}>
          <Form.Item
            label="Ürün Fiyatı"
            name="current"
            rules={[{ required: true, message: "Lütfen ürün fiyatı giriniz!" }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="İndirim Oranı"
            name="discount"
            rules={[
              { required: true, message: "Lütfen ürün indirimi giriniz!" },
            ]}
          >
            <InputNumber />
          </Form.Item>
        </Space>

        <Form.Item
          label="Ürün Açıklaması"
          name="description"
          rules={[
            {
              required: true,
              message: "Lütfen bir ürün açıklaması girin!",
            },
          ]}
        >
          <ReactQuill
            theme="snow"
            value={description} // value'yu ekliyoruz
            onChange={setDescription} // onChange ile description'ı güncelliyoruz
            style={{
              backgroundColor: "white",
            }}
          />
        </Form.Item>

        <Form.Item
          label="Ürün Görselleri (link)"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen ürün görseli için en az 4 link giriniz!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir görsel linkini yeni bir satıra yazın."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Ürün Renkleri (RGB)"
          name="colors"
          rules={[
            {
              required: true,
              message: "Lütfen ürün rengi için en az bir RGB değeri giriniz!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir ürün rengini yeni bir satıra yazın."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Ürün Boyutları"
          name="sizes"
          rules={[
            {
              required: true,
              message: "Lütfen ürün boyutu için en az bir ölçü giriniz!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir ürün boyutunu yeni bir satıra yazın."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Ürün Kategorisi"
          name="category"
          rules={[{ required: true, message: "Lütfen bir kategori seçin!" }]}
        >
          <Select>
            {categoryData.map((category) => (
              <Select.Option value={category._id} key={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Gönder
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default UpdateProductPage;
