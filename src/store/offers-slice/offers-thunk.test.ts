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
import { BaseOffer } from '../../lib/types/offer';
import { RootState } from '../index';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

describe('Async Thunks', () => {
  let mock: MockAdapter;
  let dispatch: ThunkDispatch<RootState, AxiosInstance, AnyAction>;
  let getState: () => RootState;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    dispatch = () => Promise.resolve();
    getState = () => ({} as RootState);
  });

  it('should fetch all offers', async () => {
    const mockOffers: BaseOffer[] = [{ id: '1', title: 'Test Offer' }] as BaseOffer[];
    mock.onGet(ApiRoute.Offers).reply(200, mockOffers);

    const result = await fetchAllOffers()(dispatch, getState, axios);
    expect(result.payload).toEqual(mockOffers);
  });

  it('should fetch favorites', async () => {
    const mockFavorites: BaseOffer[] = [{ id: '1', isFavorite: true }] as BaseOffer[];
    mock.onGet(ApiRoute.Favorite).reply(200, mockFavorites);

    const result = await fetchFavorites()(dispatch, getState, axios);
    expect(result.payload).toEqual(mockFavorites);
  });

  it('should add to favorites', async () => {
    const mockOffer: BaseOffer = { id: '1', isFavorite: false } as BaseOffer;
    mock.onPost(`${ApiRoute.Favorite}/1/1`).reply(200, mockOffer);

    const result = await addToFavorites('1')(dispatch, getState, axios);
    expect(result.payload).toEqual(mockOffer);
  });

  it('should remove from favorites', async () => {
    const mockOffer: BaseOffer = { id: '1', isFavorite: true } as BaseOffer;
    mock.onPost(`${ApiRoute.Favorite}/1/0`).reply(200, mockOffer);

    const result = await removeFromFavorites('1')(dispatch, getState, axios);
    expect(result.payload).toEqual(mockOffer);
  });
});
