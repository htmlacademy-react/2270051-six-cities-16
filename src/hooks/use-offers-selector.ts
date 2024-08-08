import {BaseOffer, City} from '../lib/types/offer';

function useOffersSelector(offersState: {city: City; offers: BaseOffer[]}) {
  const city = offersState.city.name;
  const offers = offersState.offers;
  return { city, offers };
}

export default useOffersSelector;
