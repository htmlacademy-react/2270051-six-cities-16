import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setCity, clearFavorites } from '../actions';
import { fetchAllOffers, fetchFavorites, addToFavorites, removeFromFavorites } from './offers-thunk';
import { AuthorizationStatus, DEFAULT_CITY, RequestStatus } from '../../const';
import { State } from '../../lib/types/state';
import {BaseOffer, City} from '../../lib/types/offer';

const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
  favorites: [],
  status: RequestStatus.Idle,
  error: undefined,
  authorizationStatus: AuthorizationStatus.Unknown,
  authorizationUser: null,
};

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
