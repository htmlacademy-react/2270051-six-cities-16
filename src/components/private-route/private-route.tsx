import React, {useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import {RootState} from '../../store';
import {AppRoute, AuthorizationStatus} from '../../const';
import {fetchFavorites} from '../../store/offers-slice/offers-thunk';

type PrivateRouteProps = {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state: RootState) => state.user.authorizationStatus);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavorites());
    }
  }, [authorizationStatus, dispatch]);

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Login} />;
  }

  return children;
}

export default PrivateRoute;
