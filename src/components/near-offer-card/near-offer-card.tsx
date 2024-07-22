import {Offer} from '../../lib/types/offer';
import OfferCard from '../offer-card/offer-card';

type NearOfferCardProps = {
  offer: Offer;
  onSelect: (selectedId: string | null) => void;
  isActive: boolean;
}

function NearOfferCard({offer, onSelect, isActive}: NearOfferCardProps) {
  return (
    <OfferCard
      offer={offer}
      onSelect={onSelect}
      isActive={isActive}
      className="near-places__card"
    />
  );
}

export default NearOfferCard;
