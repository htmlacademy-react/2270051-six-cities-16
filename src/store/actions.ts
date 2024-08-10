import {createAction } from '@reduxjs/toolkit';
import {City} from '../lib/types/offer';
import {AuthorizationUser} from '../lib/types/user';
import {AuthorizationStatus} from '../const';

export const setCity = createAction<City>('offers/setCity');
export const setAuthorizationStatus = createAction<keyof typeof AuthorizationStatus>('user/setAuthorizationStatus');
export const setAuthorizationUser = createAction<AuthorizationUser | null>('user/setAuthorizationUser');