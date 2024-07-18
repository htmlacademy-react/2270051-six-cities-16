import {Offer} from '../../lib/types/offer';

export function groupFavorites(favorites: Offer[]): Record<string, Offer[]> {
  return favorites.reduce((acc, offer) => {
    const cityName = offer.city.name;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(offer);
    return acc;
  }, {} as Record<string, Offer[]>);
}
