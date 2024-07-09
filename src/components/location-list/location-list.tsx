import {CITIES} from '../../const';
import LocationItem from '../location-item/location-item';

function LocationList(): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        // eslint-disable-next-line react/jsx-key
        <LocationItem city = {city} />
      ))}
    </ul>
  );
}

export default LocationList;
