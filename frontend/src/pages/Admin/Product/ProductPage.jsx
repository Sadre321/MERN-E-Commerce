import { Button, message, Popconfirm, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const ProductPage = () => {
  const apiUri = import.meta.env.VITE_API_BASE_URI;
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Kategoriyi silme fonksiyonu
  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${apiUri}/api/products/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Ürün başarıyla silindi");
        // fetchProducts();
        setProductData((prevProducts) => {
          return prevProducts.filter((product) => product._id !== productId);
        });
      } else {
        message.error("Silme işlemi sırasında bir hata oluştu");
      }
    } catch (error) {
      console.log("Silme hatası:", error);
      message.error("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          fetch(`${apiUri}/api/categories`),
          fetch(`${apiUri}/api/products`),
        ]);
        if (!categoriesResponse.ok || !productsResponse.ok) {
          message.error("Veri getirme başarısız.");
        }
        const [categoriesData, productsData] = await Promise.all([
          categoriesResponse.json(),
          productsResponse.json(),
        ]);
        const productsWithCategories = productsData.map((product) => {
          const categoryId = product.category;
          const category = categoriesData.find(
            (item) => item._id === categoryId
          );
          return {
            ...product,
            category: category ? category.name : "",
          };
        });
        setProductData(productsWithCategories);
      } catch (error) {
        console.log("Veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUri]);

  const columns = [
    {
      title: "Img",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => <img src={imgSrc[0]} alt="img" width={100} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              navigate(`/admin/categories/update/${record._id}`);
            }}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Ürün silme"
            description="Ürünün silinmesini istiyor musunuz?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => {
              deleteProduct(record._id); // `record._id` ile silme işlemi
            }}
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={productData}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};

export default ProductPage;
