import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';

type AppPageProps = {
  offersCount: number;
  cardsCount: number;
}

function App({ offersCount, cardsCount }: AppPageProps) {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage offersCount={offersCount} cardsCount={cardsCount} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/favorites" element={<PrivateRoute><FavoritesPage /></PrivateRoute>} />
          <Route path="/offer/:id" element={<OfferPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
