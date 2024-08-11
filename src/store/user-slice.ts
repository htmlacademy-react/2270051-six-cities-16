import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {dropToken, saveToken} from '../services/token';
import {API_ROUTE, AuthorizationStatus, DEFAULT_CITY, RequestStatus, THUNK_ACTION} from '../const';
import {State} from '../lib/types/state';
import {AuthorizationUser} from '../lib/types/user';
import {AppDispatch, RootState} from './index';
import {setAuthorizationStatus, setAuthorizationUser} from './actions';

const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
  status: RequestStatus.IDLE,
  error: null,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
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
  >(THUNK_ACTION.CHECK_AUTH,
    async (_, { dispatch, extra: api }) => {
      const response = await api.get<AuthorizationUser>(API_ROUTE.LOGIN);
      dispatch(setAuthorizationStatus(AuthorizationStatus.AUTH));
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
  >(THUNK_ACTION.LOGIN,
    async ({ email, password }, { dispatch, extra: api }) => {
      const response = await api.post<AuthorizationUser>(API_ROUTE.LOGIN, { email, password });
      saveToken(response.data.token);
      dispatch(setAuthorizationStatus(AuthorizationStatus.AUTH));
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
  >(THUNK_ACTION.LOGOUT,
    async (_, { dispatch, extra: api }) => {
      await api.delete(API_ROUTE.LOGOUT);
      dropToken();
      dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
      dispatch(setAuthorizationUser(null));
    });

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthorization.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.AUTH;
        state.authorizationUser = action.payload;
      })
      .addCase(checkAuthorization.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
        state.authorizationUser = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.AUTH;
        state.authorizationUser = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
        state.authorizationUser = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
        state.authorizationUser = null;
      });
  },
});

export default userSlice.reducer;
