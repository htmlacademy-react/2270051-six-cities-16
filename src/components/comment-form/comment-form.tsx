import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import {postComment} from '../../store/offer-slice';
import Rating from './rating';
import {AuthorizationStatus} from '../../const';

function CommentForm({offerId}: { offerId: string }) {
  const dispatch = useAppDispatch();
  const {authorizationStatus} = useAppSelector((state) => state.user);
  const [formData, setFormData] = useState({
    rating: '',
    review: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formData.rating === '' || formData.review.length < 50) {
      return;
    }

    setIsSubmitting(true);
    await dispatch(postComment({ id: offerId, comment: formData.review, rating: Number(formData.rating) }));
    setIsSubmitting(false);
    setFormData({ rating: '', review: '' });
  };

  if (authorizationStatus !== AuthorizationStatus.AUTH) {
    return null;
  }

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
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
          disabled={formData.rating === '' || formData.review.length < 50 || formData.review.length > 300 || isSubmitting}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
