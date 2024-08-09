import {BaseOffer, City} from './offer';

export type State = {
  city: City;
  offers: BaseOffer[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};
