import {BaseOffer} from '../lib/types/offer';

export const NEAR_OFFERS: BaseOffer[] = [
  {
    'id': '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
    'title': 'Cozy Apartment in the Center',
    'type': 'apartment',
    'price': 150,
    'previewImage': 'https://16.design.htmlacademy.pro/static/hotel/10.jpg',
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.370216,
        'longitude': 4.895168,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 52.3909553943508,
      'longitude': 4.85309666406198,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 4.2
  },
  {
    'id': '2a3b4c5d-6e7f-8g9h-0i1j-2k3l4m5n6o7p',
    'title': 'Modern Studio by the Canal',
    'type': 'room',
    'price': 120,
    'previewImage': 'https://16.design.htmlacademy.pro/static/hotel/11.jpg',
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.370216,
        'longitude': 4.895168,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 52.3609553943508,
      'longitude': 4.85309666406198,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 4.7
  },
  {
    'id': '3a4b5c6d-7e8f-9g0h-1i2j-3k4l5m6n7o8p',
    'title': 'Luxury Penthouse with View',
    'type': 'hotel',
    'price': 350,
    'previewImage': 'https://16.design.htmlacademy.pro/static/hotel/12.jpg',
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.370216,
        'longitude': 4.895168,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 52.3909553943508,
      'longitude': 4.929309666406198,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': true,
    'rating': 4.9
  }
];
