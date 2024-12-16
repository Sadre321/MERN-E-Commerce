import "./Product.css";
import ProductItem from "./ProductItem";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { message } from "antd";

function Next({ onClick }) {
  return (
    <button className="glide__arrow glide__arrow--right" onClick={onClick}>
      <i className="bi bi-chevron-right"></i>
    </button>
  );
}

Next.propTypes = {
  onClick: PropTypes.func, // onClick prop'unun bir fonksiyon olması zorunlu
};

function Prev({ onClick }) {
  return (
    <button className="glide__arrow glide__arrow--left" onClick={onClick}>
      <i className="bi bi-chevron-left"></i>
    </button>
  );
} 

Prev.propTypes = {
  onClick: PropTypes.func, // onClick prop'unun bir fonksiyon olması zorunlu
};

const Products = () => {
  const apiUri = import.meta.env.VITE_API_BASE_URI;
  const [productsData,setProductsData] = useState([]);

  useEffect(()=>{
    const fetchCategories = async() => {
      try {
        const response = await fetch(`${apiUri}/api/products`);
  
        if (response.ok) {
          const data = await response.json();
          setProductsData(data);
        } else {
          message.error("Giriş yaparken bir hata oluştu");
        }
      } catch (error) {
        console.log("Giriş hatası:", error);
        message.error("Bir hata oluştu, lütfen tekrar deneyin.");
      }
    };

    fetchCategories();
  },[apiUri])
  
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <Next />,
    prevArrow: <Prev />,
    responsive:[
      {
        breakpoint:992,
        settings:{
          slidesToShow:2
        }
      },
      {
        breakpoint:520,
        settings:{
          slidesToShow:1
        }
      }
    ]
  };

  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>Featured Products</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <div className="product-wrapper product-carousel">
          <Slider {...settings}>
            {productsData.map((product) => (
              <ProductItem key={product._id} product={product}/>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Products;
