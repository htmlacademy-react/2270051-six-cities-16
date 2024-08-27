import { address, datatype, lorem, image, name, internet, date } from 'faker';
import { BaseOffer, City, Offer, Location } from '../types/offer';
import { Review } from '../types/review';
import { AuthorizationUser } from '../types/user';

function createMockLocation(): Location {
  return {
    latitude: parseFloat(address.latitude()),
    longitude: parseFloat(address.longitude()),
    zoom: datatype.number({ min: 10, max: 20 }),
  };
}

export function createMockCity(): City {
  return {
    name: address.cityName(),
    location: createMockLocation(),
  };
}

function createMockHost() {
  return {
    isPro: datatype.boolean(),
    name: name.findName(),
    avatarUrl: image.avatar(),
  };
}

export function createMockBaseOffer(): BaseOffer {
  return {
    id: datatype.uuid(),
    title: lorem.words(),
    type: lorem.word(),
    price: datatype.number(),
    city: createMockCity(),
    location: createMockLocation(),
    isFavorite: datatype.boolean(),
    isPremium: datatype.boolean(),
    rating: datatype.number({ min: 1, max: 5 }),
    previewImage: image.city(),
  };
}

export function createMockOffer(): Offer {
  return {
    ...createMockBaseOffer(),
    description: lorem.paragraph(),
    images: Array.from({ length: datatype.number({ min: 3, max: 6 }) }, () => image.city()),
    goods: Array.from({ length: datatype.number({ min: 3, max: 6 }) }, () => lorem.word()),
    host: createMockHost(),
    bedrooms: datatype.number({ min: 1, max: 5 }),
    maxAdults: datatype.number({ min: 1, max: 10 }),
  };
}

export function createMockUser(): AuthorizationUser {
  return {
    name: name.findName(),
    email: internet.email(),
    token: datatype.uuid(),
    avatarUrl: image.avatar(),
    isPro: datatype.boolean(),
  };
}

export function createMockReview(): Review {
  return {
    id: datatype.uuid(),
    comment: lorem.paragraph(),
    rating: datatype.number({ min: 1, max: 5 }),
    date: date.recent().toISOString(),
    user: createMockUser(),
  };
}
