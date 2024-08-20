import React, {useMemo, useState} from 'react';
import {MemoizedOfferCard as OfferCard} from '../offer-card/offer-card';
import {BaseOffer} from '../../lib/types/offer';

type OfferListProps = {
  offers: BaseOffer[];
  onActiveOfferChange: (offerId: string | null) => void;
}

function OfferList({offers, onActiveOfferChange}: OfferListProps) {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const handleOfferSelect = useMemo(() => (offerId: string | null) => {
    setActiveOfferId(offerId);
    onActiveOfferChange(offerId);
  }, [onActiveOfferChange]);

  const memoizedOffers = useMemo(() => offers, [offers]);
  const memoizedActiveOfferId = useMemo(() => activeOfferId, [activeOfferId]);

  return (
    <div className="cities__places-list places__list tabs__content">
      {memoizedOffers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onSelect={handleOfferSelect}
          isActive={memoizedActiveOfferId === offer.id}
        />
      ))}
    </div>
  );
}

export const MemoizedOfferList = React.memo(OfferList);
