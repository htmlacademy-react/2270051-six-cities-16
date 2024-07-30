import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {Offer, City} from '../lib/types/offer';
import {State} from '../lib/types/state';
import {setCity, fillOffers} from './action';
import {DEFAULT_CITY} from '../const';

const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action: PayloadAction<City>) => {
      state.city = action.payload.name;
    })
    .addCase(fillOffers, (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    });
});

export {reducer};
