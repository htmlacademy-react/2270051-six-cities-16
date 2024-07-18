import {useState} from 'react';
import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../lib/types/offer';

type OfferListProps = {
  offers: Offer[];
}

function OfferList({ offers }: OfferListProps) {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onSelect={setActiveOfferId}
          isActive={activeOfferId === offer.id}
        />
      ))}
    </div>
  );
}

export default OfferList;
