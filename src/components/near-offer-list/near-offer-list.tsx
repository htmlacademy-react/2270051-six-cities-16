import {useState} from 'react';
import NearOfferCard from '../near-offer-card/near-offer-card';
import {Offer} from '../../lib/types/offer';

type NearOfferListProps = {
  offers: Offer[];
}

function NearOfferList({offers}: NearOfferListProps) {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => (
        <NearOfferCard
          key={offer.id}
          offer={offer}
          onSelect={setActiveOfferId}
          isActive={activeOfferId === offer.id}
        />
      ))}
    </div>
  );
}

export default NearOfferList;
