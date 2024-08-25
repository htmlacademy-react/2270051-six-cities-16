import { describe, it, expect, beforeEach } from 'vitest';
import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  fetchAllOffers,
  fetchFavorites,
  addToFavorites,
  removeFromFavorites,
} from './offers-thunk';
import { ApiRoute } from '../../const';
import { createMockBaseOffer } from '../../lib/utils/mocks';
import { RootState } from '../index';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

describe('Offers Thunks', () => {
  let mock: MockAdapter;
  let dispatch: ThunkDispatch<RootState, AxiosInstance, AnyAction>;
  let getState: () => RootState;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    dispatch = () => Promise.resolve();
    getState = () => ({} as RootState);
  });

  it('should fetch all offers', async () => {
    const mockOffers = [createMockBaseOffer()];
    mock.onGet(ApiRoute.Offers).reply(200, mockOffers);

    const result = await fetchAllOffers()(dispatch, getState, axios);
    expect(result.payload).toEqual(mockOffers);
  });

  it('should fetch favorites', async () => {
    const mockFavorites = [createMockBaseOffer()];
    mock.onGet(ApiRoute.Favorite).reply(200, mockFavorites);

    const result = await fetchFavorites()(dispatch, getState, axios);
    expect(result.payload).toEqual(mockFavorites);
  });

  it('should add to favorites', async () => {
    const mockOffer = createMockBaseOffer();
    mock.onPost(`${ApiRoute.Favorite}/${mockOffer.id}/1`).reply(200, mockOffer);

    const result = await addToFavorites(mockOffer.id)(dispatch, getState, axios);
    expect(result.payload).toEqual(mockOffer);
  });

  it('should remove from favorites', async () => {
    const mockOffer = createMockBaseOffer();
    mock.onPost(`${ApiRoute.Favorite}/${mockOffer.id}/0`).reply(200, mockOffer);

    const result = await removeFromFavorites(mockOffer.id)(dispatch, getState, axios);
    expect(result.payload).toEqual(mockOffer);
  });
});
