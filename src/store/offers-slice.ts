import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {setCity} from './actions';
import {AppDispatch, RootState} from '../store';
import {BaseOffer, City} from '../lib/types/offer';
import {State} from '../lib/types/state';
import {API_ROUTE, AuthorizationStatus, DEFAULT_CITY, RequestStatus, THUNK_ACTION} from '../const';

const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
  status: RequestStatus.IDLE,
  error: null,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
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
  >(THUNK_ACTION.FETCH_OFFERS,
    async (_, { extra: api }) => {
      const response = await api.get<BaseOffer[]>(API_ROUTE.OFFERS);
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
        state.status = RequestStatus.LOADING;
      })
      .addCase(fetchAllOffers.fulfilled, (state, action) => {
        state.status = RequestStatus.SUCCESS;
        state.offers = action.payload;
      })
      .addCase(fetchAllOffers.rejected, (state) => {
        state.status = RequestStatus.FAILED;
      });
  },
});

export default offersSlice.reducer;
