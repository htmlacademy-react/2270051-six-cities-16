import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';

type PrivateRouteProps = {
  children: React.ReactNode;
}

function PrivateRoute({children}: PrivateRouteProps) {
  const [isAuthenticated] = useState(false); // Пока что пользователь всегда не авторизован

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
