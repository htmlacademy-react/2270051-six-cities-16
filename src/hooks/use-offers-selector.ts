import {City, Offer} from '../lib/types/offer';

function useOffersSelector(offersState: {city: City; offers: Offer[]}) {
  const city = offersState.city.name;
  const offers = offersState.offers;
  return { city, offers };
}

export default useOffersSelector;
