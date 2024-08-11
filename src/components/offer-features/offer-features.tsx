import {capitalizeFirstLetter} from './utils';

type OfferFeaturesProps = {
  type: string;
  bedrooms: number;
  maxAdults: number;
}

function OfferFeatures({type, bedrooms, maxAdults}: OfferFeaturesProps) {
  return (
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire">
        {capitalizeFirstLetter(type)}
      </li>
      <li className="offer__feature offer__feature--bedrooms">
        {bedrooms} {bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
      </li>
      <li className="offer__feature offer__feature--adults">
        Max {maxAdults} {maxAdults === 1 ? 'adult' : 'adults'}
      </li>
    </ul>
  );
}

export default OfferFeatures;
