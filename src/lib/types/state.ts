import {City, Offer} from './offer';

export type State = {
  city: City;
  offers: Offer[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};
