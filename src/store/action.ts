import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../lib/types/offer';

export const setCity = createAction<string>('setCity');
export const fillOffers = createAction<Offer[]>('fillOffers');


