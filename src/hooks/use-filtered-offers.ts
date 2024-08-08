import {useAppSelector} from './redux-hooks';
import useOffersSelector from './use-offers-selector';
import {BaseOffer} from '../lib/types/offer';

function useFilteredOffers() {
  const offersState = useAppSelector((state) => state.offers);
  const {city, offers} = useOffersSelector(offersState);

  const filterByCity = (allOffers: BaseOffer[], currentCity: string) =>
    allOffers.filter((offer) => offer.city.name === currentCity);

  return filterByCity(offers, city);
}

export default useFilteredOffers;
