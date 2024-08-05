import useToggle from '../../hooks/use-toggle';
import SortOption from '../sort-option/sort-option';
import {useState} from 'react';

type SortingFormProps = {
  onSortChange: (sortType: string) => void;
};

function SortingForm({onSortChange}: SortingFormProps) {
  const [isOpen, toggleOpen] = useToggle(false);
  const [selectedSort, setSelectedSort] = useState('Popular');

  const handleSortChange = (sortType: string) => {
    setSelectedSort(sortType);
    onSortChange(sortType);
    toggleOpen();
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={toggleOpen}
      >
        {selectedSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <SortOption isOpen={isOpen} onSortChange={handleSortChange} />
    </form>
  );
}

export default SortingForm;
