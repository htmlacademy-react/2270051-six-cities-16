import {BaseOffer, City} from './offer';
import {AuthorizationStatus} from '../../const';

export type State = {
  city: City;
  offers: BaseOffer[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  authorizationStatus: keyof typeof AuthorizationStatus;
};
