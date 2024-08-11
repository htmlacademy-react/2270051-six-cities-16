import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {OfferState} from '../lib/types/state';
import {BaseOffer, Offer} from '../lib/types/offer';
import {Review} from '../lib/types/review';
import {AppDispatch, RootState} from './index';
import {API_ROUTE, RequestStatus, THUNK_ACTION} from '../const';

const initialState: OfferState = {
  offer: null,
  nearbyOffers: [],
  comments: [],
  status: RequestStatus.IDLE,
  error: null,
};

export const fetchOfferById = createAsyncThunk<
  Offer,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(THUNK_ACTION.FETCH_OFFER_BY_ID,
    async (id, { extra: api }) => {
      const response = await api.get<Offer>(`${API_ROUTE.OFFERS}/${id}`);
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
  >(THUNK_ACTION.FETCH_NEARBY_OFFERS,
    async (id, { extra: api }) => {
      const response = await api.get<BaseOffer[]>(`${API_ROUTE.OFFERS}/${id}/nearby`);
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
  >(THUNK_ACTION.FETCH_COMMENTS,
    async (id, { extra: api }) => {
      const response = await api.get<Review[]>(`${API_ROUTE.COMMENTS}/${id}`);
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
  >(THUNK_ACTION.POST_COMMENT,
    async ({ id, comment, rating }, { extra: api }) => {
      const response = await api.post<Review>(`${API_ROUTE.COMMENTS}/${id}`, { comment, rating });
      return response.data;
    });

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferById.pending, (state) => {
        state.status = RequestStatus.LOADING;
      })
      .addCase(fetchOfferById.fulfilled, (state, action: PayloadAction<Offer>) => {
        state.status = RequestStatus.SUCCESS;
        state.offer = action.payload;
      })
      .addCase(fetchOfferById.rejected, (state, action) => {
        state.status = RequestStatus.FAILED;
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
      });
  },
});

export default offerSlice.reducer;
