import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {dropToken, saveToken} from '../services/token';
import {API_ROUTES, AuthorizationStatus, DEFAULT_CITY, RequestStatus, THUNK_ACTIONS} from '../const';
import {State} from '../lib/types/state';
import {AuthorizationUser} from '../lib/types/user';
import {AppDispatch, RootState} from './index';

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
  >(THUNK_ACTIONS.CHECK_AUTH, async (_, { dispatch, extra: api }) => {
    try {
      const response = await api.get<AuthorizationUser>(API_ROUTES.LOGIN);
      dispatch(setAuthorizationStatus(AuthorizationStatus.AUTH));
      dispatch(setAuthorizationUser(response.data));
      return response.data;
    } catch (error) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
      throw error;
    }
  });

export const login = createAsyncThunk<
  AuthorizationUser,
  { email: string; password: string },
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(THUNK_ACTIONS.LOGIN, async ({ email, password }, { dispatch, extra: api }) => {
    try {
      const response = await api.post<AuthorizationUser>(API_ROUTES.LOGIN, { email, password });
      saveToken(response.data.token);
      dispatch(setAuthorizationStatus(AuthorizationStatus.AUTH));
      dispatch(setAuthorizationUser(response.data));
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
      throw error;
    }
  });

export const logout = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(THUNK_ACTIONS.LOGOUT, async (_, { dispatch, extra: api }) => {
    try {
      await api.delete(API_ROUTES.LOGOUT);
      dropToken();
      dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
      dispatch(setAuthorizationUser(null));
    } catch (error) {
      throw error;
    }
  });

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<keyof typeof AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setAuthorizationUser: (state, action: PayloadAction<AuthorizationUser | null>) => {
      state.authorizationUser = action.payload;
    },
  },
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

export const {setAuthorizationStatus, setAuthorizationUser} = userSlice.actions;
export default userSlice.reducer;
