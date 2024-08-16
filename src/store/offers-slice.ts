import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {setCity} from './actions';
import {AppDispatch, RootState} from '../store';
import {BaseOffer, City} from '../lib/types/offer';
import {State} from '../lib/types/state';
import {ApiRoute, AuthorizationStatus, DEFAULT_CITY, RequestStatus, ThunkAction} from '../const';

const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
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
      });
  },
});

export default offersSlice.reducer;
