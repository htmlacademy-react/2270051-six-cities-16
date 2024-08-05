import {City} from '../../lib/types/offer';
import {Link} from 'react-router-dom';
import {useAppDispatch} from '../../hooks/redux-hooks';
import {setCity} from '../../store/offers-slice';
import {AppRoute} from '../../const';

type LocationItemProps = {
  city: string;
  isActive: boolean;
  cityObject: City;
}

function LocationItem({city, isActive, cityObject}: LocationItemProps) {
  const dispatch = useAppDispatch();
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
