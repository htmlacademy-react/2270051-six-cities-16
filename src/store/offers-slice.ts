import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {BaseOffer, City} from '../lib/types/offer';
import {State} from '../lib/types/state';
import {API_ROUTES, AuthorizationStatus, DEFAULT_CITY, ERROR_MESSAGE, RequestStatus, THUNK_ACTIONS} from '../const';
import {AppDispatch, RootState} from '../store';

const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
  status: RequestStatus.IDLE,
  error: null,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  authorizationUser: null,
};

export const fetchOffers = createAsyncThunk<
  BaseOffer[],
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(THUNK_ACTIONS.FETCH_OFFERS, async (_, { extra: api }) => {
    const response = await api.get<BaseOffer[]>(API_ROUTES.OFFERS);
    return response.data;
  });

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.status = RequestStatus.LOADING;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.status = RequestStatus.SUCCEEDED;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.status = RequestStatus.FAILED;
        state.error = action.error.message ?? ERROR_MESSAGE;
      });
  },
});

export const {setCity} = offersSlice.actions;
export default offersSlice.reducer;
