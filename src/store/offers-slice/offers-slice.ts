import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {clearFavorites, setCity} from '../actions';
import {AppDispatch, RootState} from '../index';
import {BaseOffer, City} from '../../lib/types/offer';
import {State} from '../../lib/types/state';
import {ApiRoute, AuthorizationStatus, DEFAULT_CITY, RequestStatus, ThunkAction} from '../../const';

const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
  favorites: [],
  status: RequestStatus.Idle,
  error: undefined,
  authorizationStatus: AuthorizationStatus.Unknown,
  authorizationUser: null,
};

export const fetchAllOffers = createAsyncThunk<
  BaseOffer[],
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(ThunkAction.FetchOffers,
    async (_, { extra: api }) => {
      const response = await api.get<BaseOffer[]>(ApiRoute.Offers);
      return response.data;
    });

export const fetchFavorites = createAsyncThunk<
  BaseOffer[],
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(ThunkAction.FetchFavorites,
    async (_, { extra: api }) => {
      const response = await api.get<BaseOffer[]>(ApiRoute.Favorite);
      return response.data;
    });

export const addToFavorites = createAsyncThunk<
  BaseOffer,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(ThunkAction.AddToFavorites,
    async (id, { extra: api }) => {
      const response = await api.post<BaseOffer>(`${ApiRoute.Favorite}/${id}/1`);
      return response.data;
    });

export const removeFromFavorites = createAsyncThunk<
  BaseOffer,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(ThunkAction.RemoveFromFavorites,
    async (id, { extra: api }) => {
      const response = await api.post<BaseOffer>(`${ApiRoute.Favorite}/${id}/0`);
      return response.data;
    });

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setCity, (state, action: PayloadAction<City>) => {
        state.city = action.payload;
      })
      .addCase(fetchAllOffers.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchAllOffers.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.offers = action.payload;
      })
      .addCase(fetchAllOffers.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        const favoriteIds = action.payload.map((offer) => offer.id);
        state.offers = state.offers.map((offer) => ({
          ...offer,
          isFavorite: favoriteIds.includes(offer.id),
        }));
      })
      .addCase(addToFavorites.fulfilled, (state, action: PayloadAction<BaseOffer>) => {
        state.favorites.push(action.payload);
        state.offers = state.offers.map((offer) =>
          offer.id === action.payload.id ? { ...offer, isFavorite: true } : offer
        );
      })
      .addCase(removeFromFavorites.fulfilled, (state, action: PayloadAction<BaseOffer>) => {
        state.favorites = state.favorites.filter((offer) => offer.id !== action.payload.id);
        state.offers = state.offers.map((offer) =>
          offer.id === action.payload.id ? { ...offer, isFavorite: false } : offer
        );
      })
      .addCase(clearFavorites, (state) => {
        state.favorites = [];
        state.offers = state.offers.map((offer) => ({ ...offer, isFavorite: false }));
      });
  },
});

export default offersSlice.reducer;
