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
import { RequestStatus, ERROR_MESSAGE, COMMENT_SUBMIT_ERROR_MESSAGE } from '../../const';
import { OfferState } from '../../lib/types/state';
import { createMockBaseOffer, createMockOffer, createMockReview } from '../../lib/utils/mocks';

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
    const mockOffer = createMockOffer();
    const state = offerReducer(initialState, fetchOfferById.fulfilled(mockOffer, '', mockOffer.id));
    expect(state.status).toEqual(RequestStatus.Success);
    expect(state.offer).toEqual(mockOffer);
    expect(state.loadError).toBeUndefined();
  });

  it('should handle fetchOfferById.rejected', () => {
    const state = offerReducer(initialState, fetchOfferById.rejected(null, '', '1', new Error('Failed to load offer')));
    expect(state.status).toEqual(RequestStatus.Failed);
    expect(state.loadError).toEqual(ERROR_MESSAGE);
  });

  it('should handle fetchNearbyOffers.fulfilled', () => {
    const mockOffers = [createMockBaseOffer()];
    const state = offerReducer(initialState, fetchNearbyOffers.fulfilled(mockOffers, '', '1'));
    expect(state.nearbyOffers).toEqual(mockOffers);
    expect(state.loadError).toBeUndefined();
  });

  it('should handle fetchNearbyOffers.rejected', () => {
    const state = offerReducer(initialState, fetchNearbyOffers.rejected(null, '', '1', new Error('Failed to load nearby offers')));
    expect(state.loadError).toEqual(ERROR_MESSAGE);
  });

  it('should handle fetchComments.fulfilled', () => {
    const mockComments = [createMockReview()];
    const state = offerReducer(initialState, fetchComments.fulfilled(mockComments, '', '1'));
    expect(state.comments).toEqual(mockComments);
    expect(state.loadError).toBeUndefined();
  });

  it('should handle fetchComments.rejected', () => {
    const state = offerReducer(initialState, fetchComments.rejected(null, '', '1', new Error('Failed to load comments')));
    expect(state.loadError).toEqual(ERROR_MESSAGE);
  });

  it('should handle postComment.fulfilled', () => {
    const mockComment = createMockReview();
    const state = offerReducer(initialState, postComment.fulfilled(mockComment, '', { id: '1', comment: mockComment.comment, rating: mockComment.rating }));
    expect(state.comments).toContain(mockComment);
    expect(state.submitError).toBeUndefined();
  });

  it('should handle postComment.rejected', () => {
    const state = offerReducer(initialState, postComment.rejected(null, '', { id: '1', comment: 'Nice stay!', rating: 5 }, new Error('Failed to post comment')));
    expect(state.submitError).toEqual(COMMENT_SUBMIT_ERROR_MESSAGE);
  });

  it('should handle addToFavorites.fulfilled', () => {
    const mockOffer = createMockOffer();
    const state = offerReducer({ ...initialState, offer: mockOffer }, addToFavorites.fulfilled(mockOffer, '', mockOffer.id));
    expect(state.offer?.isFavorite).toBe(true);
  });

  it('should handle removeFromFavorites.fulfilled', () => {
    const mockOffer = createMockOffer();
    const state = offerReducer({ ...initialState, offer: mockOffer }, removeFromFavorites.fulfilled(mockOffer, '', mockOffer.id));
    expect(state.offer?.isFavorite).toBe(false);
  });
});
