import "./Product.css";
import ProductItem from "./ProductItem";
import Slider from "react-slick";
import ProductsData from "../../data.json";
import { useState } from "react";
import PropTypes from "prop-types";

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
  const [products] = useState(ProductsData);
  
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
            {products.map((product) => (
              <ProductItem key={product.id} product={product}/>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Products;
