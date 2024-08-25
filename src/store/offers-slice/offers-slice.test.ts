import { describe, it, expect } from 'vitest';
import offersReducer from './offers-slice';
import {
  fetchAllOffers,
  fetchFavorites,
  addToFavorites,
  removeFromFavorites,
} from './offers-thunk';
import { AuthorizationStatus, DEFAULT_CITY, RequestStatus } from '../../const';
import { State } from '../../lib/types/state';
import { BaseOffer, City } from '../../lib/types/offer';
import { clearFavorites, setCity } from '../actions';

const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
  favorites: [],
  status: RequestStatus.Idle,
  error: undefined,
  authorizationStatus: AuthorizationStatus.Unknown,
  authorizationUser: null,
};

describe('offersSlice', () => {
  it('should return the initial state', () => {
    expect(offersReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle setCity', () => {
    const mockCity: City = { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 13 } };
    const state = offersReducer(initialState, setCity(mockCity));
    expect(state.city).toEqual(mockCity);
  });

  it('should handle fetchAllOffers.pending', () => {
    const state = offersReducer(initialState, fetchAllOffers.pending('', undefined));
    expect(state.status).toEqual(RequestStatus.Loading);
  });

  it('should handle fetchAllOffers.fulfilled', () => {
    const mockOffers: BaseOffer[] = [{ id: '1', title: 'Test Offer' }] as BaseOffer[];
    const state = offersReducer(initialState, fetchAllOffers.fulfilled(mockOffers, ''));
    expect(state.status).toEqual(RequestStatus.Success);
    expect(state.offers).toEqual(mockOffers);
  });

  it('should handle fetchFavorites.fulfilled', () => {
    const mockFavorites: BaseOffer[] = [{ id: '1', isFavorite: true }] as BaseOffer[];
    const state = offersReducer(initialState, fetchFavorites.fulfilled(mockFavorites, ''));
    expect(state.favorites).toEqual(mockFavorites);
    expect(state.offers.every((offer) => offer.isFavorite)).toBe(true);
  });

  it('should handle addToFavorites.fulfilled', () => {
    const mockOffer: BaseOffer = { id: '1', isFavorite: false } as BaseOffer;
    const state = offersReducer({ ...initialState, offers: [mockOffer] }, addToFavorites.fulfilled(mockOffer, '', '1'));
    expect(state.favorites).toContain(mockOffer);
    expect(state.offers.find((offer) => offer.id === '1')?.isFavorite).toBe(true);
  });

  it('should handle removeFromFavorites.fulfilled', () => {
    const mockOffer: BaseOffer = { id: '1', isFavorite: true } as BaseOffer;
    const state = offersReducer({ ...initialState, offers: [mockOffer], favorites: [mockOffer] }, removeFromFavorites.fulfilled(mockOffer, '', '1'));
    expect(state.favorites).not.toContain(mockOffer);
    expect(state.offers.find((offer) => offer.id === '1')?.isFavorite).toBe(false);
  });

  it('should handle clearFavorites', () => {
    const mockOffer: BaseOffer = { id: '1', isFavorite: true } as BaseOffer;
    const state = offersReducer({ ...initialState, offers: [mockOffer], favorites: [mockOffer] }, clearFavorites());
    expect(state.favorites).toEqual([]);
    expect(state.offers.every((offer) => !offer.isFavorite)).toBe(true);
  });
});
