import {Helmet} from 'react-helmet-async';
import {useSelector} from 'react-redux';
import Header from '../../components/header/header';
import LocationList from '../../components/location-list/location-list';
import Map from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
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
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
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
