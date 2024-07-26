import {BaseOffer} from '../types/offer';

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

export function getLocations(offers: BaseOffer[]) {
  return offers.map((offer) => offer.location);
}
