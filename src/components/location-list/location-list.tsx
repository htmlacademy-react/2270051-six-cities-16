import React from 'react';
import LocationItem from '../location-item/location-item';
import {City} from '../../lib/types/offer';

type LocationListProps = {
  cities: City[];
  activeCity: City;
}

function LocationList({cities, activeCity}: LocationListProps) {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <LocationItem
          city={city.name}
          key={city.name}
          isActive={city.name === activeCity.name}
          cityObject={city}
        />
      ))}
    </ul>
  );
}

export const MemoizedLocationList = React.memo(LocationList);
