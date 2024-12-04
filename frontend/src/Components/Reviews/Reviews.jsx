import ReviewForm from "./ReviewForm"
import ReviewItems from "./ReviewItems"
import './Reviews.css'
import PropTypes from "prop-types";

const Reviews = ({activeTabs}) => {
  return (
    <div className={`tab-panel-reviews content ${activeTabs}`}>
      <h3>2 reviews for Basic Colored Sweatpants With Elastic Hems</h3>
      <div className="comments">
        <ol className="comment-list">
          <ReviewItems />
          <ReviewItems />
          <ReviewItems />
        </ol>
      </div>
      <div className="review-form-wrapper">
        <h2>Add a review</h2>
        <ReviewForm />
      </div>
    </div>
  )
}

export default Reviews;

Reviews.propTypes={
  activeTabs:PropTypes.bool
}