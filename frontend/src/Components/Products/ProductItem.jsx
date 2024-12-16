import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import { Link } from "react-router";

const ProductItem = ({product}) => {

  const {cartItems,addToCard} = useContext(CartContext);

  const filteredCart = cartItems.find((cartItem)=>cartItem._id === product._id);

  const originalPrice = product.price.current;
  const discountPercent = product.price.discount;

  const discountedPrice = originalPrice - ((originalPrice*discountPercent)/100);

  return (
    <div className="product-item glide__slide glide__slide--active">
      <div className="product-image">
        <a href="#">
          <img src={product.img[0]} alt="" className="img1" />
          <img src={product.img[1]} alt="" className="img2" />
        </a>
      </div>
      <div className="product-info">
        <a href="$" className="product-title">
          {product.name}
        </a>
        <ul className="product-star">
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-half"></i>
          </li>
        </ul>
        <div className="product-prices">
          <strong className="new-price">${discountedPrice.toFixed(2)}</strong>
          <span className="old-price">${product.price.current.toFixed(2)}</span>
        </div>
        <span className="product-discount">-{product.price.discount}%</span>
        <div className="product-links">
          <button className="add-to-cart" onClick={()=>{
              addToCard({...product,price:discountedPrice})
            }}
            disabled={filteredCart}
            >
            <i className="bi bi-basket-fill" ></i>
          </button>
          <button>
            <i className="bi bi-heart-fill"></i>
          </button>
          <Link to={`/products/${product._id}`} className="product-link">
            <i className="bi bi-eye-fill"></i>
          </Link>
          <a href="#">
            <i className="bi bi-share-fill"></i>
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProductItem;

ProductItem.propTypes = {
  product:PropTypes.object,
  setCartItems:PropTypes.func
}