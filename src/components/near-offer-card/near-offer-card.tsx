import {BaseOffer} from '../../lib/types/offer';
import {MemoizedOfferCard as OfferCard} from '../offer-card/offer-card';

type NearOfferCardProps = {
  offer: BaseOffer;
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
