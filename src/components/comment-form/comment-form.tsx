import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import {postComment} from '../../store/offer-slice';
import Rating from './rating';
import {isValidCommentFormData} from './utils';
import {AuthorizationStatus, MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH} from '../../const';

type OfferIdProps = {
  offerId: string;
}

function CommentForm({ offerId }: OfferIdProps) {
  const dispatch = useAppDispatch();
  const {authorizationStatus, submitError} = useAppSelector((state) => state.user);
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

  const handleSubmitForm = async () => {
    if (!isValidCommentFormData(formData.rating, formData.review, MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH)) {
      return;
    }

    setIsSubmitting(true);

    try {
      await dispatch(postComment({
        id: offerId,
        comment: formData.review,
        rating: Number(formData.rating)
      }));
      setFormData({ rating: '', review: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmitForm();
  };

  if (authorizationStatus !== AuthorizationStatus.Auth) {
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
        minLength={MIN_COMMENT_LENGTH}
        maxLength={MAX_COMMENT_LENGTH}
      >
      </textarea>
      {submitError && <p className="reviews__error">{submitError}</p>}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={
            !isValidCommentFormData(formData.rating, formData.review, MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH) ||
            isSubmitting
          }
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
