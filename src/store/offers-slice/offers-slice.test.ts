import { describe, it, expect } from 'vitest';
import offersReducer from './offers-slice';
import {
  fetchAllOffers,
  fetchFavorites,
  addToFavorites,
  removeFromFavorites,
} from './offers-thunk';
import { AuthorizationStatus, DEFAULT_CITY, RequestStatus, ERROR_MESSAGE } from '../../const';
import { State } from '../../lib/types/state';
import { clearFavorites, setCity } from '../actions';
import { createMockBaseOffer, createMockCity } from '../../lib/utils/mocks';

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
    const mockCity = createMockCity();
    const state = offersReducer(initialState, setCity(mockCity));
    expect(state.city).toEqual(mockCity);
  });

  it('should handle fetchAllOffers.pending', () => {
    const state = offersReducer(initialState, fetchAllOffers.pending('', undefined));
    expect(state.status).toEqual(RequestStatus.Loading);
  });

  it('should handle fetchAllOffers.fulfilled', () => {
    const mockOffers = [createMockBaseOffer()];
    const state = offersReducer(initialState, fetchAllOffers.fulfilled(mockOffers, ''));
    expect(state.status).toEqual(RequestStatus.Success);
    expect(state.offers).toEqual(mockOffers);
  });

  it('should handle fetchAllOffers.rejected', () => {
    const state = offersReducer(initialState, fetchAllOffers.rejected(null, '', undefined, new Error('Failed to load')));
    expect(state.status).toEqual(RequestStatus.Failed);
    expect(state.error).toEqual(ERROR_MESSAGE);
  });

  it('should handle fetchFavorites.fulfilled', () => {
    const mockFavorites = [createMockBaseOffer()];
    const state = offersReducer(initialState, fetchFavorites.fulfilled(mockFavorites, ''));
    expect(state.favorites).toEqual(mockFavorites);
    expect(state.offers.every((offer) => offer.isFavorite)).toBe(true);
  });

  it('should handle fetchFavorites.rejected', () => {
    const state = offersReducer(initialState, fetchFavorites.rejected(null, '', undefined, new Error('Failed to load favorites')));
    expect(state.error).toEqual(ERROR_MESSAGE);
  });

  it('should handle addToFavorites.fulfilled', () => {
    const mockOffer = createMockBaseOffer();
    const state = offersReducer({ ...initialState, offers: [mockOffer] }, addToFavorites.fulfilled(mockOffer, '', mockOffer.id));
    expect(state.favorites).toContain(mockOffer);
    expect(state.offers.find((offer) => offer.id === mockOffer.id)?.isFavorite).toBe(true);
  });

  it('should handle addToFavorites.rejected', () => {
    const state = offersReducer(initialState, addToFavorites.rejected(null, '', '1', new Error('Failed to add to favorites')));
    expect(state.error).toEqual(ERROR_MESSAGE);
  });

  it('should handle removeFromFavorites.fulfilled', () => {
    const mockOffer = createMockBaseOffer();
    const state = offersReducer({ ...initialState, offers: [mockOffer], favorites: [mockOffer] }, removeFromFavorites.fulfilled(mockOffer, '', mockOffer.id));
    expect(state.favorites).not.toContain(mockOffer);
    expect(state.offers.find((offer) => offer.id === mockOffer.id)?.isFavorite).toBe(false);
  });

  it('should handle removeFromFavorites.rejected', () => {
    const state = offersReducer(initialState, removeFromFavorites.rejected(null, '', '1', new Error('Failed to remove from favorites')));
    expect(state.error).toEqual(ERROR_MESSAGE);
  });

  it('should handle clearFavorites', () => {
    const mockOffer = createMockBaseOffer();
    const state = offersReducer({ ...initialState, offers: [mockOffer], favorites: [mockOffer] }, clearFavorites());
    expect(state.favorites).toEqual([]);
    expect(state.offers.every((offer) => !offer.isFavorite)).toBe(true);
  });
});
