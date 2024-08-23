import {BaseOffer, City} from '../types/offer';
import {SortType} from '../../const';

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

export function sortOffers(offers: BaseOffer[], sortType: SortType): BaseOffer[] {
  const offersCopy = [...offers];
  switch (sortType) {
    case SortType.PriceLowToHigh:
      return offersCopy.sort((a, b) => a.price - b.price);
    case SortType.PriceHighToLow:
      return offersCopy.sort((a, b) => b.price - a.price);
    case SortType.TopRatedFirst:
      return offersCopy.sort((a, b) => b.rating - a.rating);
    default:
      return offersCopy;
  }
}

export function getNumericValues(values: (string | number)[]): number[] {
  return values.filter((value) => typeof value === 'number') as number[];
}

export function getRandomCity(cities: City[]) {
  return cities[Math.floor(Math.random() * cities.length)];
}
