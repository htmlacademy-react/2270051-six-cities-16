import leaflet from 'leaflet';
import {City} from './lib/types/offer';

export const URL_API = 'https://16.design.htmlacademy.pro/six-cities';

export const REQUEST_TIMEOUT = 5000;

export const AUTH_TOKEN_KEY = 'six-cities-token';

export const ApiRoute = {
  Offers: '/offers',
  Favorite: '/favorite',
  Comments: '/comments',
  Login: '/login',
  Logout: '/logout',
} as const;

export const ThunkAction = {
  FetchOffers: 'offers/fetchOffers',
  CheckAuth: 'user/checkAuth',
  Login: 'user/login',
  Logout: 'user/logout',
  FetchOfferById: 'offer/fetchOfferById',
  FetchNearbyOffers: 'offer/fetchNearbyOffers',
  FetchComments: 'offer/fetchComments',
  PostComment: 'offer/postComment',
} as const;

export const AppRoute = {
  Root: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer/:id',
} as const;

export const LOADING_MESSAGE = 'Loading...';

export const ERROR_MESSAGE = 'Something went wrong, try again later';

export const PASSWORD_ERROR_MESSAGE = 'Password must contain at least one letter and one number';

export const LOGIN_FAILED_MESSAGE = 'Login failed. Please check your credentials and try again.';

export const COMMENT_SUBMIT_ERROR_MESSAGE = 'Failed to submit comment. Please try again.';

export const RequestStatus = {
  Idle: 'Idle',
  Success: 'Success',
  Loading: 'Loading',
  Failed: 'Failed',
} as const;

export const AuthorizationStatus = {
  Auth: 'Auth',
  NoAuth: 'NoAuth',
  Unknown: 'Unknown',
} as const;

export enum SortType {
  Popular,
  PriceLowToHigh,
  PriceHighToLow,
  TopRatedFirst,
}

export const SortTypeNames = {
  [SortType.Popular]: 'Popular',
  [SortType.PriceLowToHigh]: 'Price: low to high',
  [SortType.PriceHighToLow]: 'Price: high to low',
  [SortType.TopRatedFirst]: 'Top rated first'
};

export const CITY: City[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }
  }
];

export const DEFAULT_CITY: City = CITY.find((city) => city.name === 'Paris') ?? CITY[0];

export const REVIEWS_COUNT = 10;

export const PHOTO_COUNT = 6;

export const NEARBY_OFFERS_COUNT = 3;

export const DefaultCustomIcon = leaflet.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

export const ActiveCustomIcon = leaflet.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

export const MIN_COMMENT_LENGTH = 50;

export const MAX_COMMENT_LENGTH = 300;
