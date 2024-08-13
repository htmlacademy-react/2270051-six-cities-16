import {BaseOffer} from '../../lib/types/offer';
import {NEARBY_OFFERS_COUNT} from '../../const';

export function getNearbyOffers (nearbyOffers: BaseOffer[]) {
  return nearbyOffers.slice(0, NEARBY_OFFERS_COUNT);
}

export function getNonNullOffers(offers: (BaseOffer | null)[]): BaseOffer[] {
  return offers.filter((o): o is BaseOffer => o !== null);
}
