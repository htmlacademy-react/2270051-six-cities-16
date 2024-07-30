import LocationItem from '../location-item/location-item';
import {useAppSelector} from '../../hooks';
import {CITY} from '../../const';

function LocationList() {
  const activeCity = useAppSelector((state) => state.offers.city);

  return (
    <ul className="locations__list tabs__list">
      {CITY.map((city, index) => (
        <LocationItem
          city={city.name}
          key={index}
          isActive={city.name === activeCity}
        />
      ))}
    </ul>
  );
}

export default LocationList;
