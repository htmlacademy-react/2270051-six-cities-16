import {createAction } from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../const';
import {AuthorizationUser} from '../lib/types/user';

export const setAuthorizationStatus = createAction<keyof typeof AuthorizationStatus>('user/setAuthorizationStatus');
export const setAuthorizationUser = createAction<AuthorizationUser | null>('user/setAuthorizationUser');
