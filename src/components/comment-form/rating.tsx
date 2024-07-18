import React from 'react';

type RatingProps = {
  rating: string;
  handleRatingChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Rating({rating, handleRatingChange}: RatingProps) {
  return (
    <div className="reviews__rating-form form__rating">
      {[5, 4, 3, 2, 1].map((value) => (
        <React.Fragment key={value}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value={value}
            id={`${value}-stars`}
            type="radio"
            onChange={handleRatingChange}
            checked={rating === value.toString()}
            key={`input-${value}`}
          />
          <label
            htmlFor={`${value}-stars`}
            className="reviews__rating-label form__rating-label"
            title={['perfect', 'good', 'not bad', 'badly', 'terribly'][5 - value]}
            key={`label-${value}`}
          >
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Rating;
