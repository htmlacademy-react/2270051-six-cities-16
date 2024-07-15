import {Fragment, useState} from 'react';
import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../lib/types';

type OfferListProps = {
  offers: Offer[];
}

function OfferList({ offers }: OfferListProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <Fragment
          key={offer.id}
          onMouseEnter={() => setActiveOfferId(offer.id)}
          onMouseLeave={() => setActiveOfferId(null)}
        >
          <OfferCard offer={offer} />
        </Fragment>
      ))}
    </div>
  );
}

export default OfferList;
