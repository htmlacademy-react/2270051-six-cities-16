import classNames from 'classnames';
import useToggle from '../../hooks/use-toggle';
import React, {useCallback, useMemo, useState} from 'react';
import {SortType, SortTypeNames} from '../../const';
import {getNumericValues} from '../../lib/utils/utils';

type SortingFormProps = {
  onSortChange: (sortType: SortType) => void;
};

const CitySortTypeSelect = getNumericValues(Object.values(SortType)) as SortType[];

function SortingForm({onSortChange}: SortingFormProps) {
  const [isOpen, toggleOpen] = useToggle(false);
  const [selectedSort, setSelectedSort] = useState<SortType>(SortType.Popular);

  const handleSortChange = useCallback((sortType: SortType) => {
    setSelectedSort(sortType);
    onSortChange(sortType);
    toggleOpen();
  }, [onSortChange, toggleOpen]);

  const memoizedCitySortTypeSelect = useMemo(() => CitySortTypeSelect, []);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={toggleOpen}
      >
        {SortTypeNames[selectedSort]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={classNames('places__options places__options--custom', { 'places__options--opened': isOpen })}>
        {memoizedCitySortTypeSelect.map((sortType) => {
          const isActive = sortType === selectedSort;
          return (
            <li
              key={sortType}
              className={classNames('places__option', { 'places__option--active': isActive })}
              tabIndex={0}
              onClick={() => handleSortChange(sortType)}
            >
              {SortTypeNames[sortType]}
            </li>
          );
        })}
      </ul>
    </form>
  );
}

export const MemoizedSortingForm = React.memo(SortingForm);
