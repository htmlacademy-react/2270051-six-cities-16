import LocationItem from '../location-item/location-item';
import {City} from '../../lib/types/offer';

type LocationListProps = {
  cities: City[];
  activeCity: City;
  onCityClick: (city: City) => void;
}

function LocationList({cities, activeCity, onCityClick}: LocationListProps) {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <LocationItem
          city={city.name}
          key={city.name}
          isActive={city.name === activeCity.name}
          onClick={onCityClick}
          cityObject={city}
        />
      ))}
    </ul>
  );
}

export default LocationList;
