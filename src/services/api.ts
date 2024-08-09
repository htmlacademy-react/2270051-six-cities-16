import axios, {AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import {getToken} from './token';
import {REQUEST_TIMEOUT, URL_API} from '../const';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: URL_API,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  return api;
};
