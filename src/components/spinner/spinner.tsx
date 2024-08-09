import {Helmet} from 'react-helmet-async';
import Header from '../header/header';
import {LOADING_MESSAGE, SERVER_UNAVAILABLE_MESSAGE} from '../../const';

type SpinnerProps = {
  loading: boolean;
  error: boolean;
};

function Spinner({loading, error}: SpinnerProps) {
  let message = '';
  if (loading) {
    message = LOADING_MESSAGE;
  } else if (error) {
    message = SERVER_UNAVAILABLE_MESSAGE;
  }

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
                  {message}
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
