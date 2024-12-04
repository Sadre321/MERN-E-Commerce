import "./Gallery.css";
import productsData from "../../../data.json";
import { useState } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";

function Next({ onClick }) {
  return (
    <button
      className="glide__arrow glide__arrow--right"
      data-glide-dir=">"
      style={{zIndex:"2"}}
      onClick={onClick}
    >
      <i className="bi bi-chevron-right"></i>
    </button>
  );
}

Next.propTypes = {
  onClick: PropTypes.func, // onClick prop'unun bir fonksiyon olması zorunlu
};

function Prev({ onClick }) {
  return (
    <button
      className="glide__arrow glide__arrow--left"
      data-glide-dir="<"
      style={{zIndex:"2"}}
      onClick={onClick}
    >
      <i className="bi bi-chevron-left"></i>
    </button>
  );
}

Prev.propTypes = {
  onClick: PropTypes.func, // onClick prop'unun bir fonksiyon olması zorunlu
};

const Gallery = () => {
  const [activeImg, setActiveImg] = useState(productsData[0].img.singleImage);
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <Next />,
    prevArrow: <Prev />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="product-gallery">
      <div className="single-image-wrapper">
        <img src={`/${activeImg}`} id="single-image" alt="" />
      </div>
      <div className="product-thumb">
        <div className="glide__track" data-glide-el="track">
          <ol className="gallery-thumbs glide__slides">
            <Slider {...settings}>
              {productsData[0].img.thumbs.map((itemImg, index) => (
                <li
                  className="glide__slide glide__slide--active"
                  key={index}
                  onClick={() => setActiveImg(itemImg)}
                >
                  <img
                    src={`/${itemImg}`}
                    alt=""
                    className={`img-fluid ${
                      itemImg === activeImg ? "active" : ""
                    } `}
                  />
                </li>
              ))}
            </Slider>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
