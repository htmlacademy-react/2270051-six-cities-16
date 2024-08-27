import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { dropToken, saveToken } from '../../services/token';
import { AuthorizationUser } from '../../lib/types/user';
import { AppDispatch, RootState } from '../index';
import {clearFavorites, setAuthorizationStatus, setAuthorizationUser} from '../actions';
import { fetchFavorites } from '../offers-slice/offers-thunk';
import { ApiRoute, AuthorizationStatus, LOGIN_FAILED_MESSAGE, ThunkAction } from '../../const';

export const checkAuthorization = createAsyncThunk<
  AuthorizationUser,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(ThunkAction.CheckAuth, async (_, { dispatch, extra: api }) => {
    try {
      const response = await api.get<AuthorizationUser>(ApiRoute.Login);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setAuthorizationUser(response.data));
      return response.data;
    } catch (error) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
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
  >(ThunkAction.Login, async ({ email, password }, { dispatch, extra: api }) => {
    try {
      const response = await api.post<AuthorizationUser>(ApiRoute.Login, { email, password });
      saveToken(response.data.token);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setAuthorizationUser(response.data));
      dispatch(fetchFavorites());
      return response.data;
    } catch (error) {
      throw new Error(LOGIN_FAILED_MESSAGE);
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
  >(ThunkAction.Logout, async (_, { dispatch, extra: api }) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(setAuthorizationUser(null));
    dispatch(clearFavorites());
  });
