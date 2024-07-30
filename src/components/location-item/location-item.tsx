import {City} from '../../lib/types/offer';

type LocationItemProps = {
  city: string;
  isActive: boolean;
  onClick: (city: City) => void;
  cityObject: City;
}

function LocationItem({city, isActive, onClick, cityObject}: LocationItemProps) {
  return (
    <li className="locations__item">
      <a
        className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`}
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onClick(cityObject);
        }}
      >
        <span>{city}</span>
      </a>
    </li>
  );
}

export default LocationItem;
