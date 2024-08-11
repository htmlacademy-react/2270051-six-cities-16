import {AUTH_TOKEN_KEY} from '../const';

export type Token = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return token ?? '';
};

export const saveToken = (token: Token) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const dropToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};
