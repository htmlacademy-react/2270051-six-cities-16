import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';
import {MemoizedHeader as Header} from '../../components/header/header';

function NotFoundPage() {
  return (
    <div className="page page--favorites-empty">
      <Helmet>
        <title>6 cities: page not found</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Page not found (empty)</h1>
            <div className="cities__status-wrapper">
              <b className="favorites__status">404. Page not found</b>
              <Link to="/">Go back to main page</Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
