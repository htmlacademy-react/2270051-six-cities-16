import {useAppSelector} from './redux-hooks';
import {BaseOffer} from '../lib/types/offer';

function useFilteredOffers() {
  const city = useAppSelector((state) => state.offers.city.name);
  const offers = useAppSelector((state) => state.offers.offers);

  const filterByCity = (allOffers: BaseOffer[], currentCity: string) =>
    allOffers.filter((offer) => offer.city.name === currentCity);

  return filterByCity(offers, city);
}

export default useFilteredOffers;