import {useState} from 'react';
import OfferCard from '../offer-card/offer-card';
import useFilteredOffers from '../../hooks/use-filtered-offers';

function OfferList() {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const filteredOffers = useFilteredOffers();

  return (
    <div className="cities__places-list places__list tabs__content">
      {filteredOffers.map((offer) => (
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
