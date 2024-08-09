import {useEffect, useMemo, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import LocationList from '../../components/location-list/location-list';
import SortingForm from '../../components/sorting-form/sorting-form';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import Spinner from '../../components/spinner/spinner';
import {sortOffers} from '../../lib/utils/utils';
import {City} from '../../lib/types/offer';
import {fetchOffers} from '../../store/offers-slice';
import useFilteredOffers from '../../hooks/use-filtered-offers';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import {SortType, RequestStatus} from '../../const';

type MainPageProps = {
  cities: City[];
}

function MainPage({ cities }: MainPageProps) {
  const dispatch = useAppDispatch();
  const {status, city} = useAppSelector((state) => state.offers);
  const filteredOffers = useFilteredOffers();

  const [currentSortType, setCurrentSortType] = useState<SortType>(SortType.Popular);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  const sortedOffers = useMemo(() => {
    if (status === RequestStatus.SUCCEEDED) {
      return sortOffers(filteredOffers, currentSortType);
    }
    return [];
  }, [filteredOffers, currentSortType, status]);

  const handleSortChange = (sortType: SortType) => {
    setCurrentSortType(sortType);
  };

  const handleActiveOfferChange = (offerId: string | null) => {
    setActiveOfferId(offerId);
  };

  const offersCount = sortedOffers.length;

  if (status === RequestStatus.LOADING) {
    return <Spinner loading error={false} />;
  }

  if (status === RequestStatus.FAILED) {
    return <Spinner loading={false} error />;
  }

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--index">
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
        </div>
      </main>
    </div>
  );
}

export default MainPage;
