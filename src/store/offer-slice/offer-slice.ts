import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferState } from '../../lib/types/state';
import { BaseOffer, Offer } from '../../lib/types/offer';
import { Review } from '../../lib/types/review';
import {
  fetchOfferById,
  fetchNearbyOffers,
  fetchComments,
  postComment,
  addToFavorites,
  removeFromFavorites,
} from './offer-thunk';
import { COMMENT_SUBMIT_ERROR_MESSAGE, ERROR_MESSAGE, RequestStatus } from '../../const';

const initialState: OfferState = {
  offer: null,
  nearbyOffers: [],
  comments: [],
  status: RequestStatus.Idle,
  loadError: undefined,
  submitError: undefined,
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferById.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchOfferById.fulfilled, (state, action: PayloadAction<Offer>) => {
        state.status = RequestStatus.Success;
        state.offer = action.payload;
        state.loadError = undefined;
      })
      .addCase(fetchOfferById.rejected, (state) => {
        state.status = RequestStatus.Failed;
        state.loadError = ERROR_MESSAGE;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action: PayloadAction<BaseOffer[]>) => {
        state.nearbyOffers = action.payload;
        state.loadError = undefined;
      })
      .addCase(fetchNearbyOffers.rejected, (state) => {
        state.loadError = ERROR_MESSAGE;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.comments = action.payload;
        state.loadError = undefined;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loadError = ERROR_MESSAGE;
      })
      .addCase(postComment.fulfilled, (state, action: PayloadAction<Review>) => {
        state.comments.push(action.payload);
        state.submitError = undefined;
      })
      .addCase(postComment.rejected, (state) => {
        state.submitError = COMMENT_SUBMIT_ERROR_MESSAGE;
      })
      .addCase(addToFavorites.fulfilled, (state, action: PayloadAction<Offer>) => {
        if (state.offer && state.offer.id === action.payload.id) {
          state.offer.isFavorite = true;
        }
        state.nearbyOffers = state.nearbyOffers.map((offer) =>
          offer.id === action.payload.id ? { ...offer, isFavorite: true } : offer
        );
      })
      .addCase(removeFromFavorites.fulfilled, (state, action: PayloadAction<Offer>) => {
        if (state.offer && state.offer.id === action.payload.id) {
          state.offer.isFavorite = false;
        }
        state.nearbyOffers = state.nearbyOffers.map((offer) =>
          offer.id === action.payload.id ? { ...offer, isFavorite: false } : offer
        );
      });
  },
});

export default offerSlice.reducer;
