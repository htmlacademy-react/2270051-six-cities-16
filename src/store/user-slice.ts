import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {API_ROUTES, AuthorizationStatus, DEFAULT_CITY, RequestStatus, THUNK_ACTIONS} from '../const';
import {State} from '../lib/types/state';
import {AppDispatch, RootState} from './index';
import {AxiosInstance} from 'axios';

const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
  status: RequestStatus.IDLE,
  error: null,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
};

export const checkAuthorization = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(THUNK_ACTIONS.CHECK_AUTH, async (_, { dispatch, extra: api }) => {
    try {
      await api.get(API_ROUTES.LOGIN);
      dispatch(setAuthorizationStatus(AuthorizationStatus.AUTH));
    } catch (error) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
    }
  });

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<keyof typeof AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthorization.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.AUTH;
      })
      .addCase(checkAuthorization.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      });
  },
});

export const { setAuthorizationStatus } = userSlice.actions;
export default userSlice.reducer;
