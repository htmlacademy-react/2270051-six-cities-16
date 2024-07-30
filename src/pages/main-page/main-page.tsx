import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import LocationList from '../../components/location-list/location-list';
import SortingForm from '../../components/sorting-form/sorting-form';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import {BaseOffer, City} from '../../lib/types/offer';
import {getLocations} from '../../lib/utils/utils';
import {useAppSelector} from '../../hooks/redux-hooks';

type MainPageProps = {
  offers: BaseOffer[];
  city: City[];
}

function MainPage({ offers, city }: MainPageProps) {
  const activeCity = useAppSelector((state) => state.offers.city);
  const filteredOffers = offers.filter((offer) => offer.city.name === activeCity);
  const locations = getLocations(filteredOffers);
  const offersCount = filteredOffers.length;

  const cityInfo = city.find((city) => city.name === activeCity);

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
            <LocationList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in {activeCity}</b>
              <SortingForm />
              <OfferList offers={filteredOffers} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={cityInfo} locations={locations} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
