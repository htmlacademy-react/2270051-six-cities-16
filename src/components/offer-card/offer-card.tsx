import React from 'react';
import {Link} from 'react-router-dom';
import {BaseOffer} from '../../lib/types/offer';

type OfferCardProps = {
  offer: BaseOffer;
  onSelect: (selectedId: string | null) => void;
  isActive: boolean;
  className?: string;
}

function OfferCard({ offer, onSelect, isActive, className = 'cities__card' }: OfferCardProps) {
  return (
    <article
      className={`${className} place-card`}
      onMouseEnter={() => onSelect(offer.id)}
      onMouseLeave={() => onSelect(null)}
      data-active={isActive ? 'true' : undefined}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div
        className={`${className && className.includes('near-places') ? 'near-places__image-wrapper' : 'cities__image-wrapper'} place-card__image-wrapper`}
      >
        <Link to={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button${offer.isFavorite ? ' place-card__bookmark-button--active' : ''}`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export const MemoizedOfferCard = React.memo(OfferCard);
