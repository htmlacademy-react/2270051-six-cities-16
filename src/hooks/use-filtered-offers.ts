import {useAppSelector} from './redux-hooks';
import {BaseOffer} from '../lib/types/offer';

function useFilteredOffers() {
  const city = useAppSelector((state) => state.city.name);
  const offers = useAppSelector((state) => state.offers);

  const filterByCity = (offers: BaseOffer[], city: string) =>
    offers.filter((offer) => offer.city.name === city);

  return filterByCity(offers, city);
}

export default useFilteredOffers;
