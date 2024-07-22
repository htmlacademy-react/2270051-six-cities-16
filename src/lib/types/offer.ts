export type City = {
  name: string;
  location: Location;
};

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type Host = {
  isPro: boolean;
  name: string;
  avatarUrl: string;
};

export type Offer = {
  id: string;
  title: string;
  description?: string;
  type: string;
  price: number;
  previewImage?: string;
  images?: string[];
  city: City;
  location: Location;
  goods?: string[];
  host?: Host;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  bedrooms?: number;
  maxAdults?: number;
};
