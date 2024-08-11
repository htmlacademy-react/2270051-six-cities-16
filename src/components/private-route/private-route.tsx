import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks/redux-hooks';
import {RootState} from '../../store';
import {AppRoute, AuthorizationStatus} from '../../const';

type PrivateRouteProps = {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const authorizationStatus = useAppSelector((state: RootState) => state.user.authorizationStatus);

  if (authorizationStatus !== AuthorizationStatus.AUTH) {
    return <Navigate to={AppRoute.Login} />;
  }

  return children;
}

export default PrivateRoute;
