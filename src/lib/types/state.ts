import {BaseOffer, City} from './offer';
import {AuthorizationStatus, RequestStatus} from '../../const';
import {AuthorizationUser} from './user';

export type State = {
  city: City;
  offers: BaseOffer[];
  status: RequestStatus;
  error: string | null;
  authorizationStatus: keyof typeof AuthorizationStatus;
  authorizationUser: AuthorizationUser | null;
};
