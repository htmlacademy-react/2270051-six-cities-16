import {Helmet} from 'react-helmet-async';
import {useSelector} from 'react-redux';
import Header from '../../components/header/header';
import LocationList from '../../components/location-list/location-list';
import SortingForm from '../../components/sorting-form/sorting-form';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import {BaseOffer} from '../../lib/types/offer';
import {State} from '../../lib/types/state';
import {getLocations} from '../../lib/utils/utils';
import {CITY} from '../../mocks/city';


type MainPageProps = {
  offers: BaseOffer[];
}

function MainPage({offers}: MainPageProps) {
  const activeCity = useSelector((state: State) => state.offers.city);
  const locations = getLocations(offers);
  const filteredOffers = offers.filter((offer) => offer.city.name === activeCity);
  const offersCount = filteredOffers.length;

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
              <OfferList offers={offers} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={CITY} locations={locations} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
