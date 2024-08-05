import {SortType} from '../../const';

type SortOptionProps = {
  isOpen: boolean;
  onSortChange: (sortType: string) => void;
};

const sortOptions = [
  {type: SortType.Popular, active: true},
  {type: SortType.PriceLowToHigh, active: false},
  {type: SortType.PriceHighToLow, active: false},
  {type: SortType.TopRatedFirst, active: false},
];

function SortOption({isOpen, onSortChange}: SortOptionProps) {
  return (
    <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
      {sortOptions.map((option) => (
        <li
          key={option.type}
          className={`places__option ${option.active ? 'places__option--active' : ''}`}
          tabIndex={0}
          onClick={() => onSortChange(option.type)}
        >
          {option.type}
        </li>
      ))}
    </ul>
  );
}

export default SortOption;
