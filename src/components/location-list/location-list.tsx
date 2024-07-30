import LocationItem from '../location-item/location-item';
import {City} from '../../lib/types/offer';

type LocationListProps = {
  cities: City[];
  activeCity: City;
  onCityClick: (city: City) => void;
}

function LocationList(props: LocationListProps) {
  return (
    <ul className="locations__list tabs__list">
      {props.cities.map((city) => (
        <LocationItem
          city={city.name}
          key={city.name}
          isActive={city.name === props.activeCity.name}
          onClick={props.onCityClick}
          cityObject={city}
        />
      ))}
    </ul>
  );
}

export default LocationList;
