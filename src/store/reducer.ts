import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BaseOffer, City, Offer} from '../lib/types/offer';
import {State} from '../lib/types/state';
import {DEFAULT_CITY} from '../const';

const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
  filteredOffers: [],
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
      state.filteredOffers = state.offers.filter(
        (offer) => offer.city.name === action.payload.name
      ) as Offer[];
    },
    fillOffers: (state, action: PayloadAction<BaseOffer[]>) => {
      state.offers = action.payload as Offer[];
      state.filteredOffers = action.payload.filter(
        (offer) => offer.city.name === state.city.name
      ) as Offer[];
    },
  },
});

export const {setCity, fillOffers} = offersSlice.actions;
export default offersSlice.reducer;
