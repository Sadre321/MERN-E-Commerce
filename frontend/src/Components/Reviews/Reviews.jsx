import ReviewForm from "./ReviewForm"
import ReviewItems from "./ReviewItems"
import './Reviews.css'
import PropTypes from "prop-types";

const Reviews = ({activeTabs,product}) => {
  return (
    <div className={`tab-panel-reviews content ${activeTabs}`}>
         {product.reviews.length > 0 ? (
        <>
          <h3>2 reviews for Basic Colored Sweatpants With Elastic Hems</h3>
          <div className="comments">
            <ol className="comment-list">
              {product.reviews.map((item, index) => (
                <ReviewItems key={index} item={item} />
              ))}
            </ol>
          </div>
        </>
      ) : (
        <h3>Hiç yorum yok...</h3>
      )}
      <div className="review-form-wrapper">
        <h2>Add a review</h2>
        <ReviewForm />
      </div>
    </div>
  )
}

export default Reviews;

Reviews.propTypes={
  activeTabs:PropTypes.bool,
  product:PropTypes.object
}