import leaflet from 'leaflet';
import {City} from './lib/types/offer';

export const URL_API: string = 'https://16.design.htmlacademy.pro/six-cities';

export const REQUEST_TIMEOUT: number = 5000;

export const AUTH_TOKEN_KEY_NAME: string = 'six-cities-token';

export const API_ROUTES = {
  OFFERS: '/offers',
  FAVORITE: '/favorite',
  COMMENTS: '/comments',
  LOGIN: '/login',
  LOGOUT: '/logout'
} as const;

export const THUNK_ACTIONS = {
  FETCH_OFFERS: 'offers/fetchOffers',
  CHECK_AUTH: 'user/checkAuth',
  LOGIN: '/login',
  LOGOUT: '/logout'
} as const;

export const LOADING_MESSAGE: string = 'Loading...';

export const ERROR_MESSAGE: string = 'Something went wrong, try again later';

export const RequestStatus = {
  IDLE: 'idle',
  SUCCEEDED: 'succeeded',
  LOADING: 'loading',
  FAILED: 'failed',
} as const;

export const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
  UNKNOWN: 'UNKNOWN',
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

export const REVIEWS_COUNT: number = 10;

export const PHOTO_COUNT: number = 6;

export const AppRoute = {
  Root: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer/:id',
} as const;

export const defaultCustomIcon = leaflet.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

export const activeCustomIcon = leaflet.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});
