import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import LocationList from '../../components/location-list/location-list';
import SortingForm from '../../components/sorting-form/sorting-form';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import {getLocations} from '../../lib/utils/utils';
import {BaseOffer, City} from '../../lib/types/offer';

type MainPageProps = {
  cities: City[];
  activeCity: City;
  filteredOffers: BaseOffer[];
  onCityClick: (city: City) => void;
}

function MainPage(props: MainPageProps) {
  const locations = getLocations(props.filteredOffers);
  const offersCount = props.filteredOffers.length;

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
              cities={props.cities}
              activeCity={props.activeCity}
              onCityClick={props.onCityClick}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in {props.activeCity.name}</b>
              <SortingForm />
              <OfferList offers={props.filteredOffers} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={props.activeCity} locations={locations} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
