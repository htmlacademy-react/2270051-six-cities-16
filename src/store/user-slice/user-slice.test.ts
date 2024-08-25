import { describe, it, expect } from 'vitest';
import userReducer from './user-slice';
import { checkAuthorization, login, logout } from './user-thunk';
import { AuthorizationStatus, DEFAULT_CITY, RequestStatus } from '../../const';
import { State } from '../../lib/types/state';
import { AuthorizationUser } from '../../lib/types/user';

const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
  favorites: [],
  status: RequestStatus.Idle,
  error: undefined,
  authorizationStatus: AuthorizationStatus.Unknown,
  authorizationUser: null,
};

describe('userSlice', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle checkAuthorization.fulfilled', () => {
    const mockUser: AuthorizationUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      token: 'token',
      avatarUrl: '',
      isPro: false
    };
    const state = userReducer(initialState, checkAuthorization.fulfilled(mockUser, ''));
    expect(state.authorizationStatus).toEqual(AuthorizationStatus.Auth);
    expect(state.authorizationUser).toEqual(mockUser);
  });

  it('should handle checkAuthorization.rejected', () => {
    const state = userReducer(initialState, checkAuthorization.rejected(null, '', undefined, new Error('Not authorized')));
    expect(state.authorizationStatus).toEqual(AuthorizationStatus.NoAuth);
    expect(state.authorizationUser).toBeNull();
  });

  it('should handle login.fulfilled', () => {
    const mockUser: AuthorizationUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      token: 'token',
      avatarUrl: '',
      isPro: false
    };
    const state = userReducer(initialState, login.fulfilled(mockUser, '', { email: 'test@test.com', password: 'password' }));
    expect(state.authorizationStatus).toEqual(AuthorizationStatus.Auth);
    expect(state.authorizationUser).toEqual(mockUser);
    expect(state.error).toBeUndefined();
  });

  it('should handle logout.fulfilled', () => {
    const state = userReducer(initialState, logout.fulfilled(undefined, ''));
    expect(state.authorizationStatus).toEqual(AuthorizationStatus.NoAuth);
    expect(state.authorizationUser).toBeNull();
  });

});
