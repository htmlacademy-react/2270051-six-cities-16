import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {Offer} from '../lib/types/offer';
import {setCity, fillOffers} from './action';
import {DEFAULT_CITY} from '../const';

const initialState = {
  city: DEFAULT_CITY,
  offers: [] as Offer[],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    });
});

export {reducer};
