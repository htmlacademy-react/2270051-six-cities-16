import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {useNavigate} from 'react-router-dom';
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

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response && error.response.status === 401) {
        const navigate = useNavigate();
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );

  return api;
};
