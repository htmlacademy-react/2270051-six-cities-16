import {useAppSelector} from './redux-hooks';
import {BaseOffer} from '../lib/types/offer';
import {RootState} from '../store';

function useFavoriteOffers(): BaseOffer[] {
  const offers = useAppSelector((state: RootState) => state.offers.offers);
  return offers.filter((offer) => offer.isFavorite);
}

export default useFavoriteOffers;
