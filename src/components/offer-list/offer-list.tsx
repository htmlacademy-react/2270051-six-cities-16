import {useState} from 'react';
import OfferCard from '../offer-card/offer-card';
import {BaseOffer} from '../../lib/types/offer';
import {useAppSelector} from '../../hooks/redux-hooks';

type OfferListProps = {
  offers: BaseOffer[];
}

function OfferList({ offers }: OfferListProps) {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const selectedCity = useAppSelector((state) => state.city.name);

  const filteredOffers = offers.filter((offer) => offer.city.name === selectedCity);

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
