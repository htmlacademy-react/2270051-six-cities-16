import {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import LocationList from '../../components/location-list/location-list';
import SortingForm from '../../components/sorting-form/sorting-form';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import {getLocations, sortOffers} from '../../lib/utils/utils';
import {BaseOffer, City} from '../../lib/types/offer';
import {SortType} from '../../const';

type MainPageProps = {
  cities: City[];
  activeCity: City;
  offers: BaseOffer[];
}

function MainPage({cities, activeCity, offers}: MainPageProps) {
  const [sortedOffers, setSortedOffers] = useState(offers);
  const [currentSortType, setCurrentSortType] = useState(SortType.Popular);

  useEffect(() => {
    const sorted = sortOffers(offers, currentSortType);
    setSortedOffers(sorted);
  }, [offers, currentSortType]);

  const handleSortChange = (sortType: string) => {
    setCurrentSortType(sortType);
  };

  const locations = getLocations(sortedOffers);
  const offersCount = sortedOffers.length;

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
              <OfferList offers={sortedOffers} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={activeCity} locations={locations} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
