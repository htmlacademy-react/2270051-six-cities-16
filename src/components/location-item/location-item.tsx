import {City} from '../../lib/types/offer';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setCity} from '../../store/action';
import {AppRoute} from '../../const';

type LocationItemProps = {
  city: string;
  isActive: boolean;
  cityObject: City;
}

function LocationItem({city, isActive, cityObject}: LocationItemProps) {
  const dispatch = useDispatch();
  const buttonClass = `locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`;

  const handleClick = () => {
    dispatch(setCity(cityObject));
  };

  return (
    <li className="locations__item">
      <Link to={AppRoute.Root}
        onClick={handleClick}
        className={buttonClass}
      >
        <span>{city}</span>
      </Link>
    </li>
  );
}

export default LocationItem;
