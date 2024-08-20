import {useCallback, useEffect, useMemo, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import classNames from 'classnames';
import {MemoizedHeader as Header} from '../../components/header/header';
import {MemoizedLocationList as LocationList} from '../../components/location-list/location-list';
import {MemoizedSortingForm as SortingForm} from '../../components/sorting-form/sorting-form';
import {MemoizedOfferList as OfferList} from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import Spinner from '../../components/spinner/spinner';
import NoPlacesAvailable from '../../components/no-places-available/no-places-available';
import {sortOffers} from '../../lib/utils/utils';
import {City} from '../../lib/types/offer';
import {RootState} from '../../store';
import {fetchAllOffers} from '../../store/offers-slice';
import useCityFilteredOffers from '../../hooks/use-city-filtered-offers';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import {SortType, RequestStatus} from '../../const';


type MainPageProps = {
  cities: City[];
}

function MainPage({cities}: MainPageProps) {
  const dispatch = useAppDispatch();
  const {status, city} = useAppSelector((state: RootState) => state.offers);
  const filteredOffers = useCityFilteredOffers();

  const [currentSortType, setCurrentSortType] = useState<SortType>(SortType.Popular);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchAllOffers());
  }, [dispatch]);

  const sortedOffers = useMemo(() => {
    if (status === RequestStatus.Success) {
      return sortOffers(filteredOffers, currentSortType);
    }
    return [];
  }, [filteredOffers, currentSortType, status]);

  const handleSortChange = useCallback((sortType: SortType) => {
    setCurrentSortType(sortType);
  }, []);

  const handleActiveOfferChange = useCallback((offerId: string | null) => {
    setActiveOfferId(offerId);
  }, []);

  const offersCount = sortedOffers.length;

  if (status === RequestStatus.Loading) {
    return <Spinner loading error={false} />;
  }

  if (status === RequestStatus.Failed) {
    return <Spinner loading={false} error />;
  }

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>

      <Header />

      <main className={classNames('page__main page__main--index', { 'page__main--index-empty': offersCount === 0 })}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationList
              cities={cities}
              activeCity={city}
            />
          </section>
        </div>
        <div className="cities">
          {offersCount === 0 ? (
            <NoPlacesAvailable cityName={city.name} />
          ) : (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offersCount} places to stay in {city.name}</b>
                <SortingForm onSortChange={handleSortChange} />
                <OfferList offers={sortedOffers} onActiveOfferChange={handleActiveOfferChange} />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map city={city} offers={sortedOffers} activeOfferId={activeOfferId} />
                </section>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
