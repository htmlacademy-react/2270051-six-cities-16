import {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import {checkAuthorization} from '../../store/user-slice/user-thunk';
import {fetchFavorites} from '../../store/offers-slice/offers-slice';
import {AppRoute, AuthorizationStatus, CITY} from '../../const';
import Layout from '../layout/layout';

function App() {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);

  useEffect(() => {
    dispatch(checkAuthorization());
  }, [dispatch]);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavorites());
    }
  }, [authorizationStatus, dispatch]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout><MainPage cities={CITY} /></Layout>} />
          <Route path={AppRoute.Login} element={<Layout><LoginPage /></Layout>} />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute>
              <Layout><FavoritesPage /></Layout>
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Offer} element={<Layout><OfferPage /></Layout>} />
          <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
