import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, DEFAULT_CITY, LOGIN_FAILED_MESSAGE, RequestStatus } from '../../const';
import { State } from '../../lib/types/state';
import { setError, clearError } from '../actions';
import { checkAuthorization, login, logout } from './user-thunk';

const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
  favorites: [],
  status: RequestStatus.Idle,
  error: undefined,
  authorizationStatus: AuthorizationStatus.Unknown,
  authorizationUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthorization.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.authorizationUser = action.payload;
      })
      .addCase(checkAuthorization.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.authorizationUser = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.authorizationUser = action.payload;
        state.error = undefined;
      })
      .addCase(login.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.authorizationUser = null;
        state.error = LOGIN_FAILED_MESSAGE;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.authorizationUser = null;
      })
      .addCase(setError, (state, action) => {
        state.error = action.payload;
      })
      .addCase(clearError, (state) => {
        state.error = undefined;
      });
  },
});

export default userSlice.reducer;
