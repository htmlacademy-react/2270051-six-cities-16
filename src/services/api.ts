import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {NavigateFunction} from 'react-router-dom';
import {getToken} from './token';
import {REQUEST_TIMEOUT, URL_API} from '../const';

export const createAPI = (navigate?: NavigateFunction): AxiosInstance => {
  const api = axios.create({
    baseURL: URL_API,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['X-Token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response && error.response.status === 401 && navigate) {
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );

  return api;
};
