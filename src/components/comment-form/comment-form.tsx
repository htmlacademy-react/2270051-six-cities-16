import React, {useState} from 'react';
import Rating from './rating';

function CommentForm() {
  const [formData, setFormData] = useState({
    rating: '',
    review: ''
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <Rating rating={formData.rating} handleRatingChange={handleInputChange} />

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleInputChange}
        minLength={50}
        maxLength={300}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={formData.rating === '' || formData.review.length < 50 || formData.review.length > 300}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
