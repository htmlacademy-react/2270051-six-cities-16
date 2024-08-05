import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BaseOffer, City, Offer} from '../lib/types/offer';
import {State} from '../lib/types/state';
import {DEFAULT_CITY} from '../const';

const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setOffers: (state, action: PayloadAction<BaseOffer[]>) => {
      state.offers = action.payload as Offer[];
    }
  },
});

export const {setCity, setOffers} = offersSlice.actions;
export default offersSlice.reducer;
