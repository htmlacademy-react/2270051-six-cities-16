import LocationItem from '../location-item/location-item';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {CITY} from '../../const';
import {setCity} from '../../store/action';
import {City} from '../../lib/types/offer';

function LocationList() {
  const activeCity = useAppSelector((state) => state.offers.city);
  const dispatch = useAppDispatch();

  const handleCityClick = (city: City) => {
    dispatch(setCity(city));
  };

  return (
    <ul className="locations__list tabs__list">
      {CITY.map((city) => (
        <LocationItem
          city={city.name}
          key={city.name}
          isActive={city.name === activeCity}
          onClick={() => handleCityClick(city)}
        />
      ))}
    </ul>
  );
}

export default LocationList;
