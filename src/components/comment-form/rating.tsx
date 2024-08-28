import React from 'react';
import {RATING_VALUES} from '../../const';

type RatingProps = {
  rating: string;
  handleRatingChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

function Rating({ rating, handleRatingChange, disabled }: RatingProps) {
  return (
    <div className="reviews__rating-form form__rating">
      {RATING_VALUES.map((value) => (
        <React.Fragment key={value}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value={value}
            id={`${value}-stars`}
            type="radio"
            onChange={handleRatingChange}
            checked={rating === value.toString()}
            disabled={disabled}
          />
          <label
            htmlFor={`${value}-stars`}
            className="reviews__rating-label form__rating-label"
            title={['perfect', 'good', 'not bad', 'badly', 'terribly'][5 - value]}
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
