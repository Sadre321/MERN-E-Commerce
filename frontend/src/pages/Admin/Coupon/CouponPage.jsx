import { Button, message, Popconfirm, Space, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const CouponPage = () => {
  const apiUri = import.meta.env.VITE_API_BASE_URI;
  const [couponData, setCouponData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCoupon = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUri}/api/coupon`);

      if (response.ok) {
        const data = await response.json();
        setCouponData(data);
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

  // Kuponyi silme fonksiyonu
  const deleteCoupon = async (couponId) => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUri}/api/coupon/${couponId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Kupon başarıyla silindi");
        fetchCoupon();
      } else {
        message.error("Silme işlemi sırasında bir hata oluştu");
      }
    } catch (error) {
      console.log("Silme hatası:", error);
      message.error("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  };

  useEffect(() => {
    fetchCoupon();
  }, [fetchCoupon]);

  const columns = [
    {
        title: "Kupon Kodu",
        dataIndex: "code",
        key: "code",
        render: (code) => <b>{code}</b>,
    },
    {
        title: "Indirim Orani",
        dataIndex: "discountPercent",
        key: "discountPercent",
        render:(text)=> <span>%{text}</span>
    },
    {
        title: "Actions",
        dataIndex: "actions",
        key: "actions",
        render: (_, record) => (
            <Space>
                <Button type="primary" onClick={() => {
                    navigate(`/admin/coupons/update/${record._id}`);
                }}>
                    Düzenle
                </Button>
                <Popconfirm
                    title="Kupon silme"
                    description="Kuponun silinmesini istiyor musunuz?"
                    okText="Evet"
                    cancelText="Hayır"
                    onConfirm={() => deleteCoupon(record._id)} 
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
      dataSource={couponData}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};

export default CouponPage;
