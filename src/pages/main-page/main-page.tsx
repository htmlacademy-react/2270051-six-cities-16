import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import classNames from 'classnames';
import LocationList from '../../components/location-list/location-list';
import SortingForm from '../../components/sorting-form/sorting-form';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import Spinner from '../../components/spinner/spinner';
import NoPlacesAvailable from '../../components/no-places-available/no-places-available';
import {sortOffers} from '../../lib/utils/utils';
import {City} from '../../lib/types/offer';
import {RootState} from '../../store';
import {setCity} from '../../store/actions';
import {fetchAllOffers} from '../../store/offers-slice/offers-slice';
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
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchAllOffers());
  }, [dispatch]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const cityName = searchParams.get('city');
    if (cityName) {
      const selectedCity = cities.find((c) => c.name === cityName);
      if (selectedCity) {
        dispatch(setCity(selectedCity));
      }
    }
  }, [location.search, cities, dispatch]);

  const sortedOffers = status === RequestStatus.Success ? sortOffers(filteredOffers, currentSortType) : [];

  const handleSortChange = (sortType: SortType) => {
    setCurrentSortType(sortType);
  };

  const handleActiveOfferChange = (offerId: string | null) => {
    setActiveOfferId(offerId);
  };

  const offersCount = sortedOffers.length;

  if (status === RequestStatus.Loading) {
    return <Spinner loading error={false} />;
  }

  if (status === RequestStatus.Failed) {
    return <Spinner loading={false} error />;
  }

  return (
    <>
      <Helmet>
        <title>6 cities</title>
      </Helmet>

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
    </>
  );
}

export default MainPage;
