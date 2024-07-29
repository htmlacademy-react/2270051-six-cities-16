import {useSelector} from 'react-redux';
import LocationItem from '../location-item/location-item';
import {State} from '../../lib/types/state';
import {CITIES} from '../../const';

type City = {
  id: number;
  name: string;
}

const citiesWithId: City[] = CITIES.map((city, index) => ({ id: index + 1, name: city }));

function LocationList() {
  const activeCity = useSelector((state: State) => state.offers.city);

  return (
    <ul className="locations__list tabs__list">
      {citiesWithId.map((city) => (
        <LocationItem
          city={city.name}
          key={city.id}
          isActive={city.name === activeCity}
        />
      ))}
    </ul>
  );
}

export default LocationList;
