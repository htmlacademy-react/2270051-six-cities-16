import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import CommentForm from '../../components/comment-form/comment-form';
import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import NearOfferList from '../../components/near-offer-list/near-offer-list';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import OfferFeatures from '../../components/offer-features/offer-features';
import OfferInsideList from '../../components/offer-inside-list/offer-inside-list';
import {CITY} from '../../mocks/city';
import {NEAR_OFFERS} from '../../mocks/near-offers';

function OfferPage() {
  return (
    <div className="page">
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <OfferGallery />
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <div className="offer__mark">
                <span>Premium</span>
              </div>
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  Beautiful &amp; luxurious studio at great location
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: '80%' }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">4.8</span>
              </div>
              <OfferFeatures />
              <div className="offer__price">
                <b className="offer__price-value">&euro;120</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <OfferInsideList />
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="offer__user-name">
                    Angelina
                  </span>
                  <span className="offer__user-status">
                    Pro
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The
                    building is green and from 18th century.
                  </p>
                  <p className="offer__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where
                    the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewList />
                <CommentForm />
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map city={CITY} offers={NEAR_OFFERS} activeOfferId={null} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearOfferList offers={NEAR_OFFERS} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
