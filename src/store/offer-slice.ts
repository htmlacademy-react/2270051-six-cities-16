import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {OfferState} from '../lib/types/state';
import {BaseOffer, Offer} from '../lib/types/offer';
import {Review} from '../lib/types/review';
import {AppDispatch, RootState} from './index';
import {ApiRoute, RequestStatus, ThunkAction} from '../const';

const initialState: OfferState = {
  offer: null,
  nearbyOffers: [],
  comments: [],
  status: RequestStatus.Idle,
  error: undefined,
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
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(ThunkAction.PostComment,
    async ({ id, comment, rating }, { extra: api }) => {
      const response = await api.post<Review>(`${ApiRoute.Comments}/${id}`, { comment, rating });
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
      })
      .addCase(fetchOfferById.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.error.message ?? null;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action: PayloadAction<BaseOffer[]>) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.comments = action.payload;
      })
      .addCase(postComment.fulfilled, (state, action: PayloadAction<Review>) => {
        state.comments.push(action.payload);
      })
      .addCase(postComment.rejected, (state, action) => {
        state.error = action.error.message ?? null;
      });
  },
});

export default offerSlice.reducer;
