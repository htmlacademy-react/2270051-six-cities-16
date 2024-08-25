import { describe, it, expect, beforeEach } from 'vitest';
import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  fetchOfferById,
  fetchNearbyOffers,
  fetchComments,
  postComment,
  addToFavorites,
  removeFromFavorites,
} from './offer-thunk';
import { ApiRoute, COMMENT_SUBMIT_ERROR_MESSAGE } from '../../const';
import { Offer, BaseOffer } from '../../lib/types/offer';
import { Review } from '../../lib/types/review';
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

  it('should fetch offer by id', async () => {
    const mockOffer: Offer = { id: '1', title: 'Test Offer' } as Offer;
    mock.onGet(`${ApiRoute.Offers}/1`).reply(200, mockOffer);

    const result = await fetchOfferById('1')(dispatch, getState, axios);
    expect(result.payload).toEqual(mockOffer);
  });

  it('should fetch nearby offers', async () => {
    const mockOffers: BaseOffer[] = [{ id: '2', title: 'Nearby Offer' }] as BaseOffer[];
    mock.onGet(`${ApiRoute.Offers}/1/nearby`).reply(200, mockOffers);

    const result = await fetchNearbyOffers('1')(dispatch, getState, axios);
    expect(result.payload).toEqual(mockOffers);
  });

  it('should fetch comments', async () => {
    const mockComments: Review[] = [{ id: '1', comment: 'Great place!' }] as Review[];
    mock.onGet(`${ApiRoute.Comments}/1`).reply(200, mockComments);

    const result = await fetchComments('1')(dispatch, getState, axios);
    expect(result.payload).toEqual(mockComments);
  });

  it('should post a comment', async () => {
    const mockComment: Review = { id: '2', comment: 'Nice stay!' } as Review;
    mock.onPost(`${ApiRoute.Comments}/1`).reply(200, mockComment);

    const result = await postComment({ id: '1', comment: 'Nice stay!', rating: 5 })(dispatch, getState, axios);
    expect(result.payload).toEqual(mockComment);
  });

  it('should handle post comment error', async () => {
    mock.onPost(`${ApiRoute.Comments}/1`).reply(500);

    const result = await postComment({ id: '1', comment: 'Nice stay!', rating: 5 })(dispatch, getState, axios);
    if ('error' in result) {
      const error = result.error as Error;
      expect(error.message).toEqual(COMMENT_SUBMIT_ERROR_MESSAGE);
    }
  });

  it('should add to favorites', async () => {
    const mockOffer: Offer = { id: '1', isFavorite: false } as Offer;
    mock.onPost(`${ApiRoute.Favorite}/1/1`).reply(200, mockOffer);

    const result = await addToFavorites('1')(dispatch, getState, axios);
    expect(result.payload).toEqual(mockOffer);
  });

  it('should remove from favorites', async () => {
    const mockOffer: Offer = { id: '1', isFavorite: true } as Offer;
    mock.onPost(`${ApiRoute.Favorite}/1/0`).reply(200, mockOffer);

    const result = await removeFromFavorites('1')(dispatch, getState, axios);
    expect(result.payload).toEqual(mockOffer);
  });
});
