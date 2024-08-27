import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { BaseOffer, Offer } from '../../lib/types/offer';
import { Review } from '../../lib/types/review';
import { AppDispatch, RootState } from '../index';
import { ApiRoute, COMMENT_SUBMIT_ERROR_MESSAGE, ThunkAction } from '../../const';

export const fetchOfferById = createAsyncThunk<
  Offer,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(ThunkAction.FetchOfferById, async (id, { extra: api }) => {
    const response = await api.get<Offer>(`${ApiRoute.Offers}/${id}`);
    return response.data;
  });

export const fetchNearbyOffers = createAsyncThunk<
  BaseOffer[],
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(ThunkAction.FetchNearbyOffers, async (id, { extra: api }) => {
    const response = await api.get<BaseOffer[]>(`${ApiRoute.Offers}/${id}/nearby`);
    return response.data;
  });

export const fetchComments = createAsyncThunk<
  Review[],
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(ThunkAction.FetchComments, async (id, { extra: api }) => {
    const response = await api.get<Review[]>(`${ApiRoute.Comments}/${id}`);
    return response.data;
  });

export const postComment = createAsyncThunk<
  Review,
  { id: string; comment: string; rating: number },
  {
    state: RootState;
    extra: AxiosInstance;
  }
  >(ThunkAction.PostComment, async ({ id, comment, rating }, { extra: api }) => {
    try {
      const response = await api.post<Review>(`${ApiRoute.Comments}/${id}`, { comment, rating });
      return response.data;
    } catch (error) {
      throw new Error(COMMENT_SUBMIT_ERROR_MESSAGE);
    }
  });

export const addToFavorites = createAsyncThunk<
  Offer,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(ThunkAction.AddToFavorites, async (id, { extra: api }) => {
    const response = await api.post<Offer>(`${ApiRoute.Favorite}/${id}/1`);
    return response.data;
  });

export const removeFromFavorites = createAsyncThunk<
  Offer,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(ThunkAction.RemoveFromFavorites, async (id, { extra: api }) => {
    const response = await api.post<Offer>(`${ApiRoute.Favorite}/${id}/0`);
    return response.data;
  });
