type LocationItemProps = {
  city: string;
  isActive: boolean;
  onClick: () => void;
}

function LocationItem(props: LocationItemProps) {
  return (
    <li className="locations__item">
      <a
        className={`locations__item-link tabs__item ${props.isActive ? 'tabs__item--active' : ''}`}
        href="#"
        onClick={props.onClick}
      >
        <span>{props.city}</span>
      </a>
    </li>
  );
}

export default LocationItem;
