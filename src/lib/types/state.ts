import {store} from '../../store';
import {Offer} from './offer';

export type State = {
  city: string;
  offers: Offer[];
};

export type AppDispatch = typeof store.dispatch;
