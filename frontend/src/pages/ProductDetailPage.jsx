import { useParams } from "react-router";
import ProductDetails from "../Components/ProductDetails/ProductDetails";
import { useEffect, useState } from "react";
import { message, Spin } from "antd"; // Antd'nin Spin bileşeni yükleme animasyonu için kullanılabilir

const ProductDetailPage = () => {
  const apiUri = import.meta.env.VITE_API_BASE_URI;
  const params = useParams();
  const productId = params.productId;
  const [product, setProduct] = useState(null); // Başlangıçta null olabilir
  const [loading, setLoading] = useState(true); // Yükleme durumu ekleyelim

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUri}/api/products/${productId}`);
        if (!response.ok) {
          message.error("Veri getirme başarısız.");
          return;
        }
        const data = await response.json(); // response.json() await edilmelidir
        setProduct(data);
      } catch (error) {
        console.log("Veri hatası:", error);
        message.error("Bir hata oluştu.");
      } finally {
        setLoading(false); // Yükleme tamamlandı
      }
    };
    fetchData();
  }, [apiUri, productId]);

  if (loading) {
    return <Spin size="large" />; // Yükleme animasyonu göster
  }

  if (!product) {
    return <p>Ürün bulunamadı.</p>; // Eğer ürün verisi gelmediyse bir mesaj göster
  }

  return (
    <>
      <ProductDetails product={product} />
    </>
  );
};

export default ProductDetailPage;
