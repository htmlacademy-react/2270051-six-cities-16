import React from 'react';
import {Link} from 'react-router-dom';
import FavoritesButton from '../favorites-button/favorites-button';
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
          <FavoritesButton
            offerId={offer.id}
            isFavorite={offer.isFavorite}
            buttonClassName="place-card__bookmark-button"
            iconClassName="place-card__bookmark-icon"
            iconWidth="18"
            iconHeight="19"
          />
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
