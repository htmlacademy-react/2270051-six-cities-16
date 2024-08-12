import ReviewItem from '../review-item/review-item';
import {Review} from '../../lib/types/review';
import {sortReviews} from './utils';
import {REVIEWS_COUNT} from '../../const';

type ReviewListProps = {
  reviews: Review[];
};

function ReviewList({ reviews }: ReviewListProps) {
  const sortedReviews = sortReviews(reviews);
  const limitedReviews = sortedReviews.slice(0, REVIEWS_COUNT);

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
