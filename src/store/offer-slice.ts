import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {OfferState} from '../lib/types/state';
import {BaseOffer, Offer} from '../lib/types/offer';
import {Review} from '../lib/types/review';
import {AppDispatch, RootState} from './index';
import {ApiRoute, COMMENT_SUBMIT_ERROR_MESSAGE, RequestStatus, ThunkAction} from '../const';

const initialState: OfferState = {
  offer: null,
  nearbyOffers: [],
  comments: [],
  status: RequestStatus.Idle,
  loadError: undefined,
  submitError: undefined,
};

export const fetchOfferById = createAsyncThunk<
  Offer,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(ThunkAction.FetchOfferById,
    async (id, { extra: api }) => {
      const response = await api.get<Offer>(`${ApiRoute.Offers}/${id}`);
      return response.data;
    });

export const fetchNearbyOffers = createAsyncThunk<
  BaseOffer[],
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(ThunkAction.FetchNearbyOffers,
    async (id, { extra: api }) => {
      const response = await api.get<BaseOffer[]>(`${ApiRoute.Offers}/${id}/nearby`);
      return response.data;
    });

export const fetchComments = createAsyncThunk<
  Review[],
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(ThunkAction.FetchComments,
    async (id, { extra: api }) => {
      const response = await api.get<Review[]>(`${ApiRoute.Comments}/${id}`);
      return response.data;
    });

export const postComment = createAsyncThunk<
  Review,
  { id: string; comment: string; rating: number },
  {
    state: RootState;
    extra: AxiosInstance;
  }
  >(ThunkAction.PostComment,
    async ({ id, comment, rating }, { extra: api }) => {
      try {
        const response = await api.post<Review>(`${ApiRoute.Comments}/${id}`, { comment, rating });
        return response.data;
      } catch (error) {
        throw new Error(COMMENT_SUBMIT_ERROR_MESSAGE);
      }
    });

export const addToFavorites = createAsyncThunk<
  Offer,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(ThunkAction.AddToFavorites,
    async (id, { extra: api }) => {
      const response = await api.post<Offer>(`${ApiRoute.Favorite}/${id}/1`);
      return response.data;
    });

export const removeFromFavorites = createAsyncThunk<
  Offer,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(ThunkAction.RemoveFromFavorites,
    async (id, { extra: api }) => {
      const response = await api.post<Offer>(`${ApiRoute.Favorite}/${id}/0`);
      return response.data;
    });

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
      .addCase(fetchOfferById.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.loadError = action.error.message ?? undefined;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action: PayloadAction<BaseOffer[]>) => {
        state.nearbyOffers = action.payload;
        state.loadError = undefined;
      })
      .addCase(fetchNearbyOffers.rejected, (state, action) => {
        state.loadError = action.error.message ?? undefined;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.comments = action.payload;
        state.loadError = undefined;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loadError = action.error.message ?? undefined;
      })
      .addCase(postComment.fulfilled, (state, action: PayloadAction<Review>) => {
        state.comments.push(action.payload);
        state.submitError = undefined;
      })
      .addCase(postComment.rejected, (state, action) => {
        state.submitError = action.error.message ?? COMMENT_SUBMIT_ERROR_MESSAGE;
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
