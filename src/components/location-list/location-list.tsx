import {CITIES} from '../../const';
import LocationItem from '../location-item/location-item';

type City = {
  id: number;
  name: string;
}

const citiesWithId: City[] = CITIES.map((city, index) => ({ id: index + 1, name: city }));

function LocationList() {
  return (
    <ul className="locations__list tabs__list">
      {citiesWithId.map((city) => (
        <LocationItem city={city.name} key={city.id} />
      ))}
    </ul>
  );
}

export default LocationList;
