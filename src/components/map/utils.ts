import {Offer} from '../../lib/types/offer';

export function filterOffersByCity(offers: Offer[], cityName: string): Offer[] {
  return offers.filter((offer) => offer.city.name === cityName);
}
