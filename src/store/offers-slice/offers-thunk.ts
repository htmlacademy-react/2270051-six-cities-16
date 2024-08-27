import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { BaseOffer } from '../../lib/types/offer';
import { AppDispatch, RootState } from '../index';
import { ApiRoute, ThunkAction } from '../../const';

export const fetchAllOffers = createAsyncThunk<
  BaseOffer[],
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(ThunkAction.FetchOffers, async (_, { extra: api }) => {
    const response = await api.get<BaseOffer[]>(ApiRoute.Offers);
    return response.data;
  });

export const fetchFavorites = createAsyncThunk<
  BaseOffer[],
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(ThunkAction.FetchFavorites, async (_, { extra: api }) => {
    const response = await api.get<BaseOffer[]>(ApiRoute.Favorite);
    return response.data;
  });

export const addToFavorites = createAsyncThunk<
  BaseOffer,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(ThunkAction.AddToFavorites, async (id, { extra: api }) => {
    const response = await api.post<BaseOffer>(`${ApiRoute.Favorite}/${id}/1`);
    return response.data;
  });

export const removeFromFavorites = createAsyncThunk<
  BaseOffer,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(ThunkAction.RemoveFromFavorites, async (id, { extra: api }) => {
    const response = await api.post<BaseOffer>(`${ApiRoute.Favorite}/${id}/0`);
    return response.data;
  });
