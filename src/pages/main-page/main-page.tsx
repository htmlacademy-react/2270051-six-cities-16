import {useEffect, useMemo, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/header/header';
import LocationList from '../../components/location-list/location-list';
import SortingForm from '../../components/sorting-form/sorting-form';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import {sortOffers} from '../../lib/utils/utils';
import {SortType} from '../../const';
import {fetchOffers} from '../../store/offers-slice';
import {AppDispatch, RootState} from '../../store';
import useFilteredOffers from '../../hooks/use-filtered-offers';
import {City} from '../../lib/types/offer';
import Spinner from '../../components/spinner/spinner';

type MainPageProps = {
  cities: City[];
  activeCity: City;
}

function MainPage({ cities, activeCity }: MainPageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const {status} = useSelector((state: RootState) => state.offers);
  const filteredOffers = useFilteredOffers();

  const [currentSortType, setCurrentSortType] = useState<SortType>(SortType.Popular);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  const sortedOffers = useMemo(() => {
    if (status === 'succeeded') {
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

  if (status === 'loading') {
    return <Spinner loading error={false} />;
  }

  if (status === 'failed') {
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
              activeCity={activeCity}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in {activeCity.name}</b>
              <SortingForm onSortChange={handleSortChange} />
              <OfferList offers={sortedOffers} onActiveOfferChange={handleActiveOfferChange} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={activeCity} offers={sortedOffers} activeOfferId={activeOfferId} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
