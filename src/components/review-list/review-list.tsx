import ReviewItem from '../review-item/review-item';
import {REVIEWS} from '../../mocks/reviews';

function ReviewList() {
  const sortedReviews = REVIEWS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const limitedReviews = sortedReviews.slice(0, 10);

  return (
    <>
      <h2 className="reviews__title">Reviews &middot;
        <span className="reviews__amount">{limitedReviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {limitedReviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}

export default ReviewList;
