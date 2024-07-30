import {createAction} from '@reduxjs/toolkit';
import {Offer, City} from '../lib/types/offer';

export const setCity = createAction<City>('setCity');
export const fillOffers = createAction<Offer[]>('fillOffers');
