import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {dropToken, saveToken} from '../services/token';
import {ApiRoute, AuthorizationStatus, DEFAULT_CITY, LOGIN_FAILED_MESSAGE, RequestStatus, ThunkAction} from '../const';
import {State} from '../lib/types/state';
import {AuthorizationUser} from '../lib/types/user';
import {AppDispatch, RootState} from './index';
import {clearError, setAuthorizationStatus, setAuthorizationUser, setError} from './actions';

const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
  status: RequestStatus.Idle,
  error: undefined,
  authorizationStatus: AuthorizationStatus.Unknown,
  authorizationUser: null,
};

export const checkAuthorization = createAsyncThunk<
  AuthorizationUser,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(ThunkAction.CheckAuth,
    async (_, { dispatch, extra: api }) => {
      const response = await api.get<AuthorizationUser>(ApiRoute.Login);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setAuthorizationUser(response.data));
      return response.data;
    });

export const login = createAsyncThunk<
  AuthorizationUser,
  { email: string; password: string },
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(ThunkAction.Login,
    async ({ email, password }, { dispatch, extra: api }) => {
      const response = await api.post<AuthorizationUser>(ApiRoute.Login, { email, password });
      saveToken(response.data.token);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setAuthorizationUser(response.data));
      return response.data;
    });

export const logout = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(ThunkAction.Logout,
    async (_, { dispatch, extra: api }) => {
      await api.delete(ApiRoute.Logout);
      dropToken();
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(setAuthorizationUser(null));
    });

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
