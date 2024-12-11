import { Button, message, Popconfirm, Space, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const CategoryPage = () => {
  const apiUri = import.meta.env.VITE_API_BASE_URI;
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUri}/api/categories`);

      if (response.ok) {
        const data = await response.json();
        setCategoryData(data);
      } else {
        message.error("Giriş yaparken bir hata oluştu");
      }
    } catch (error) {
      console.log("Giriş hatası:", error);
      message.error("Bir hata oluştu, lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }, [apiUri]);

  // Kategoriyi silme fonksiyonu
  const deleteCategory = async (categoryId) => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUri}/api/categories/${categoryId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Kategori başarıyla silindi");
        fetchCategories();
      } else {
        message.error("Silme işlemi sırasında bir hata oluştu");
      }
    } catch (error) {
      console.log("Silme hatası:", error);
      message.error("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const columns = [
    {
      title: "Img",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => <img src={imgSrc} alt="img" width={100} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => {
            navigate(`/admin/categories/update/${record._id}`);
          }}>
            Düzenle
          </Button>
          <Popconfirm
            title="Kategori silme"
            description="Kategorinin silinmesini istiyor musunuz?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => {
              deleteCategory(record._id); // `record._id` ile silme işlemi
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
      dataSource={categoryData}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};

export default CategoryPage;
