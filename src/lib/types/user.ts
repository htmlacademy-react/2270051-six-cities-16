import {User} from './review';

export type AuthorizationUser = User & {
  email: string;
  token: string;
};
