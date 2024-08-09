import {Helmet} from 'react-helmet-async';
import Header from '../header/header';
import {LOADING_MESSAGE, SERVER_UNAVAILABLE_MESSAGE} from '../../const';

type SpinnerProps = {
  loading: boolean;
};

function Spinner({loading}: SpinnerProps) {
  return (
    <div className="page page--gray">
      <Helmet>
        <title>6 cities: {loading ? 'loading' : 'error'}</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--offer">
        <section className="offer cities__status-wrapper">
          <div className="offer__container container">
            <div className="offer__wrapper">
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {loading ? LOADING_MESSAGE : SERVER_UNAVAILABLE_MESSAGE}
                </h1>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Spinner;
