import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {BaseOffer, City, Offer} from '../lib/types/offer';
import {State} from '../lib/types/state';
import {DEFAULT_CITY} from '../const';
import {AppDispatch, RootState} from '../store';

const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
  status: 'idle',
  error: null,
};

export const fetchOffers = createAsyncThunk<
  Offer[],
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >('offers/fetchOffers', async (_, { extra: api }) => {
    const response = await api.get<BaseOffer[]>('/offers');
    return response.data;
  });

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setOffers: (state, action: PayloadAction<BaseOffer[]>) => {
      state.offers = action.payload as Offer[];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong';
      });
  },
});

export const {setCity, setOffers} = offersSlice.actions;
export default offersSlice.reducer;
