import {BaseOffer} from '../../lib/types/offer';

export function groupFavorites(favorites: BaseOffer[]): Record<string, BaseOffer[]> {
  return favorites.reduce((acc, offer) => {
    const cityName = offer.city.name;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(offer);
    return acc;
  }, {} as Record<string, BaseOffer[]>);
}
