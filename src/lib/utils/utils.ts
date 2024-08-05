import {BaseOffer} from '../types/offer';
import {SortType} from '../../const';

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

export function getLocations(offers: BaseOffer[]) {
  return offers.map((offer) => offer.location);
}

export function sortOffers(offers: BaseOffer[], sortType: string): BaseOffer[] {
  const sorted = [...offers];
  switch (sortType) {
    case SortType.PriceLowToHigh:
      return sorted.sort((a, b) => a.price - b.price);
    case SortType.PriceHighToLow:
      return sorted.sort((a, b) => b.price - a.price);
    case SortType.TopRatedFirst:
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
}
