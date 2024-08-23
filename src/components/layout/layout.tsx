import React from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import Header from '../header/header';
import {AppRoute} from '../../const';

type LayoutProps = {
  children?: React.ReactNode;
};

function Layout({children}: LayoutProps) {
  const location = useLocation();

  const isLoginPage = location.pathname === AppRoute.Login;

  const pageClasses = isLoginPage ? 'page page--gray page--login' : 'page';

  return (
    <div className={pageClasses}>
      {!isLoginPage && <Header />}
      <main>{children || <Outlet />}</main>
    </div>
  );
}

export default Layout;
