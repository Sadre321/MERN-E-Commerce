import Breadcrumb from "./Breadcrumb/Breadcrumb"
import Gallery from "./Gallery/Gallery";
import Info from "./Info/Info";
import PropTypes from "prop-types";
import "./ProductDetails.css";
import Tabs from "./Tabs/Tabs";

const ProductDetails = ({product}) => {


  return (
    <section className="single-product">
      <div className="container">
        <div className="single-product-wrapper">
          <Breadcrumb />
          <div className="single-content">
            <main className="site-main">
              <Gallery product={product}/>
              <Info product={product}/>
            </main>
          </div>
          <Tabs product={product}/>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails;

ProductDetails.propTypes ={
  product:PropTypes.object
}