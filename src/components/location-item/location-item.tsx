import {useAppDispatch} from '../../hooks';
import {setCity} from '../../store/action';

type LocationItemProps = {
  city: string;
  isActive: boolean;
  onClick: (city: string) => void;
}

function LocationItem(props: LocationItemProps) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setCity(props.city));
  };

  return (
    <li className="locations__item">
      <a
        className={`locations__item-link tabs__item ${props.isActive ? 'tabs__item--active' : ''}`}
        href="#"
        onClick={handleClick}
      >
        <span>{props.city}</span>
      </a>
    </li>
  );
}
export default LocationItem;
