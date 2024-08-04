import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {Offer, City} from '../lib/types/offer';
import {State} from '../lib/types/state';
import {setCity, fillOffers} from './action';
import {DEFAULT_CITY} from '../const';

const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
  filteredOffers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action: PayloadAction<City>) => {
      state.city = action.payload;
      state.filteredOffers = state.offers.filter(
        (offer) => offer.city.name === action.payload.name);
    })
    .addCase(fillOffers, (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
      state.filteredOffers = action.payload.filter(
        (offer) => offer.city.name === state.city.name);
    });
});

export {reducer};
