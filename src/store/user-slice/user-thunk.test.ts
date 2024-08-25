import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { checkAuthorization, login, logout } from './user-thunk';
import { setAuthorizationStatus, setAuthorizationUser, clearFavorites } from '../actions';
import { AuthorizationStatus, ApiRoute } from '../../const';
import { AuthorizationUser } from '../../lib/types/user';
import { RootState } from '../index';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

describe('User Thunks', () => {
  let mock: MockAdapter;
  let dispatch: ThunkDispatch<RootState, AxiosInstance, AnyAction>;
  let getState: () => RootState;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    dispatch = vi.fn(() => Promise.resolve()) as unknown as ThunkDispatch<RootState, AxiosInstance, AnyAction>;
    getState = () => ({} as RootState);
  });

  describe('checkAuthorization', () => {
    it('should dispatch setAuthorizationStatus and setAuthorizationUser on success', async () => {
      const mockUser: AuthorizationUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        token: 'token',
        avatarUrl: '',
        isPro: false
      };
      mock.onGet(ApiRoute.Login).reply(200, mockUser);

      await checkAuthorization()(dispatch, getState, axios);

      expect(dispatch).toHaveBeenCalledWith(setAuthorizationStatus(AuthorizationStatus.Auth));
      expect(dispatch).toHaveBeenCalledWith(setAuthorizationUser(mockUser));
    });

    it('should dispatch setAuthorizationStatus on failure', async () => {
      mock.onGet(ApiRoute.Login).reply(401);

      await checkAuthorization()(dispatch, getState, axios);

      expect(dispatch).toHaveBeenCalledWith(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    });
  });

  describe('login', () => {
    it('should dispatch setAuthorizationStatus and setAuthorizationUser on success', async () => {
      const mockUser: AuthorizationUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        token: 'token',
        avatarUrl: '',
        isPro: false
      };
      mock.onPost(ApiRoute.Login).reply(200, mockUser);

      await login({ email: 'test@test.com', password: 'password' })(dispatch, getState, axios);

      expect(dispatch).toHaveBeenCalledWith(setAuthorizationStatus(AuthorizationStatus.Auth));
      expect(dispatch).toHaveBeenCalledWith(setAuthorizationUser(mockUser));
    });

  });

  describe('logout', () => {
    it('should dispatch setAuthorizationStatus, setAuthorizationUser, and clearFavorites on success', async () => {
      mock.onDelete(ApiRoute.Logout).reply(204);

      await logout()(dispatch, getState, axios);

      expect(dispatch).toHaveBeenCalledWith(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      expect(dispatch).toHaveBeenCalledWith(setAuthorizationUser(null));
      expect(dispatch).toHaveBeenCalledWith(clearFavorites());
    });
  });
});
