import { describe, it, expect } from 'vitest';
import offerReducer from './offer-slice';
import {
  fetchOfferById,
  fetchNearbyOffers,
  fetchComments,
  postComment,
  addToFavorites,
  removeFromFavorites,
} from './offer-thunk';
import { RequestStatus } from '../../const';
import { OfferState } from '../../lib/types/state';
import { BaseOffer, Offer } from '../../lib/types/offer';
import { Review } from '../../lib/types/review';

const initialState: OfferState = {
  offer: null,
  nearbyOffers: [],
  comments: [],
  status: RequestStatus.Idle,
  loadError: undefined,
  submitError: undefined,
};

describe('offerSlice', () => {
  it('should return the initial state', () => {
    expect(offerReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle fetchOfferById.pending', () => {
    const state = offerReducer(initialState, fetchOfferById.pending('', '1'));
    expect(state.status).toEqual(RequestStatus.Loading);
  });

  it('should handle fetchOfferById.fulfilled', () => {
    const mockOffer: Offer = { id: '1', title: 'Test Offer' } as Offer;
    const state = offerReducer(initialState, fetchOfferById.fulfilled(mockOffer, '', '1'));
    expect(state.status).toEqual(RequestStatus.Success);
    expect(state.offer).toEqual(mockOffer);
  });

  it('should handle fetchNearbyOffers.fulfilled', () => {
    const mockOffers = [{ id: '2', title: 'Nearby Offer' }] as BaseOffer[];
    const state = offerReducer(initialState, fetchNearbyOffers.fulfilled(mockOffers, '', '1'));
    expect(state.nearbyOffers).toEqual(mockOffers);
  });

  it('should handle fetchComments.fulfilled', () => {
    const mockComments: Review[] = [{ id: '1', comment: 'Great place!' }] as Review[];
    const state = offerReducer(initialState, fetchComments.fulfilled(mockComments, '', '1'));
    expect(state.comments).toEqual(mockComments);
  });

  it('should handle postComment.fulfilled', () => {
    const mockComment: Review = { id: '2', comment: 'Nice stay!' } as Review;
    const state = offerReducer(initialState, postComment.fulfilled(mockComment, '', { id: '1', comment: 'Nice stay!', rating: 5 }));
    expect(state.comments).toContain(mockComment);
  });

  it('should handle addToFavorites.fulfilled', () => {
    const mockOffer: Offer = { id: '1', isFavorite: false } as Offer;
    const state = offerReducer({ ...initialState, offer: mockOffer }, addToFavorites.fulfilled(mockOffer, '', '1'));
    expect(state.offer?.isFavorite).toBe(true);
  });

  it('should handle removeFromFavorites.fulfilled', () => {
    const mockOffer: Offer = { id: '1', isFavorite: true } as Offer;
    const state = offerReducer({ ...initialState, offer: mockOffer }, removeFromFavorites.fulfilled(mockOffer, '', '1'));
    expect(state.offer?.isFavorite).toBe(false);
  });
});
