import {BaseOffer, City, Offer} from './offer';
import {AuthorizationStatus, RequestStatus} from '../../const';
import {AuthorizationUser} from './user';
import {Review} from './review';

export type State = {
  city: City;
  offers: BaseOffer[];
  favorites: BaseOffer[];
  status: keyof typeof RequestStatus;
  error: string | undefined;
  authorizationStatus: keyof typeof AuthorizationStatus;
  authorizationUser: AuthorizationUser | null;
};

export type OfferState = {
  offer: Offer | null;
  nearbyOffers: BaseOffer[];
  comments: Review[];
  status: keyof typeof RequestStatus;
  loadError: string | undefined;
  submitError: string | undefined;
}
