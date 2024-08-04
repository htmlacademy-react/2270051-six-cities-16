import {createAction} from '@reduxjs/toolkit';
import {BaseOffer, City} from '../lib/types/offer';

export const setCity = createAction<City>('setCity');
export const fillOffers = createAction<BaseOffer[]>('fillOffers');
