import React, {useState} from 'react';
import {Navigate, useLocation} from 'react-router-dom';

type PrivateRouteProps = {
  children: React.ReactNode;
}

function PrivateRoute({children}: PrivateRouteProps) {
  const [isAuthenticated] = useState(false); // Пока что пользователь всегда не авторизован
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{from: location}} />;
  }

  return children;
}

export default PrivateRoute;
